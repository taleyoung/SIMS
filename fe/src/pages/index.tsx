import React, { SFC } from "react";
import { Button } from "antd";
import Header from "../components/header";

interface IProps {}

const Index: SFC<IProps> = () => (
  <div>
    <Header></Header>
    <Button type="danger">antd</Button>
    <div className="test">index</div>
  </div>
);

export default Index;
