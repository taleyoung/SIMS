import React, { SFC } from "react";
import styled from "styled-components";
import { withRouter, RouteComponentProps } from "react-router";
import { useCookies } from "react-cookie";
import { Layout, Icon, Button, Popconfirm } from "antd";
const { Header: AntHeader } = Layout;

interface Props {
  history: { push: any };
}
const Header: SFC<Props & RouteComponentProps> = props => {
  const [cookie, , removeCookie] = useCookies();
  const exit = async () => {
    const res = await new Promise(resolve => {
      setTimeout(() => {
        resolve(111);
      }, 100);
    });
    console.log("res :", res);
    Object.keys(cookie).forEach(key => {
      removeCookie(key, { path: "/" });
    });
    props.history.push("/login");
  };
  return (
    <AntHeader>
      <Wrapper>
        <Title>
          <div>
            <Icon type="schedule" theme="twoTone" />
          </div>
          学生信息管理系统
        </Title>
        <User>
          <Icon type="user" />
          <div>
            {cookie.name}
            {cookie.role === "0" ? "学生" : "老师"}
          </div>
          <Popconfirm
            title="确定要退出登录吗"
            placement="bottomRight"
            onConfirm={exit}
            okText="确认"
            cancelText="取消"
          >
            <Button type="danger">退出 </Button>
          </Popconfirm>
        </User>
      </Wrapper>
    </AntHeader>
  );
};

export default withRouter(Header);

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  color: #fff;
  font-size: 1.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    font-size: 2em;
    margin-right: 10px;
  }
`;

const User = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 1.2em;
  div {
    margin-left: 10px;
    margin-right: 10px;
  }
`;
