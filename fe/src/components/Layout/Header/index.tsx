import React, { SFC } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { Layout, Icon, Button } from "antd";
const { Header: AntHeader } = Layout;

const Header: SFC = () => {
  const [cookie, setCookie, removeCookie] = useCookies();
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
            {cookie.role === "0" ? "同学" : "老师"}
          </div>
          <Button type="danger">退出</Button>
        </User>
      </Wrapper>
    </AntHeader>
  );
};

export default Header;

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
