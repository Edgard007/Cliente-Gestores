import React, { useEffect, useState } from "react";
import { criticalError } from "./Helpers/helpers";

import { getAll as getAllAction } from "./Store/Actions/managers.actions";

import styled from "styled-components";
import { Table, Tooltip } from "antd";
import {
  PlusCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";

const App = () => {
  //* ==> State <== *//
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getAll = async () => {
    try {
      setLoading(true); // Show Loading
      const result: any = await getAllAction();
      const { ok, data } = result;
      if (ok) {
        setData(data);
      } else criticalError("Error getting managers");
      setLoading(false); // Hide Loading
    } catch (e) {
      console.error("||* ==> Error getAll <== *||", e);
      criticalError("Error getting managers");
      setLoading(false); // Hide Loading
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  const changeRecord = async (record: any) => {
    console.log("record", record);
  };

  const deleteRecord = async (record: any) => {
    console.log("record", record);
  };

  const columns: Object[] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      align: "center",
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
      align: "center",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "actions",
      align: "center",
      render: (text: any, record: any) => (
        <>
          <Tooltip title="Edit record">
            <EditTwoTone
              className="icons"
              onClick={() => changeRecord(record)}
            />
          </Tooltip>
          <Tooltip title="Delete record">
            <DeleteTwoTone
              className="icons"
              onClick={() => deleteRecord(record)}
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Wrapper>
      <div className="containerTitule">
        <span className="titule">Maintenance of managers</span>
      </div>
      <div className="containerTable">
        <div className="headerTable">
          <Tooltip title="Add new record">
            <PlusCircleTwoTone className="iconAdd" />
          </Tooltip>
        </div>
        <Table dataSource={data} columns={columns} loading={loading} />
      </div>
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

  .icons {
    cursor: pointer;
    font-size: 20px;
    margin-left: 20px;
    color: #001e94 !important;
  }

  .containerTable {
    margin-left: 40px;
    margin-right: 40px;
  }

  .headerTable {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    margin-bottom: 20px;
  }

  .iconAdd {
    cursor: pointer;
    font-size: 25px;
    margin-right: 20px;
    color: #001e94 !important;
  }
`;
export default App;
