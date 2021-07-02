import { useState } from "react";

import { Modal, Input, InputNumber } from "antd";
import { UserOutlined, PicCenterOutlined } from "@ant-design/icons";
import styled from "styled-components";

const ModalRecord = ({
  loading = false,
  showModal = false,
  titule = "",
  onClickOk = Function,
  onCancel = Function,
}) => {
  //* ==> State <== *//
  const [name, setName] = useState("");
  const [developer, setDeveloper] = useState("");
  const [year, setYear] = useState(Number);

  return (
    <Modal
      title={titule === "add" ? "Save new record" : "Edit existing record"}
      visible={showModal}
      onOk={() => onClickOk()}
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
      </Wrapper>
    </Modal>
  );
};

const Wrapper = styled.div`
  .inputText {
    margin-top: 20px;
  }
`;

export default ModalRecord;
