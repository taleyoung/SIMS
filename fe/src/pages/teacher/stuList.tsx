import React, { FC, useState, useEffect } from "react";
import { Table } from "antd";
import { useCookies } from "react-cookie";

import Breadcrumb from "../../components/Breadcrumb";
import myApi from "../../utils/api";

const StuList: FC = props => {
  const [list, setList] = useState<Array<Object>>([]);
  const [cookie] = useCookies();

  const fetchList = async () => {
    const res = await myApi(
      `/teacher/${cookie.id}/stulist/?pageNum=0&pageSize=10`,
      "POST",
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

  return (
    <div>
      <Breadcrumb titles={["学生管理", "所开课程", "学生列表"]}></Breadcrumb>
      <div>
        <Table columns={columns} dataSource={list} />
      </div>
    </div>
  );
};

export default StuList;
