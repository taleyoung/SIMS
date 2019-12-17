import React, { FC, useState, useEffect } from "react";
import { Table } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";

import myApi from "../../utils/api";

const Courses: FC = () => {
  const [list, setList] = useState<Array<Object>>([]);
  const [cookie] = useCookies();
  const fetchList = async () => {
    const res = await myApi(
      `/teacher/${cookie.id}/courses?pageNum=0&pageSize=10`,
      "GET",
      {
        cno: 1
      }
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

  const columns = [
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
      title: "查看所选学生",
      key: "handle",
      dataIndex: "handle",
      render: (text: string, record: any) => (
        <Link to={`/teacher/courses/stulist/${record.cno}`}>查看</Link>
      )
    }
  ];

  return (
    <div>
      <Wrapper>
        <Table columns={columns} dataSource={list} />
      </Wrapper>
    </div>
  );
};

export default Courses;

const Wrapper = styled.div`
  width: 60%;
`;
