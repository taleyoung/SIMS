import React, { SFC } from "react";
import { Layout, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

const { SubMenu } = Menu;
const { Sider } = Layout;

const SiderBar: SFC = () => {
  const [cookie, setCookie] = useCookies(["user"]);
  console.log("cookies :", cookie);
  const StuMenu = (
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
        <Link to="/student/courses">已选课程</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Link to="/student/newcourse">新建选课</Link>
      </Menu.Item>

      <Menu.Item key="3">
        <Link to="/student/info">个人信息</Link>
      </Menu.Item>
    </SubMenu>
  );
  const TeacherMenu = (
    <SubMenu
      key="sub2"
      title={
        <span>
          <Icon type="laptop" />
          教师系统
        </span>
      }
    >
      <Menu.Item key="4">
        <Link to="/teacher/courses">所开课程</Link>
      </Menu.Item>
      <Menu.Item key="5">
        <Link to="/teacher/info">个人信息</Link>
      </Menu.Item>
    </SubMenu>
  );
  return (
    <div>
      <Sider width={200} style={{ background: "#fff" }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1", "4"]}
          defaultOpenKeys={["sub1", "sub2"]}
          style={{ height: "100%" }}
        >
          {cookie.role === "0" ? StuMenu : TeacherMenu}
        </Menu>
      </Sider>
    </div>
  );
};

export default SiderBar;
