import {
  Data,
  fetchAddPage,
  fetchDeletePage,
  fetchReplace,
  getIndexPage,
  getIsSelectPage,
} from "@/api/data";
import { Button, Card, Modal, Popconfirm, Radio, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import moment from "moment";
import { useRef, useState } from "react";

export default function IndexPg() {
  const [operator, setOperator] = useState<string>("add");
  const [position, setPosition] = useState<"home" | "swipe" | "slide">("home");
  const currentPageId = useRef<string>("");
  const [isShow, setIsShow] = useState<boolean>(false);
  const { data, refetch } = getIndexPage(position);
  const { mutateAsync: replacePage, isLoading } = fetchReplace();
  const { mutateAsync: addPage } = fetchAddPage();
  const { mutateAsync: deletePage } = fetchDeletePage();
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
      <br />
      {position === "home" && (
        <Button
          type="primary"
          className="my-4"
          onClick={async () => {
            setOperator("add");
            await reloadSelectPage();
            setIsShow(true);
          }}
        >
          添加
        </Button>
      )}
      <Table
        dataSource={data?.data || []}
        columns={columns.concat({
          title: "操作",
          render: (_, record) => (
            <>
              <Button
                type="link"
                onClick={async () => {
                  currentPageId.current = record.pageid;
                  setOperator("replace");
                  await reloadSelectPage();
                  setIsShow(true);
                }}
              >
                切换
              </Button>
              {position === "home" && (
                <Button
                  type="link"
                  style={{ color: "red" }}
                  disabled={(data?.data!.length! || 0) < 5}
                >
                  <Popconfirm
                    title="确定删除该文章的展示吗？"
                    onConfirm={async () => {
                      await deletePage(record.pageid);
                      refetch();
                    }}
                  >
                    删除
                  </Popconfirm>
                </Button>
              )}
            </>
          ),
        })}
      />
      <Modal
        width={"80%"}
        title={`可${operator === "add" ? "添加" : "替换"}的文章列表`}
        open={isShow}
        onCancel={() => setIsShow(false)}
        footer={null}
      >
        <Table
          dataSource={selectPage?.data || []}
          columns={columns.concat({
            title: "操作",
            render: (_, record) => {
              return (
                <Button
                  onClick={async () => {
                    if (operator === "add") {
                      await addPage({
                        pageid: record.pageid,
                        position,
                      });
                    } else {
                      await replacePage({
                        preId: currentPageId.current,
                        newId: record.pageid,
                        position,
                      });
                    }
                    await refetch();
                    setIsShow(false);
                  }}
                  loading={isLoading}
                >
                  {operator === "add" ? "添加" : "替换"}
                </Button>
              );
            },
          })}
        />
      </Modal>
    </Card>
  );
}
