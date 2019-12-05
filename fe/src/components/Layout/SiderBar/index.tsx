import React, { SFC } from "react";
import { Layout, Menu, Icon } from "antd";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderBar: SFC = () => {
  return (
    <div>
      <Sider width={200} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          style={{ height: "100%" }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <Icon type="user" />
                成绩管理
              </span>
            }
          >
            <Menu.Item key="1">成绩概览</Menu.Item>
            <Menu.Item key="2">成绩查询</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                学生管理
              </span>
            }
          >
            <Menu.Item key="5">学生列表</Menu.Item>
            <Menu.Item key="6">学生管理</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
};

export default SiderBar;
