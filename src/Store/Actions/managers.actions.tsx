import { criticalError } from "../../Helpers/helpers";
import { requestApi } from "../../Config/useDataApi";
import { getAll as getAllPath, recordById } from "../../Config/path";

/**
 * Get all records
 * @returns
 */
const getAll = async () => {
  try {
    const result: any = await requestApi(getAllPath, "GET", {}, {});
    return result;
  } catch (e: any) {
    console.error("||* ==> Error getAll-Action <== *||", e);
    criticalError("Error getting managers");
  }
};

/**
 * Save new record
 * @param body <Object> Data to save
 * @returns
 */
const addRecord = async (body: Object) => {
  try {
    const result: any = await requestApi(getAllPath, "POST", body, {});
    return result;
  } catch (e: any) {
    console.error("||* ==> Error addRecord-Action <== *||", e);
    criticalError("Error when saving record");
  }
};

/**
 * Edit existing record
 * @param body <Object> Data to modify
 * @param idRecord <Number> Resgit ID
 * @returns
 */
const editRecord = async (body: Object, idRecord: Number) => {
  try {
    const result: any = await requestApi(recordById(idRecord), "PUT", body, {});
    return result;
  } catch (e: any) {
    console.error("||* ==> Error editRecord-Action <== *||", e);
    criticalError("Error when modifying record");
  }
};

/**
 * Remove existing record
 * @param idRecord <Number> Resgit ID
 * @returns
 */
const deleteRecord = async (idRecord: Number) => {
  try {
    const result: any = await requestApi(
      recordById(idRecord),
      "DELETE",
      {},
      {}
    );
    return result;
  } catch (e: any) {
    console.error("||* ==> Error deleteRecord-Action <== *||", e);
    criticalError("Error deleting record");
  }
};

export { getAll, addRecord, editRecord, deleteRecord };
