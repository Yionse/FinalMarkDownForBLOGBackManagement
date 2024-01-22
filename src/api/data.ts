import { ClientError, get, post } from ".";
import { useMutation, useQuery } from "react-query";

export interface RespectivelyCount {
  platform: string;
  visitCount: number;
}

export interface Result {
  visitAllCount: number;
  respectivelyCount: RespectivelyCount[];
  latelySeven: number;
  isShowMessage: boolean;
  userAllCount: number;
  latelyThirty: number;
  pageAllCount: number;
  likeAllCount: number;
  unlikeAllCount: number;
  commentAllCount: number;
}

export interface VisitCollect {
  date: string;
  platform: string;
  count: number;
}

export interface ChartsResult {
  visitCollect: VisitCollect[];
}

export interface UserList {
  qq: string;
  userImg: string;
  userName: string;
  registerDate: string;
  vermicelliCount: string;
  pagesNumber: string;
  school: string;
  prefession: string;
  sex: string;
  description: string;
  messageDataName: string;
}

export interface PagesList {
  qq: string;
  pageid: string;
  title: string;
  coverUrl: string;
  createTime: string;
  likeCount: number;
  unlikeCount: number;
  description: string;
  viewCount: number;
  username: string;
  pagesNumber: string;
  isCheckSuccess: number;
}

export interface Data {
  qq: string;
  pageid: string;
  title: string;
  coverUrl: string;
  createTime: string;
  likeCount: number;
  unlikeCount: number;
  description: string;
  viewCount: number;
  isCheckSuccess: number;
  reason: string;
  position: string;
}

// 网站数据
export function getVisitData() {
  return useQuery(
    ["visitCount"],
    async () => post<Result>("/back/getWebsiteData"),
    {
      refetchOnWindowFocus: false,
    }
  );
}

// 近一个月访问数量汇总，分为网页-app，折线图
export function getChartsVisitData(visitDataDateForRadius: string) {
  return useQuery(["chartsData"], async () => {
    const res = await post<ChartsResult>("/back/getChartsDataMonth", {
      visitDataDateForRadius,
    });
    return {
      visitCollect: res.visitCollect.map((item) => {
        return {
          ...item,
          date: item.date.substring(5),
          platform: item.platform === "1" ? "网页" : "微信小程序",
        };
      }),
    };
  });
}

// 文章阅读量：网页-weapp，饼图
export function getChartsPageData() {
  return useQuery(["pageReadCount"], async () =>
    post<{ pageViewCount: {}[] }>("/back/getPageReadCount")
  );
}

// 用户列表
export function getUserList() {
  return useQuery(
    ["userList"],
    async () => post<{ userList: UserList[] }>("/back/userList"),
    {
      refetchOnWindowFocus: false,
    }
  );
}

// 文章列表
export function getPagesList(pageStatus?: number) {
  return useQuery(
    ["pagesList", pageStatus || ""],
    async () => post<{ pagesList: PagesList[] }>("/back/pagesList"),
    {
      refetchOnWindowFocus: false,
    }
  );
}

// 获取文章数据
export function getMdData() {
  return useMutation(["pageData"], async (pageId: string) =>
    get<{ content: string }>("/back/md", { pageId })
  );
}

// 审核结果
export function fetchCheck() {
  return useMutation(
    ["checkPage"],
    async ({
      pageid,
      isCheckSuccess,
      reason = "",
    }: {
      pageid: string;
      isCheckSuccess: number;
      reason?: string;
    }) => post("/back/check", { pageid, isCheckSuccess, reason })
  );
}

// 获取首页文章展示设置
export function getIndexPage(position: "home" | "swipe" | "slide" | "") {
  return useQuery(["showPage", position], () =>
    post<{ data: Data[] }>("/back/showPage", { position })
  );
}

// 获取当前可以选择的文章
export function getIsSelectPage() {
  return useQuery(["selectedPage"], async () =>
    post<{ data: Data[] }>("/back/showPage", { position: "" })
  );
}

// 进行替换操作
export function fetchReplace() {
  return useMutation(
    ["replace"],
    async (param: {
      preId: string;
      newId: string;
      position: "home" | "swipe" | "slide";
    }) => post("/back/replace", param)
  );
}

// 添加展示文章
export function fetchAddPage() {
  return useMutation(
    ["addPage"],
    async (param: { pageid: string; position: "home" | "swipe" | "slide" }) =>
      post("/back/addPage", param)
  );
}

// 删除展示文章
export function fetchDeletePage() {
  return useMutation(["deletePage"], async (pageid: string) =>
    post("/back/delPage", { pageid })
  );
}
