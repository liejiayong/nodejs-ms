module.exports = function (app) {
    app.use(
        require("koa-router")()
            .get("/", async (ctx) => {
                ctx.body = {
                    code: 0,
                    message: "访问成功",
                    data: "Hello World",
                };
            })
            .routes()
    );
    // 登录注册认证检查
    app.use(require("./auth").routes());
    // // 用户中心
    app.use(require("./user").routes());

    // 非法入口
    // app.use(
    //     require("koa-router")()
    //         .all("*", async (ctx) => {
    //             ctx.body = {
    //                 code: 1,
    //                 message: "非法操作",
    //                 data: "Closed",
    //             };
    //         })
    //         .routes()
    // );

    app.use(require("./upload").routes());
};
