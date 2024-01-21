import { Data, getIndexPage, getIsSelectPage } from "@/api/data";
import { Button, Card, Modal, Radio, Space, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useState } from "react";

export default function IndexPg() {
  const [position, setPosition] = useState<"home" | "swipe" | "slide" | "">(
    "home"
  );
  const [isShow, setIsShow] = useState<boolean>(false);
  const { data, refetch } = getIndexPage(position);
  const { data: selectPage, refetch: reloadSelectPage } = getIsSelectPage();
  const columns: ColumnsType<Data> = [
    {
      dataIndex: "title",
      title: "文章名称",
      width: 200,
    },
    {
      dataIndex: "createTime",
      title: "创建时间",
      render: (val) => moment(Number(val)).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      dataIndex: "description",
      title: "描述",
    },
    {
      dataIndex: "viewCount",
      title: "阅读量",
    },
    {
      title: "操作",
      render: (_, record) => <Button type="link">切换</Button>,
    },
  ];
  return (
    <Card>
      <Space>
        <span>展示位置：</span>
        <Radio.Group
          optionType="button"
          defaultValue={position}
          onChange={(e) => setPosition(e.target.value)}
        >
          <Radio value={"home"}>主体部分</Radio>
          <Radio value={"swipe"}>轮播图</Radio>
          <Radio value={"slide"}>侧边</Radio>
        </Radio.Group>
      </Space>
      <Table dataSource={data?.data || []} columns={columns} />
      <Modal
        title="可选择的文章列表"
        open={isShow}
        onCancel={() => setIsShow(false)}
      >
        <Table dataSource={selectPage?.data || []} columns={columns} />
      </Modal>
    </Card>
  );
}
