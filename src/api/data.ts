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

// 访问总数量：网页 - Weapp - 昨日访问数
export function getVisitData() {
  return useQuery(
    ["visitCount"],
    async () => post<Result>("/back/getWebsiteData"),
    {
      refetchOnWindowFocus: false,
    }
  );
}

export function getChartsData() {
  return useQuery(["chatsData"], async () => {
    const res = await post<ChartsResult>("/back/getChartsDataMonth");
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
// 近一个月访问数量汇总，分为网页-app，折线图
// 近一个月发布文章数量汇总，条形图
// 文章阅读量：网页-weapp，饼图
// 文章阅读量之最，列表
