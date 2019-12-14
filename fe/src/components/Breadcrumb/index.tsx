import React, { FC } from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";

interface Props {
  titles: Array<string>;
}

const Breadcrumb: FC<Props> = props => {
  return (
    <div>
      <AntBreadcrumb style={{ margin: "16px 0" }}>
        <AntBreadcrumb.Item>学生信息管理系统</AntBreadcrumb.Item>
        {props.titles.map(item => (
          <AntBreadcrumb.Item key={item}>{item}</AntBreadcrumb.Item>
        ))}
      </AntBreadcrumb>
    </div>
  );
};

export default Breadcrumb;
