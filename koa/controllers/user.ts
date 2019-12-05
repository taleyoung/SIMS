import Koa from "koa";
import returnBody from "../utils/returnBody";
import UserService from "../services/user";

export default class UserController {
  static async login(ctx: Koa.DefaultContext) {
    try {
      const { id, password } = ctx.request.body;
      const res = await UserService.isLogin(id, password);
      if (res.id) {
        returnBody(ctx, 200, res);
      } else {
        returnBody(ctx, 400, {}, "密码错误");
      }
    } catch (error) {
      console.log("error :", error);
    }
  }
}
