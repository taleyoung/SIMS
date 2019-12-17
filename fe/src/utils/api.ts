const HOST = 'http://127.0.0.1:8080';

async function myApi(url: string, method: string = 'GET', data?: any) {
  let body = method === 'GET' ? null : JSON.stringify(data)
  const res = await fetch(
      `${HOST}${url}`,
      {method, headers: {'Content-Type': 'application/json'}, body},
  );
  return await res.json();
}

export default myApi;
