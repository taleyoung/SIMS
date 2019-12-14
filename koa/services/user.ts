import * as UserModel from "../models/user";

const isLogin = async (id: string, password: string) => {
  try {
    const res = await UserModel.getUser(id);
    console.log("数据库返回的res :", res);
    console.log("res[0] :", res[0]);
    const info = res[0];
    if (info.password === password) {
      return { id: res[0].id, name: res[0].name };
    } else {
      return {};
    }
  } catch (error) {
    console.log("error :", error);
  }
};

export default { isLogin };
