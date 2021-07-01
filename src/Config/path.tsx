const BASE_URL: string = process.env.REACT_APP_BASE_URL as string;
const getAll: string = `${BASE_URL}/api/gestores`;
const recordById: Function = (id: number) => `${BASE_URL}/api/gestores/${id}`;

export { getAll, recordById };
