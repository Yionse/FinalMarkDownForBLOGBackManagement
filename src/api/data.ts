import { useQuery } from "react-query";
import { post } from ".";

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
// 用户总量：总量 - 近一个月注册数
// 文章阅读汇总：数量 - 获赞 - 挨踩 - 评论

// 近一个月访问数量汇总，分为网页-app，折线图
// 近一个月发布文章数量汇总，条形图
// 文章阅读量：网页-weapp，饼图
// 文章阅读量之最，列表
