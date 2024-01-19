import { UserList, getUserList } from "@/api/data";
import { Avatar, Button, Card, message } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import moment from "moment";

export default function User() {
  const { data } = getUserList();
  const columns: ColumnsType<UserList> = [
    {
      dataIndex: "userImg",
      title: "头像",
      render: (val) => <Avatar src={val} />,
    },
    {
      dataIndex: "qq",
      title: "QQ",
    },
    {
      dataIndex: "userName",
      title: "用户名",
    },
    {
      dataIndex: "registerDate",
      title: "注册时间",
      render: (val) => moment(Number(val)).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      dataIndex: "pagesNumber",
      title: "文章数量",
    },
    {
      dataIndex: "school",
      title: "学校",
    },
    {
      dataIndex: "prefession",
      title: "专业",
    },
    {
      title: "操作",
      render: () => (
        <>
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
      <Table dataSource={data?.userList} columns={columns} />
    </Card>
  );
}
