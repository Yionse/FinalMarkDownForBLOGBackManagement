// @ts-nocheck

import { Button, Form, Input, message } from "antd";
import "./index.less";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { fetchLogin, getCode } from "@/api/login";

export default function Login() {
  const [form] = useForm();
  const navigate = useNavigate();
  const [isDisabledCodeBtn, setIDisabledCodeBtn] = useState<boolean>(false);
  const [timeout, setTimeout] = useState<number>(60);
  const timer = useRef<any>();
  const { mutateAsync } = useMutation(getCode);
  const { mutateAsync: login } = useMutation(fetchLogin);
  const checkCodeBtn = async (e: any) => {
    e.preventDefault();
    if (isDisabledCodeBtn) {
      message.warning("稍后重试");
      return;
    }
    const user = form.getFieldValue("username");
    if (user !== "admin") {
      message.error("当前账户没有权限");
      return;
    }
    mutateAsync();
    setIDisabledCodeBtn(true);
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setTimeout((countDown) => countDown - 1);
    }, 1000);
  };
  useEffect(() => {
    return () => clearInterval(timer.current);
  }, []);

  useEffect(() => {
    if (timeout < 1) {
      setTimeout(3);
      setIDisabledCodeBtn(false);
      clearInterval(timer.current);
    }
  }, [timeout]);
  return (
    <div className="box relative" style={{ width: "100vw", height: "100vh" }}>
      <div
        className="absolute top-1/2 left-1/2 h-96 w-96 "
        style={{ transform: "translate(-50%, -50%)" }}
      >
        <h1 className="text-center">个人博客</h1>
        <h3
          className="text-center font-normal text-base mt-4"
          style={{ color: "gray" }}
        >
          后台管理系统
        </h3>
        <Form
          className="mt-8"
          form={form}
          onFinish={async () => {
            const { username, code } = form.getFieldsValue([
              "username",
              "code",
            ]);
            if (username !== "admin") {
              message.error("当前用户没有权限");
              return;
            } else if (!code || code.length !== 6) {
              message.error("请输入正确的6位验证码");
              return;
            }
            const res = await login(code);
            if (res.isLogin) {
              localStorage.setItem("LOGIN_AGEING", JSON.stringify(+new Date()));
              navigate("/home/index", { replace: true });
            }
          }}
        >
          <Form.Item name="username">
            <Input
              type="text"
              prefix={<UserOutlined />}
              placeholder="请输入账号"
            />
          </Form.Item>
          <Form.Item name="code" className="relative">
            <Input
              type="number"
              prefix={<LockOutlined />}
              placeholder="请输入6为验证码"
              addonAfter={
                <a
                  type="link"
                  disabled={isDisabledCodeBtn}
                  onClick={checkCodeBtn}
                >
                  {isDisabledCodeBtn ? `${timeout}秒后再重试` : "发送验证码"}
                </a>
              }
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
