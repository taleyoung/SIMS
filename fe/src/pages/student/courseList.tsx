import React, { FC, useState, useEffect } from "react";
import { Table, message } from "antd";
import { useCookies } from "react-cookie";

import Breadcrumb from "../../components/Breadcrumb";
import myApi from "../../utils/api";

const CourseList: FC = () => {
  const [list, setList] = useState<Array<Object>>([]);
  const [cookie] = useCookies();

  const fetchList = async () => {
    const res = await myApi(
      `/student/${cookie.id}/course?pageNum=0&pageSize=10`
    );
    const list = res.data.data.map((item: any) => ({
      ...item,
      key: `${item.id}${item.cno}`
    }));
    setList(list);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const deleteCourse = async (cno: string) => {
    const res = await myApi(`/student/${cookie.id}/course`, "DELETE", {
      cno: parseInt(cno)
    });
    if (res.code === 0) {
      fetchList();
      message.success("退选成功");
    }
  };
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
      render: (text: string, record: any) => (
        <a onClick={() => deleteCourse(record.cno)}>退选</a>
      )
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
