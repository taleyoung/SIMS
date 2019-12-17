import React, { FC, useState, useEffect } from "react";
import { Table } from "antd";
import { useCookies } from "react-cookie";

import Breadcrumb from "../../components/Breadcrumb";
import myApi from "../../utils/api";

const Group: FC = () => {
  const [list, setList] = useState<Array<Object>>([]);
  const [loading, setLoading] = useState(true);
  const [cookie] = useCookies();

  const fetchList = async () => {
    const res = await myApi(
      `/student/${cookie.id}/group?pageNum=0&pageSize=10`
    );
    const list = res.data.data.map((item: any) => ({
      ...item,
      key: `${item.id}`
    }));
    setLoading(false);
    setList(list);
  };

  useEffect(() => {
    fetchList();
  }, []);

  const columns = [
    {
      title: "学会号",
      dataIndex: "sgno",
      key: "sgno"
    },
    {
      title: "学会名",
      dataIndex: "sgname",
      key: "sgname"
    },
    {
      title: "成立时间",
      key: "setdate",
      dataIndex: "setdate"
    },
    {
      title: "地点",
      key: "place",
      dataIndex: "place"
    }
  ];

  return (
    <div>
      <div>
        <Breadcrumb titles={["学生管理", "已加学会"]}></Breadcrumb>
      </div>
      <Table columns={columns} dataSource={list} loading={loading} />
    </div>
  );
};

export default Group;
