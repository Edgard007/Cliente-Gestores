import { criticalError } from "../../Helpers/helpers";
import { requestApi } from "../../Config/useDataApi";
import { getAll as getAllPath } from "../../Config/path";

const getAll = async () => {
  try {
    const result: any = await requestApi(getAllPath, "GET", {}, {});
    return result;
  } catch (e: any) {
    console.error("||* ==> Error loginWithEmailAndPass <== *||", e);
    criticalError("Error al iniciar sesión");
  }
};

export { getAll };
