import Router from "koa-router";
const router = new Router({ prefix: "/api" });
import ArticleController from "../controllers/article";
import UserController from "../controllers/user";

//登录模块
const user = "/user";
router.post(`${user}/login`, UserController.login);

//文章模块
const article = "/article";
router.get("/article/:id?", ArticleController.show);
router.post(`${article}/`, ArticleController.add);
router.delete(`${article}/:id`, ArticleController.delete);
router.put(`${article}/:id`, ArticleController.update);

// router.use(router.routes()).use(router.allowedMethods());

export default router;
