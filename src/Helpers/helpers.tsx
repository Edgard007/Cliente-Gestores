import { notification, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const criticalError = (msm: string = "") => {
  const content: string = msm
    ? msm
    : `An error has arisen, we are working to fix it. 
    Please try again later.`;
  notification.error({
    message: "Error",
    description: content,
    duration: 10,
    top: 40,
  });
};

const confirmAlert = (
  titule: string,
  description: string,
  clickOk: Function,
  recordSelected: any
) => {
  confirm({
    title: titule ? titule : "Do you Want to delete these items?",
    icon: <ExclamationCircleOutlined />,
    content: description ? description : "This record cannot be retrieved",
    async onOk() {
      clickOk(recordSelected);
    },
    onCancel() {},
  });
};

const alertSucces = (msj: string) => {
  Modal.success({
    content: msj,
  });
};

export { criticalError, confirmAlert, alertSucces };
