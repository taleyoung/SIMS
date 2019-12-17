import React, { FC, useState, useEffect } from "react";
import { Table, Modal, Input, message } from "antd";
import { useCookies } from "react-cookie";
import styled from "styled-components";
import myApi from "../../utils/api";

interface Props {
  match: { params: { [key: string]: string } };
}

const StuList: FC<Props> = props => {
  const [list, setList] = useState<Array<Object>>([]);
  const [record, setRecord] = useState<{ [key: string]: string }>({});
  const [grade, setGrade] = useState("");
  const [modal, setModal] = useState(false);
  const [cookie] = useCookies();
  const [loading, setLoading] = useState(true);

  const fetchList = async () => {
    const { cno } = props.match.params;
    const res = await myApi(
      `/teacher/${cookie.id}/stulist/?pageNum=0&pageSize=10`,
      "POST",
      {
        cno: parseInt(cno)
      }
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

  const changeGrade = async () => {
    const res = await myApi(`/course/grades/${record.cno}`, "PUT", [
      {
        id: record.id,
        grade: parseFloat(grade)
      }
    ]);
    if (res.message === "请求成功") {
      setGrade("");
      setModal(false);
      await fetchList();
      message.success("修改成绩成功");
    } else {
      message.warn("修改失败，请检查网络环境");
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
      key: "handle",
      dataIndex: "handle",
      render: (text: string, record: any) => (
        <a
          onClick={() => {
            setRecord(record);
            setModal(true);
          }}
        >
          修改成绩
        </a>
      )
    }
  ];

  return (
    <div>
      <div>
        <Table columns={columns} dataSource={list} loading={loading} />
      </div>
      <Modal
        title="修改成绩"
        visible={modal}
        onOk={changeGrade}
        cancelText="取消"
        okText="确定"
        confirmLoading={loading}
        onCancel={() => {
          setGrade("");
          setModal(false);
        }}
      >
        <Row>学号：{record.account}</Row>
        <Row>姓名：{record.sname}</Row>
        <Row>
          <div>成绩：</div>
          <div>
            <Input
              value={grade}
              onChange={e => setGrade(e.target.value)}
              placeholder={record.grade}
            ></Input>
          </div>
        </Row>
      </Modal>
    </div>
  );
};

export default StuList;

const Row = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
