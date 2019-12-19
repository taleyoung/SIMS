import React, { FC, useState } from "react";
import { useCookies } from "react-cookie";
import { withRouter, RouteComponentProps } from "react-router";
import { Descriptions, Modal, Input, message } from "antd";
import { infoStr } from "../../utils/constant";
import myApi from "../../utils/api";
import styled from "styled-components";

const { Item } = Descriptions;

interface Props {
  history: { push: any };
}

const Info: FC<Props & RouteComponentProps> = props => {
  const [cookie] = useCookies();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState();

  const changePwd = async () => {
    if (password.trim() === "") {
      message.warn("密码不能为空");
      return;
    }
    if (password !== password2) {
      message.warn("两次密码不一致");
      return;
    }
    setLoading(true);
    const url =
      cookie.role === "0"
        ? `/student/${cookie.id}/information`
        : `/teacher/${cookie.id}/information`;

    const res = await myApi(url, "PUT", {
      password
    });
    if (res.code === 0) {
      setLoading(false);
      setPassword("");
      setModal(false);
      message.success("修改成功，请重新登录");
      props.history.push("/login");
    } else {
      message.warn("修改失败，请检查网络环境");
    }
    setLoading(false);
    setPassword("");
    setModal(false);
  };

  return (
    <div>
      <Descriptions title="个人信息" bordered column={2}>
        {Object.keys(cookie).map(key => (
          <Item key={key} label={infoStr[key]}>
            {key === "password" ? (
              <a onClick={() => setModal(true)}>修改密码</a>
            ) : (
              cookie[key]
            )}
          </Item>
        ))}
      </Descriptions>
      <Modal
        title="修改密码"
        visible={modal}
        onOk={changePwd}
        cancelText="取消"
        okText="确定"
        confirmLoading={loading}
        onCancel={() => {
          setPassword("");
          setModal(false);
        }}
      >
        <Wrap>
          <Input.Password
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="请输入需要修改的密码"
          ></Input.Password>
        </Wrap>
        <Input.Password
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          placeholder="请再次输入修改的密码"
        ></Input.Password>
      </Modal>
    </div>
  );
};

export default withRouter(Info);

const Wrap = styled.div`
  margin-bottom: 20px;
`;
