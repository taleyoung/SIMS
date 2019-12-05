import Router from "koa-router";
const router = new Router({ prefix: "/api/v1" });
import articleRouter from "./article";

router.use(articleRouter.routes()).use(articleRouter.allowedMethods());

export default router;
