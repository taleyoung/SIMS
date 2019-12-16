import React, { SFC } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";

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
                学生系统
              </span>
            }
          >
            <Menu.Item key="1">
              <Link to="/student/course">已选课程</Link>
            </Menu.Item>

            <Menu.Item key="2">
              <Link to="/student/newcourse">新建选课</Link>
            </Menu.Item>

            <Menu.Item key="3">个人信息修改</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            title={
              <span>
                <Icon type="laptop" />
                教师系统
              </span>
            }
          >
            <Menu.Item key="5">
              <Link to="/teacher/courses">所开课程</Link>
            </Menu.Item>
            <Menu.Item key="6">个人信息修改</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
    </div>
  );
};

export default SiderBar;
