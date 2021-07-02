const defaultHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

const requestApi = (
  path: string = "",
  method: string = "GET",
  body: Object = {},
  headers: {}
) => {
  return new Promise((resolve, reject) => {
    fetch(path, {
      method: method,
      headers: { ...defaultHeaders, ...headers },
      body: Object.keys(body).length ? JSON.stringify({ ...body }) : null,
    })
      .then((response) => {
        const status = response.status;
        const okResult: boolean =
          status === 200 || status === 201 || status === 204 || false;

        response
          .json()
          .then((json) => {
            resolve({ ok: okResult, data: json, status: status });
          })
          .catch(() => {
            resolve({ ok: okResult, data: [], status: status });
          });
      })
      .catch((e) => {
        console.error("||* ==> Error requestApi <== *||", e);
        resolve({ ok: false, data: {} });
      });
  });
};

export { requestApi };
