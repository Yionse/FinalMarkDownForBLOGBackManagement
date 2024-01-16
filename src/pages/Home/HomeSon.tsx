import { getVisitData } from "@/api/data";
import { ChromeOutlined } from "@ant-design/icons";
import { Card } from "antd";
import "./index.less";

export default function HomeSon() {
  const { data } = getVisitData();
  return (
    <div>
      <div className="flex flex-row">
        <Card className="w-1/3">
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
                  data?.respectivelyCount.find((item) => item.platform === "1")
                    ?.visitCount
                }
              </p>
            </section>
            <section className="card-item-visit">
              <p className="son-title">小程序</p>
              <p className="son-number-text">
                <ChromeOutlined />
                {
                  data?.respectivelyCount.find((item) => item.platform === "0")
                    ?.visitCount
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
        <Card className="w-1/3 mx-4">
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
        <Card className="w-1/3">
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
      <div></div>
    </div>
  );
}
