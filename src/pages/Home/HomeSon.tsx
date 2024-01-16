import { getChartsData, getVisitData } from "@/api/data";
import { ChromeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import "./index.less";
import { Line } from "@ant-design/charts";

export default function HomeSon() {
  const { data } = getVisitData();
  const { data: charts } = getChartsData();
  const configs = {
    data: charts?.visitCollect || [],
    xField: "date",
    yField: "count",
    seriesField: "platform",
    legend: {
      position: "top",
    },
    // @TODO 后续会换一种动画方式
    animation: {
      appear: {
        animation: "wave-in",
        duration: 5000,
      },
    },
  };
  return (
    <div>
      {/* 统计类数据 */}
      <div className="flex flex-row">
        <div className="w-2/3 flex flex-row">
          <Card className="w-1/2">
            <h2 className="text-left">访问数据</h2>
            <div className="flex flex-row text-center mt-4">
              <section className="card-item-visit">
                <p className="son-title">总访问量</p>
                <p className="son-number-text">
                  <ChromeOutlined />
                  {data?.visitAllCount}
                </p>
              </section>
              <section className="card-item-visit">
                <p className="son-title">网页</p>
                <p className="son-number-text">
                  <ChromeOutlined />
                  {
                    data?.respectivelyCount.find(
                      (item) => item.platform === "1"
                    )?.visitCount
                  }
                </p>
              </section>
              <section className="card-item-visit">
                <p className="son-title">小程序</p>
                <p className="son-number-text">
                  <ChromeOutlined />
                  {
                    data?.respectivelyCount.find(
                      (item) => item.platform === "0"
                    )?.visitCount
                  }
                </p>
              </section>
              <section className="card-item-visit">
                <p className="son-title">近7日</p>
                <p className="son-number-text">
                  <ChromeOutlined />
                  {data?.latelySeven}
                </p>
              </section>
            </div>
          </Card>
          <div className="w-4" />
          <Card className="w-1/2">
            <h2 className="text-left">用户数据</h2>
            <div className="flex flex-row text-center mt-4">
              <section className="card-item-visit-user">
                <p className="son-title">用户总量</p>
                <p className="son-number-text">
                  <ChromeOutlined />
                  {data?.userAllCount}
                </p>
              </section>
              <section className="card-item-visit-user">
                <p className="son-title">近30日注册数</p>
                <p className="son-number-text">
                  <ChromeOutlined />
                  {data?.latelyThirty}
                </p>
              </section>
            </div>
          </Card>
        </div>
        <Card className="w-1/3 ml-4">
          <h2 className="text-left">文章数据</h2>
          <div className="flex flex-row text-center mt-4">
            <section className="card-item-visit">
              <p className="son-title">文章数量</p>
              <p className="son-number-text">
                <ChromeOutlined />
                {data?.pageAllCount}
              </p>
            </section>
            <section className="card-item-visit">
              <p className="son-title">获赞</p>
              <p className="son-number-text">
                <ChromeOutlined />
                {data?.likeAllCount}
              </p>
            </section>
            <section className="card-item-visit">
              <p className="son-title">挨踩</p>
              <p className="son-number-text">
                <ChromeOutlined />
                {data?.unlikeAllCount}
              </p>
            </section>
            <section className="card-item-visit">
              <p className="son-title">评论</p>
              <p className="son-number-text">
                <ChromeOutlined />
                {data?.commentAllCount}
              </p>
            </section>
          </div>
        </Card>
      </div>
      {/* 图表类数据 */}
      <div className="flex flex-row mt-4">
        <Card className="w-2/3 flex-grow-0 overflow-hidden">
          <Line {...configs} />
        </Card>
        <div className="w-4" />
        <Card className="w-1/3"></Card>
      </div>
    </div>
  );
}
