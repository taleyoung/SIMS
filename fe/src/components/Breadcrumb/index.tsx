import React, { FC } from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { withRouter, RouteComponentProps } from "react-router";
import { breadTitle } from "../../utils/constant";

interface Props {
  location: { pathname: string };
}

const Breadcrumb: FC<Props & RouteComponentProps> = props => {
  const arr = props.location.pathname.split("/");

  return (
    <div>
      <AntBreadcrumb style={{ margin: "16px 0" }}>
        <AntBreadcrumb.Item>学生信息管理系统</AntBreadcrumb.Item>
        {arr.map(item => (
          <AntBreadcrumb.Item key={item}>{breadTitle[item]}</AntBreadcrumb.Item>
        ))}
      </AntBreadcrumb>
    </div>
  );
};

export default withRouter(Breadcrumb);
