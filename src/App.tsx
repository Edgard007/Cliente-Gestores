import React, { useEffect, useState } from "react";
import { criticalError } from "./Helpers/helpers";

import { getAll as getAllAction } from "./Store/Actions/managers.actions";

import styled from "styled-components";
import { Table } from "antd";

const App = () => {
  //* ==> State <== *//
  const [data, setData] = useState([]);

  const getAll = async () => {
    const result: any = await getAllAction();
    const { ok, data } = result;
    if (ok) {
      setData(data);
    } else criticalError("Error getting managers");
  };

  useEffect(() => {
    getAll();
  }, []);

  const columns: Object[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Developer",
      dataIndex: "desarrollador",
      key: "desarrollador",
    },
    {
      title: "Year of release",
      dataIndex: "lanzamiento",
      key: "lanzamiento",
    },
  ];

  return (
    <Wrapper>
      <div className="containerTitule">
        <span className="titule">Maintenance of managers</span>
      </div>
      <Table dataSource={data} columns={columns} />;
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  .containerTitule {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 15%;
  }

  .titule {
    color: #001e94;
    font-size: 20px;
    font-weight: bold;
  }

  .ant-table-wrapper {
    padding-left: 40px;
    padding-right: 40px;
  }
`;
export default App;
