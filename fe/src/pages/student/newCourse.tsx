import React, { FC, useState, useEffect } from "react";
import { Table, message } from "antd";
import { useCookies } from "react-cookie";
import myApi from "../../utils/api";

const NewCourse: FC = () => {
  const [list, setList] = useState([]);
  const [cookie] = useCookies();
  const [loading, setLoading] = useState(true);
  const fetchCourseList = async () => {
    const res = await myApi("/course/?pageNum=0&pageSize=10", "POST", {
      id: cookie.id
    });
    const list = res.data.data.map((item: any) => ({
      ...item,
      key: item.cno
    }));
    setLoading(false);
    setList(list);
  };
  useEffect(() => {
    fetchCourseList();
  }, []);
  const addCourse = async (cno: string) => {
    setLoading(true);
    const res = await myApi(`/student/${cookie.id}/course`, "POST", {
      cno: parseInt(cno)
    });
    if (res.code === 0) {
      setLoading(false);
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
      title: "操作",
      dataIndex: "handle",
      key: "handle",
      render: (text: string, record: any) =>
        record.status ? (
          "已选"
        ) : (
          <a onClick={() => addCourse(record.cno)}>选课</a>
        )
    }
  ];
  return (
    <div>
      <Table columns={columns} dataSource={list} loading={loading}></Table>
    </div>
  );
};

export default NewCourse;
