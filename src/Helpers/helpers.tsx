import { notification } from "antd";

const criticalError = (msm: string = "") => {
  const content: string = msm
    ? msm
    : `Ha surgido un error, estamos trabajando para solucionarlo. 
    Por favor intentelo de nuevo más tarde.`;
  notification.error({
    message: "Error",
    description: content,
    duration: 10,
    top: 40,
  });
};

export { criticalError };
