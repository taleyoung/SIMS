const HOST = "http://127.0.0.1:8080";

async function myApi(url: string, method: string = "get", data?: {}) {
  const res = await fetch(`${HOST}${url}`);
  return await res.json();
}

export default myApi;
