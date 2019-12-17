import React, { FC, useState, useEffect } from "react";
import styled from "styled-components";
import { useCookies } from "react-cookie";
import { Input, Button, Radio, message } from "antd";
import { RouteComponentProps } from "react-router";

import { connect } from "react-redux";
import { fetchLogin } from "../../redux/actions/user";
import { Store, User } from "../../types/store";

import myApi from "../../utils/api";

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
      <Wrapper>
        <Title>欢迎登录</Title>
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
            <Input
              value={password}
              onChange={e => setPassword(e.target.value)}
            ></Input>
          </div>
        </Row>
        <Row>
          <div>角色：</div>
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
          <Button block type="primary" onClick={login}>
            登录
          </Button>
        </Row>
      </Wrapper>
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

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 300px;
  padding: 50px;
  border: 1px solid #eee;
  margin: 100px auto;
`;
const Title = styled.div`
  font-size: 2em;
  margin-bottom: 10px;
`;
const Row = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  div {
    margin: 5px;
  }
`;
