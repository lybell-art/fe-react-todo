export default function fetchData(url, options) {
  const absoluteHost = "http://localhost:3000";
  let state = "pending";
  let data = null;
  let reason = null;
  const promise = fetch(absoluteHost + url, options)
    .then((e) => e.json())
    .then((res) => {
      state = "complete";
      data = res;
    })
    .catch((err) => {
      state = "error";
      reason = err;
    });
  return function () {
    if (state === "complete") return data;
    if (state === "error") throw reason;
    throw promise;
  };
}
