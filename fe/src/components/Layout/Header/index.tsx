import React, { SFC } from "react";
import { Layout } from "antd";
const { Header: AntHeader } = Layout;

const Header: SFC = () => (
  <AntHeader className="header">
    <div className="logo" />
    {/* <Menu
    theme="dark"
    mode="horizontal"
    defaultSelectedKeys={["2"]}
    style={{ lineHeight: "64px" }}
  >
    <Menu.Item key="1">nav 1</Menu.Item>
    <Menu.Item key="2">nav 2</Menu.Item>
    <Menu.Item key="3">nav 3</Menu.Item>
  </Menu> */}
  </AntHeader>
);

export default Header;
