import { Badge, Dropdown, Space, Table } from "antd";

import { DownOutlined } from "@ant-design/icons";
import React from "react";

const items = [
  { key: "1", label: "Action 1" },
  { key: "2", label: "Action 2" },
];
const expandDataSource = Array.from({ length: 3 }).map((_, i) => ({
  key: i.toString(),
  date: "2014-12-24 23:12:00",
  name: "This is production name",
  upgradeNum: "Upgraded: 56",
}));
const dataSource = Array.from({ length: 3 }).map((_, i) => ({
  key: i.toString(),
  name: "Screen",
  platform: "iOS",
  version: "10.3.4.5654",
  upgradeNum: 500,
  creator: "Jack",
  createdAt: "2014-12-24 23:12:00",
}));
const expandColumns = [
  { title: "Date", dataIndex: "date", key: "date" },
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Status",
    key: "state",
    render: () => <Badge status="success" text="Finished" />,
  },
  { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
  {
    title: "Action",
    key: "operation",
    render: () => (
      <Space size="middle">
        <a>Pause</a>
        <a>Stop</a>
        <Dropdown menu={{ items }}>
          <a>
            More <DownOutlined />
          </a>
        </Dropdown>
      </Space>
    ),
  },
];
const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Platform", dataIndex: "platform", key: "platform" },
  { title: "Version", dataIndex: "version", key: "version" },
  { title: "Upgraded", dataIndex: "upgradeNum", key: "upgradeNum" },
  { title: "Creator", dataIndex: "creator", key: "creator" },
  { title: "Date", dataIndex: "createdAt", key: "createdAt" },
  { title: "Action", key: "operation", render: () => <a>Publish</a> },
];
const expandedRowRender = () => (
  <Table
    columns={expandColumns}
    dataSource={expandDataSource}
    pagination={false}
  />
);
const App = () => (
  <>
    <Table
      columns={columns}
      expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
      dataSource={dataSource}
    />
    <Table
      columns={columns}
      expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
      dataSource={dataSource}
      size="middle"
    />
    <Table
      columns={columns}
      expandable={{ expandedRowRender, defaultExpandedRowKeys: ["0"] }}
      dataSource={dataSource}
      size="small"
    />
  </>
);
export default App;
