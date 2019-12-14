import React, { FC } from "react";
import { Table } from "antd";

const StuList: FC = () => {
  const columns = [
    {
      title: "学号",
      dataIndex: "account",
      key: "account"
    },
    {
      title: "姓名",
      dataIndex: "sname",
      key: "sname"
    },
    {
      title: "课程号",
      key: "cno",
      dataIndex: "cno"
    },
    {
      title: "课程名",
      key: "cname",
      dataIndex: "cname"
    },
    {
      title: "成绩",
      key: "grade",
      dataIndex: "grade"
    },
    {
      title: "任课老师",
      key: "tname",
      dataIndex: "tname"
    }
  ];

  const data = [
    {
      id: 1,
      account: "17130130277",
      sname: "连占标",
      cno: 1,
      cname: "计算机组成",
      grade: 95.0,
      sdept: "cs",
      tname: "刘凯"
    },
    {
      id: 7,
      account: "17050310024",
      sname: "常忠浩",
      cno: 1,
      cname: "计算机组成",
      grade: 95.0,
      sdept: "cs",
      tname: "刘凯"
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default StuList;
