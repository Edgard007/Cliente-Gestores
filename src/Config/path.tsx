const BASE_URL: string = process.env.REACT_APP_BASE_URL as string;
const getAll: string = `${BASE_URL}/api/gestores`;

export { getAll };
