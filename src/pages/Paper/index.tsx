import { PagesList, getMdData, getPagesList } from "@/api/data";
import MdPreview from "@/components/MdContent";
import { Button, Card, Modal, Spin, Table, Tag, message } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useRef, useState } from "react";

export default function Paper() {
  const [preview, setPreview] = useState<boolean>(false);
  const mdStr = useRef<string>("");
  const { mutateAsync, isLoading } = getMdData();
  const { data } = getPagesList();
  const columns: ColumnsType<PagesList> = [
    {
      dataIndex: "title",
      title: "文章名称",
      width: 200,
    },
    {
      dataIndex: "username",
      title: "作者",
    },
    {
      dataIndex: "createTime",
      title: "创建时间",
      render: (val) => moment(Number(val)).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      dataIndex: "viewCount",
      title: "阅读量",
    },
    {
      dataIndex: "likeCount",
      title: "点赞",
    },
    {
      dataIndex: "unlikeCount",
      title: "点踩",
    },
    {
      dataIndex: "description",
      title: "描述",
    },
    {
      dataIndex: "isCheckSuccess",
      title: "状态",
      render: (val) =>
        val === 1 ? (
          <Tag color="#1677ff">正常</Tag>
        ) : (
          <Tag color="red">待审核</Tag>
        ),
    },
    {
      title: "操作",
      width: 150,
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={async () => {
              const res = await mutateAsync(record?.pageid);
              mdStr.current = res?.content;
              setPreview(true);
            }}
          >
            预览
          </Button>
          <Button
            type="link"
            style={{ color: "red" }}
            onClick={() => message.error("功能暂未开放")}
          >
            删除
          </Button>
        </>
      ),
    },
  ];
  return (
    <Card>
      <Table dataSource={data?.pagesList} columns={columns} key="pageid" />
      <Modal
        title="MD效果预览"
        footer={null}
        open={preview}
        onCancel={() => setPreview(false)}
        width={1000}
      >
        <MdPreview data={mdStr.current || ""} />
      </Modal>
      <Spin spinning={isLoading} fullscreen />
    </Card>
  );
}
