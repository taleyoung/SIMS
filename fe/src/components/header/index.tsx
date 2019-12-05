import React, { SFC } from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import style from "./style.scss";

export interface IProps {}

const Header: SFC<IProps> = () => (
  <div>
    <Layout>
      <Menu
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        style={{ lineHeight: "64px", paddingLeft: "50%" }}
      >
        <Menu.Item key="1">
          <Link to="/app/home">首页</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/app/article">文章</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/app/project">项目</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/app/about">关于</Link>
        </Menu.Item>
      </Menu>
    </Layout>
  </div>
);

export default Header;
