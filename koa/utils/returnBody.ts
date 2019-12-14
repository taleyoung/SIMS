export default function returnBody(
  ctx,
  status: number,
  data: any = {},
  err: string = ""
) {
  console.log("data", data);
  ctx.set("Content-Type", "application/json");
  ctx.body = {
    data,
    code: status,
    err
  };
  ctx.status = 200;
}
