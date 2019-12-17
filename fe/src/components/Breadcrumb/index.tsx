import React, { FC } from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";
import { withRouter, RouteComponentProps } from "react-router";

interface Props {
  location: { pathname: string };
}

const Breadcrumb: FC<Props & RouteComponentProps> = props => {
  const arr = props.location.pathname.split("/");
  const mapToTitle = (str: string) => {
    switch (str) {
      case "student":
        return "学生系统";
      case "courses":
        return "所选课程";
      case "newcourse":
        return "所有课程";
      case "group":
        return "所加学会";
      case "newgroup":
        return "学会列表";
      case "teacher":
        return "教师系统";
      case "info":
        return "个人信息";
      case "stulist":
        return "学生列表";
      default:
        break;
    }
  };
  return (
    <div>
      <AntBreadcrumb style={{ margin: "16px 0" }}>
        <AntBreadcrumb.Item>学生信息管理系统</AntBreadcrumb.Item>
        {arr.map(item => (
          <AntBreadcrumb.Item key={item}>{mapToTitle(item)}</AntBreadcrumb.Item>
        ))}
      </AntBreadcrumb>
    </div>
  );
};

export default withRouter(Breadcrumb);
