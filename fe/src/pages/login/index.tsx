import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { Input, Button, Radio, message, Icon, Layout } from "antd";
import { RouteComponentProps } from "react-router";

import { connect } from "react-redux";
import { fetchLogin } from "../../redux/actions/user";
import { Store, User } from "../../types/store";

import myApi from "../../utils/api";
const { Footer } = Layout;

interface Props {
  user: User;
  fetchLogin: any;
  history: any;
}

const Login: FC<Props & RouteComponentProps> = props => {
  const [account, setAccount] = useState();
  const [password, setPassword] = useState();
  const [choice, setChoice] = useState("0");

  const [cookie, setCookie, removeCookie] = useCookies();

  const login = async () => {
    // const res = await props.fetchLogin({
    //   account,
    //   password,
    //   choice: parseInt(choice)
    // });
    const res = await myApi("/login/", "POST", {
      account,
      password,
      choice: parseInt(choice)
    });
    if (res.message == "请求成功") {
      message.success("登录成功");
      if (cookie) {
        Object.keys(cookie).forEach(item => {
          removeCookie(item, { path: "/" });
        });
      }
      setCookie("role", choice, { path: "/" });
      Object.keys(res.data).forEach(item => {
        setCookie(item, res.data[item], { path: "/" });
      });
      const url = choice === "0" ? "/student/courses" : "/teacher/courses";
      props.history.push(url);
    } else {
      message.warn("登录失败，账号或密码输入错误");
    }
  };
  useEffect(() => {
    console.log("props.user :", props.user);
  }, [props.user]);
  return (
    <div>
      <Bg>
        <Wrapper>
          <TopBar>
            <div>学生信息管理系统</div>
            <Title>
              <Icon type="alert" theme="twoTone" />
              欢迎登录
            </Title>
          </TopBar>
          <Row>
            <div>账号: </div>
            <div>
              <Input
                value={account}
                onChange={e => setAccount(e.target.value)}
              ></Input>
            </div>
          </Row>
          <Row>
            <div>密码: </div>
            <div>
              <Input.Password
                value={password}
                onChange={e => setPassword(e.target.value)}
                visibilityToggle={false}
              ></Input.Password>
            </div>
          </Row>
          <Row>
            <div>
              <Radio.Group
                value={choice}
                onChange={e => setChoice(e.target.value)}
              >
                <Radio.Button value="0">学生</Radio.Button>
                <Radio.Button value="1">教师</Radio.Button>
              </Radio.Group>
            </div>
          </Row>
          <Row>
            <Button
              block
              type="primary"
              onClick={login}
              style={{ width: "200px" }}
            >
              登录
            </Button>
          </Row>
        </Wrapper>
      </Bg>
      <Footer style={{ textAlign: "center", background: "#fff" }}>
        ❤️ ©2019 Design By tengye 🍭
      </Footer>
    </div>
  );
};

export default connect(
  (state: Store) => ({
    user: state.user
  }),
  {
    fetchLogin
  }
)(Login);

const Bg = styled.div`
  background: #eee;
  padding: 100px;
  min-height: 100%;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 500px;
  height: 420px;
  border: 1px solid #fff;
  margin: auto;
  background: #fff;
  border-radius: 15px;
`;
const TopBar = styled.div`
  font-size: 1.2em;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const Title = styled.div`
  font-size: 1.5em;
  margin: 10px auto;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: 5px;
  }
`;
