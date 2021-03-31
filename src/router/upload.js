const router = require("koa-router")(); /*引入是实例化路由** 推荐*/
const fs = require("fs");

// 文件上传
router.post("/upload", async (ctx) => {
    const file = ctx.request.body.files.file; // 获取上传文件
    const reader = fs.createReadStream(file.path); // 创建可读流
    const ext = file.name.split(".").pop(); // 获取上传文件扩展名
    const upStream = fs.createWriteStream(
        `upload/${Math.random().toString()}.${ext}`
    ); // 创建可写流
    reader.pipe(upStream); // 可读流通过管道写入可写流
    return (ctx.body = "上传成功");
});
router.get("/upload", async (ctx) => {
    ctx.body = ctx;
});

module.exports = router;
