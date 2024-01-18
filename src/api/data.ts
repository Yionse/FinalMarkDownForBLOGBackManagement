import { post } from ".";
import { useQuery } from "react-query";

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
