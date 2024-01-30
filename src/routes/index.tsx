import {
  CheckCircleOutlined,
  HomeOutlined,
  ProfileOutlined,
  SnippetsOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

/**
 * 这里要和APP.tsx中的路由对象，记得放路由出口
 */

export const routes: MenuItem[] = [
  {
    label: "主页",
    icon: <HomeOutlined />,
    key: "home",
  },
  {
    label: "文章面板",
    icon: <ProfileOutlined />,
    key: "indexPg",
  },
  {
    label: "用户列表",
    icon: <UsergroupAddOutlined />,
    key: "user",
  },
  {
    label: "文章管理",
    icon: <SnippetsOutlined />,
    key: "paper",
    children: [
      {
        label: "文章列表",
        icon: <UnorderedListOutlined />,
        key: "list",
      },
      {
        label: "文章审核",
        icon: <CheckCircleOutlined />,
        key: "check",
      },
    ],
  },
];
