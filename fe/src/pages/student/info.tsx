import React, { FC } from "react";
import { useCookies } from "react-cookie";
import { Descriptions } from "antd";

const { Item } = Descriptions;
const Info: FC = () => {
  const [cookie] = useCookies();

  return (
    <div>
      <Descriptions title="个人信息" bordered column={2}>
        {Object.keys(cookie).map(key => (
          <Item key={key} label={key}>
            {key === "password" ? "********" : cookie[key]}
          </Item>
        ))}
      </Descriptions>
    </div>
  );
};

export default Info;
