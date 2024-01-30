import { PagesList, fetchCheck, getMdData, getPagesList } from "@/api/data";
import MdPreview from "@/components/MdContent";
import {
  Button,
  Card,
  Input,
  Modal,
  Radio,
  Space,
  Table,
  Tag,
  message,
} from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useMemo, useRef, useState } from "react";

export default function Paper() {
  const [reason, setReason] = useState<string>("");
  const [isShowReason, setIsShowReason] = useState<boolean>(false);
  const [pageStatus, setPageStatus] = useState<1 | -1 | 99>(99);
  const [preview, setPreview] = useState<boolean>(false);
  const mdStr = useRef<string>("");
  const { mutateAsync, isLoading } = getMdData();
  const { mutateAsync: checkPage } = fetchCheck();
  const currentPage = useRef<PagesList>();
  const { data, refetch } = getPagesList(pageStatus);
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
    ...([99, 1].includes(pageStatus)
      ? [
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
        ]
      : []),
    ...(pageStatus === -1 ? [{ title: "原因", dataIndex: "reason" }] : []),

    {
      dataIndex: "isCheckSuccess",
      title: "状态",
      render: (val) =>
        val === 1 ? (
          <Tag color="#1677ff">正常</Tag>
        ) : val === 0 ? (
          <Tag color="orange">审核</Tag>
        ) : (
          <Tag color="red">未通过</Tag>
        ),
    },
    {
      title: "操作",
      width: 200,
      render: (_, record) => (
        <>
          {record.isCheckSuccess === 1 && (
            <Button
              type="link"
              onClick={() => {
                setIsShowReason(true);
                currentPage.current = record;
              }}
            >
              下架
            </Button>
          )}
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
        </>
      ),
    },
  ];
  const filterData = useMemo(() => {
    if (pageStatus === 99) {
      return data?.pagesList;
    } else {
      return data?.pagesList.filter(
        (item) => item.isCheckSuccess === pageStatus
      );
    }
  }, [data, pageStatus]);
  return (
    <Card>
      <Space>
        <span>状态：</span>
        <Radio.Group
          optionType="button"
          defaultValue={pageStatus}
          onChange={(e) => setPageStatus(e.target.value)}
        >
          <Radio value={99}>全部</Radio>
          <Radio value={1}>正常</Radio>
          <Radio value={-1}>未通过</Radio>
        </Radio.Group>
      </Space>
      <Table dataSource={filterData} columns={columns} key="pageid" />
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
        title="请输入下架原因"
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
