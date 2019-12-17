import React, { FC, useState, useEffect } from "react";
import { Table, message } from "antd";
import { useCookies } from "react-cookie";
import myApi from "../../utils/api";

import Breadcrumb from "../../components/Breadcrumb";

const NewCourse: FC = () => {
  const [list, setList] = useState([]);
  const [cookie] = useCookies();
  const fetchCourseList = async () => {
    const res = await myApi("/course/?pageNum=0&pageSize=10");
    const list = res.data.data.map((item: any) => ({
      ...item,
      key: item.cno
    }));
    setList(list);
  };
  useEffect(() => {
    fetchCourseList();
  }, []);
  const addCourse = async (cno: string) => {
    const res = await myApi(`/student/${cookie.id}/course`, "POST", {
      cno: parseInt(cno)
    });
    if (res.code === 0) {
      if (res.message == "该门课已经选过了") {
        message.warn("该门课已经选过了");
        return;
      }
      await fetchCourseList();
      message.success("选课成功");
    }
  };
  const columns = [
    {
      title: "课程号",
      dataIndex: "cno",
      key: "cno"
    },
    {
      title: "课程名",
      dataIndex: "cname",
      key: "cname"
    },
    {
      title: "任课老师",
      dataIndex: "tname",
      key: "tname"
    },
    {
      title: "选课",
      dataIndex: "handle",
      key: "handle",
      render: (text: string, record: any) => (
        <a onClick={() => addCourse(record.cno)}>点击选课</a>
      )
    }
  ];
  return (
    <div>
      <Breadcrumb titles={["学生系统", "选课"]}></Breadcrumb>

      <Table columns={columns} dataSource={list}></Table>
    </div>
  );
};

export default NewCourse;
