import { Card, Radio, Space } from "antd";
import { useState } from "react";

export default function IndexPg() {
  const [position, setPosition] = useState<string>("home");
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
    </Card>
  );
}
