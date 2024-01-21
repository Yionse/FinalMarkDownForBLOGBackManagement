import { PagesList, fetchCheck, getMdData, getPagesList } from "@/api/data";
import MdPreview from "@/components/MdContent";
import {
  Button,
  Card,
  Input,
  Modal,
  Popconfirm,
  Table,
  Tag,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useMemo, useRef, useState } from "react";

export default function Check() {
  const [reason, setReason] = useState<string>("");
  const [isShowReason, setIsShowReason] = useState<boolean>(false);
  const { data, refetch } = getPagesList();
  const currentPage = useRef<PagesList>();
  const filterData = useMemo(
    () => data?.pagesList.filter((item) => item.isCheckSuccess === 0),
    [data]
  );
  const [preview, setPreview] = useState<boolean>(false);
  const { mutateAsync } = getMdData();
  const { mutateAsync: checkPage, isLoading } = fetchCheck();
  const mdStr = useRef<string>("");
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
      dataIndex: "isCheckSuccess",
      title: "状态",
      render: (val) =>
        val === -1 ? (
          <Tag color="red">未通过</Tag>
        ) : (
          <Tag color="orange">待审核</Tag>
        ),
    },
    {
      title: "操作",
      width: 300,
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
          <Button type="link" loading={isLoading}>
            <Popconfirm
              title="确认通过吗"
              okText="通过审核"
              cancelText="取消"
              onConfirm={async () => {
                await checkPage({ pageid: record.pageid, isCheckSuccess: 1 });
                refetch();
              }}
            >
              通过
            </Popconfirm>
          </Button>
          <Button
            type="link"
            style={{ color: "red" }}
            onClick={() => {
              currentPage.current = record;
              setIsShowReason(true);
            }}
          >
            不通过
          </Button>
        </>
      ),
    },
  ];
  return (
    <Card>
      <Table dataSource={filterData || []} columns={columns} rowKey="pageid" />
      <Modal
        title="MD效果预览"
        footer={null}
        open={preview}
        onCancel={() => setPreview(false)}
        width={1000}
      >
        <MdPreview data={mdStr.current || ""} />
      </Modal>
      <Modal
        title="请输入审核不通过的原因"
        open={isShowReason}
        confirmLoading={isLoading}
        onCancel={() => setIsShowReason(false)}
        okText="确定"
        cancelText="取消"
        onOk={async () => {
          if (!reason) {
            message.warning("原因不能为空");
            return;
          }
          await checkPage({
            pageid: currentPage.current?.pageid!,
            isCheckSuccess: -1,
            reason,
          });
          message.success("操作成功");
          setIsShowReason(false);
          setReason("");
          refetch();
        }}
      >
        <Input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </Modal>
    </Card>
  );
}
