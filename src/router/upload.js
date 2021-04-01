const router = require("koa-router")(); /*引入是实例化路由** 推荐*/
const fs = require("fs");
const path = require("path");
const config = require("../config/default");
const cachePath = path.join(__dirname, "../", config.path.upload);
const pathExist = fs.existsSync(cachePath);
if (!pathExist) {
    fs.mkdir(cachePath, function (err) {
        if (err) {
            return;
        }
    });
}
// 文件上传
router.post("/upload", async (ctx) => {
    console.log(ctx.request.body);
    const { file } = ctx.request.files; // 官方为了安全，在koa-body新版本中采用ctx.request.files获取上传的文件
    const reader = fs.createReadStream(file.path); // 创建可读流
    const ext = file.name.split(".").pop(); // 获取上传文件扩展名
    const upStream = fs.createWriteStream(
        `${cachePath}/${Math.random().toString()}.${ext}`
    ); // 创建可写流
    reader.pipe(upStream); // 可读流通过管道写入可写流
    ctx.body = "上传成功";
});
router.get("/upload", async (ctx) => {
    ctx.body = ctx;
});

module.exports = router;
