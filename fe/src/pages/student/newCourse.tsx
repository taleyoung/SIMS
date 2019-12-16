import React, { FC, useState, useEffect } from "react";
import { Table, message } from "antd";
import styled from "styled-components";
import myApi from "../../utils/api";

import Breadcrumb from "../../components/Breadcrumb";

const NewCourse: FC = () => {
  const [list, setList] = useState([]);
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
    const id = 1;
    const res = await myApi(`/student/${id}/course`, "POST", {
      cno: parseInt(cno)
    });
    console.log("res :", res);
    if (res.code === 0) {
      console.log(" 添加成功:");
      if (res.message == "该门课已经选过了") {
        message.warn("该门课已经选过了");
        return;
      }
      fetchCourseList();
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
      {/* <Wrapper>
        <Input
          placeholder="输入选课的id"
          value={cno}
          onChange={e => setCno(e.target.value)}
        ></Input>
        <Button type="primary">选课</Button>
      </Wrapper> */}
      <Table columns={columns} dataSource={list}></Table>
    </div>
  );
};

export default NewCourse;

const Wrapper = styled.a`
  display: flex;
  justify-content: center;
  width: 40%;
  margin-bottom: 20px;
  input {
    flex: 3;
    margin-right: 10px;
  }
  button {
    flex: 1;
  }
`;
