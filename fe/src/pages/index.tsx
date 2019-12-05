import React, { SFC } from "react";
import { Button } from "antd";

interface IProps {}

const Index: SFC<IProps> = () => (
  <div>
    <Button type="danger">antd</Button>
    <div className="test">index</div>
  </div>
);

export default Index;
