import { useEffect, useState } from "react";

import { Modal, Input, InputNumber } from "antd";
import { UserOutlined, PicCenterOutlined } from "@ant-design/icons";
import styled from "styled-components";

//* ==> Interfaces <== *//
import { IManagers } from "../Models/managers.model";

const ModalRecord = ({
  loading = false,
  showModal = false,
  titule = "",
  selectedRecord = { id: 0, nombre: "", desarrollador: "", lanzamiento: 0 },
  onClickOk = (record: IManagers, id: Number = 0) => {},
  onCancel = () => {},
}) => {
  //* ==> State <== *//
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [year, setYear] = useState(0);

  const [error, setError] = useState(false);

  const initialState = () => {
    setId(0);
    setName("");
    setDeveloper("");
    setYear(0);
    setError(false);
  };

  useEffect(() => {
    initialState();
  }, [showModal]);

  useEffect(() => {
    setId(selectedRecord?.id || 0);
    setName(selectedRecord?.nombre || "");
    setDeveloper(selectedRecord?.desarrollador || "");
    setYear(selectedRecord?.lanzamiento || 0);
  }, [selectedRecord, showModal]);

  /**
   * Validate if you have completed the form
   */
  const validForm = () => {
    if (name && developer && year) {
      setError(false);
      onClickOk(
        {
          nombre: name,
          lanzamiento: year,
          desarrollador: developer,
        },
        id
      );
    } else setError(true);
  };

  return (
    <Modal
      title={titule === "add" ? "Save new record" : "Edit existing record"}
      visible={showModal}
      onOk={validForm}
      confirmLoading={loading}
      onCancel={() => onCancel()}
    >
      <Wrapper>
        <div>
          <label>Manager Name</label>
          <Input
            placeholder="Enter name"
            prefix={<PicCenterOutlined />}
            onChange={(e) => setName(e?.target?.value)}
            value={name}
          />
        </div>
        <div className="inputText">
          <label>Developer Name</label>
          <Input
            placeholder="Enter developer name"
            prefix={<UserOutlined />}
            onChange={(e) => setDeveloper(e?.target?.value)}
            value={developer}
          />
        </div>
        <div className="inputText">
          <label>Year of release</label>
          <InputNumber
            placeholder="Enter year of release"
            style={{ width: "100%" }}
            min={1}
            onChange={(value) => setYear(value)}
            value={year}
          />
        </div>
        {error && (
          <div className="inputText labelError">
            Fill out the following form
          </div>
        )}
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  .inputText {
    margin-top: 20px;
  }

  .labelError {
    text-align: center;
    color: red;
  }
`;

export default ModalRecord;
