import React from "react";
import { Breadcrumb as AntBreadcrumb } from "antd";

function Breadcrumb() {
  return (
    <div>
      <AntBreadcrumb style={{ margin: "16px 0" }}>
        <AntBreadcrumb.Item>学生信息管理系统</AntBreadcrumb.Item>
        <AntBreadcrumb.Item>成绩管理</AntBreadcrumb.Item>
        <AntBreadcrumb.Item>成绩查询</AntBreadcrumb.Item>
      </AntBreadcrumb>
    </div>
  );
}

export default Breadcrumb;
