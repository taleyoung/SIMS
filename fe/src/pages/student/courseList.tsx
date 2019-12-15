import React, { FC, useState, useEffect } from "react";
import { Table } from "antd";

import Breadcrumb from "../../components/Breadcrumb";
import myApi from "../../utils/api";

const CourseList: FC = () => {
  const [list, setList] = useState<Array<Object>>([]);
  useEffect(() => {
    const fetchList = async () => {
      const res = await myApi("/student/1/course?pageNum=0&pageSize=10");
      const list = res.data.data.map((item: any) => ({
        ...item,
        key: item.id
      }));
      setList(list);
    };
    fetchList();
  }, []);

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
    },
    {
      title: "操作",
      key: "delete",
      render: (text: string, record: any) => <a>退选</a>
    }
  ];

  return (
    <div>
      <div>
        <Breadcrumb titles={["学生管理", "选课查询"]}></Breadcrumb>
      </div>
      <Table columns={columns} dataSource={list} />
    </div>
  );
};

export default CourseList;

const data = [
  {
    id: 4,
    key: "2",
    account: "17130130279",
    sname: "刘奇鑫",
    cno: 1,
    cname: "计算机组成",
    grade: 80.0,
    sdept: "cs",
    tname: "李伯成"
  }
];
