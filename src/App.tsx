import { useEffect, useState } from "react";

import styled from "styled-components";
import { Table, Tooltip } from "antd";
import {
  PlusCircleTwoTone,
  EditTwoTone,
  DeleteTwoTone,
} from "@ant-design/icons";

//* ==> Helpers <== *//
import { criticalError, confirmAlert, alertSucces } from "./Helpers/helpers";

//* ==> Actions <== *//
import {
  getAll as getAllAction,
  addRecord as addRecordAction,
  editRecord as editRecordAction,
  deleteRecord as deleteRecordAction,
} from "./Store/Actions/managers.actions";

//* ==> Components <== *//
import ModalRecord from "./Components/ModalRecord";

//* ==> Model <== *//
//import { Managers } from "./Models/managers.model";

const App = () => {
  //* ==> State <== *//
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("add");
  const [selectedRecord, setSelectedRecord] = useState({
    id: 0,
    nombre: "",
    desarrollador: "",
    lanzamiento: 0,
  });

  const hideModal = () => {
    setShowModal(false); // Hide Modal
    setAction("add");
    setSelectedRecord({
      id: 0,
      nombre: "",
      desarrollador: "",
      lanzamiento: 0,
    });
  };

  /**
   * Function to execute the "Action" service and obtain all the records.
   */
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

  /**
   * Function to execute the "Action" service to save a new record.
   * @param body <Object> Data to save
   */
  const addFecth = async (body: Object, id: Number = 0) => {
    try {
      hideModal(); // Hide Modal
      setLoading(true); // Show Loading
      const result: any = await addRecordAction(body);
      const { ok } = result;
      if (ok) {
        alertSucces("Record successfully saved!");
        await getAll();
      } else criticalError("Error when saving record");
      setLoading(false); // Hide Loading
    } catch (e) {
      console.error("||* ==> Error addRecord <== *||", e);
      criticalError("Error when saving record");
      setLoading(false); // Hide Loading
    }
  };

  /**
   * Function for executing the "Action" service to modify an existing record.
   * @param body <Object> Data to save
   * @param id <Number> Record ID
   */
  const editFecth = async (body: Object, id: Number = 0) => {
    try {
      hideModal(); // Hide Modal
      setLoading(true); // Show Loading
      const result: any = await editRecordAction({ ...body, id: id }, id);
      const { ok } = result;
      if (ok) {
        alertSucces("Successfully modified record!");
        await getAll();
      } else criticalError("Error when modifying record");
      setLoading(false); // Hide Loading
    } catch (e) {
      console.error("||* ==> Error editRecord <== *||", e);
      criticalError("Error when modifying record");
      setLoading(false); // Hide Loading
    }
  };

  /**
   * Function to execute the "Action" service to modify an existing record.
   * @param record <Object> Data to modify
   */
  const deleteFetch = async (record: any) => {
    try {
      setLoading(true); // Show Loading
      const result: any = await deleteRecordAction(record?.id);
      const { ok } = result;
      if (ok) {
        alertSucces("Record successfully removed!");
        await getAll();
      } else criticalError("Error deleting record");
      setLoading(false); // Hide Loading
    } catch (e) {
      console.error("||* ==> Error deleteRecord <== *||", e);
      criticalError("Error deleting record");
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  /**
   * Function executing Save icon
   */
  const addRecord = () => {
    setAction("add");
    setShowModal(true); // Show Modal
  };

  /**
   * Function executing Modify icon
   * @param record
   */
  const changeRecord = async (record: any) => {
    setSelectedRecord(record);
    setAction("edit");
    setShowModal(true); // Show Modal
  };

  /**
   * Function that executes Delete icon
   * @param record Selected record
   */
  const deleteRecord = async (record: any) => {
    confirmAlert("", "", deleteFetch, record);
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
            <PlusCircleTwoTone className="iconAdd" onClick={addRecord} />
          </Tooltip>
        </div>
        <Table
          dataSource={data}
          columns={columns}
          loading={loading}
          rowKey={(record: any) => record?.id}
        />
      </div>

      <ModalRecord
        titule={action}
        showModal={showModal}
        loading={loading}
        onClickOk={action === "add" ? addFecth : editFecth}
        selectedRecord={selectedRecord}
        onCancel={() => hideModal()}
      />
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
