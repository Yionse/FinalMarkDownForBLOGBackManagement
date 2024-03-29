import React, { useEffect, useState } from "react";
import { Layout, Menu, message, theme } from "antd";
import logo from "@public/icon.ico";
import { Outlet, useNavigate } from "react-router-dom";
import { routes } from "@/routes";
import "./index.less";

const { Header, Content, Sider } = Layout;

const getSelectKeys = () => {
  if (location.pathname === "/home/index") {
    return ["home"];
  } else {
    return location.pathname.replace("/home", "").split("/");
  }
};

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isShowTitle, setIsShowTitle] = useState(true);
  const [title, setTitle] = useState("主页");
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  useEffect(() => {
    const preAgeing = Math.floor(
      JSON.parse(localStorage.getItem("LOGIN_AGEING")!)
    );
    // 登录时效30分钟
    const nowAgeing = (+new Date() - preAgeing) / 1000 / 60 < 30;
    if (!nowAgeing) {
      message.warning("登录时效已到，请重新登录");
      navigate("/", { replace: true });
    }
  }, [location.pathname]);
  return (
    <Layout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => {
          setCollapsed(value);
          setIsShowTitle(!isShowTitle);
        }}
      >
        <div
          className="demo-logo-vertical flex flex-row my-4 box-border justify-center w-4/5 mx-auto"
          onClick={() => navigate("/home")}
        >
          <img src={logo} className="w-7 h-7" />
          {isShowTitle && (
            <p
              className="h-7 text-center pl-4"
              style={{ lineHeight: "28px", color: "white" }}
            >
              后台管理系统
            </p>
          )}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={getSelectKeys()}
          defaultOpenKeys={getSelectKeys()}
          items={routes}
          onClick={({ keyPath, domEvent }: any) => {
            let path: string = "/home";
            for (let i = keyPath.length; i > 0; i--) {
              if (keyPath[i - 1] === "home") {
                path += "/index";
                break;
              }
              path += `/${keyPath[i - 1]}`;
            }
            setTitle(domEvent.target.innerText);
            navigate(path);
          }}
        />
      </Sider>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <h2 className="pl-6">{title}</h2>
        </Header>
        <Content
          id="ContentBox"
          style={{
            margin: "16px",
            height: "calc(100vh - 16px - 64px)",
            overflowY: "scroll",
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
