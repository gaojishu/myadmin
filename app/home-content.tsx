"use client";

import { Button, Space, Typography } from "antd";

export default function HomeContent() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <Space direction="vertical" size="large" align="center">
        <Typography.Title level={2}>MyAdmin</Typography.Title>
        <Typography.Text type="secondary">
          Ant Design 6 已成功集成
        </Typography.Text>
        <Button type="primary">开始使用</Button>
      </Space>
    </div>
  );
}
