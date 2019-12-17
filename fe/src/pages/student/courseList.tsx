import React, { FC, useState, useEffect } from "react";
import { Table, message, Popconfirm } from "antd";
import { useCookies } from "react-cookie";
import myApi from "../../utils/api";

const CourseList: FC = () => {
  const [list, setList] = useState<Array<Object>>([]);
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies();

  const fetchList = async () => {
    const res = await myApi(
      `/student/${cookie.id}/course?pageNum=0&pageSize=10`
    );

    const list = res.data
      ? res.data.data.map((item: any) => ({
          ...item,
          key: `${item.id}${item.cno}`
        }))
      : [];
    setLoading(false);
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
        <Popconfirm
          title="确定要退选这门课吗"
          placement="topRight"
          onConfirm={() => deleteCourse(record.cno)}
          okText="确认"
          cancelText="取消"
        >
          <a>退选</a>
        </Popconfirm>
      )
    }
  ];

  return (
    <div>
      <Table columns={columns} dataSource={list} loading={loading} />
    </div>
  );
};

export default CourseList;
