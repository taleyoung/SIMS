import React, { FC, useState, useEffect } from "react";
import { Table } from "antd";
import dayjs from "dayjs";
import myApi from "../../utils/api";

const NewGroup: FC = () => {
  const [list, setList] = useState<Array<Object>>([]);
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    const res = await myApi("/group/all?pageNum=0&pageSize=10");
    const list = res.data.data.map((item: any) => ({
      ...item,
      key: `${item.id}`,
      setdate: dayjs(item.setdate).format("YYYY-MM-DD HH:MM")
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
    },
    {
      title: "操作",
      key: "handle",
      dataIndex: "handle",
      render: (text: string, record: any) => <a>加入</a>
    }
  ];

  return (
    <div>
      <Table columns={columns} dataSource={list} loading={loading} />
    </div>
  );
};

export default NewGroup;
