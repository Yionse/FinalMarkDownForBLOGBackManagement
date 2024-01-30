//@ts-nocheck
import { ProLayout } from "@ant-design/pro-components";
import { useState } from "react";
import defaultProps from "./_defaultProps";
import logo from "@public/icon.ico";

export default () => {
  const [pathname, setPathname] = useState("/home");
  return (
    <div
      style={{
        height: "100vh",
      }}
    >
      <ProLayout
        title="后台管理系统"
        logo={logo}
        {...defaultProps}
        location={{
          pathname,
        }}
        menuItemRender={(item: any, dom: any) => (
          <div
            onClick={() => {
              setPathname(item.path || "/home");
            }}
          >
            {dom}
          </div>
        )}
      ></ProLayout>
    </div>
  );
};
