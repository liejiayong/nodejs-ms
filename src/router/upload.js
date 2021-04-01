const router = require("koa-router")(); /*引入是实例化路由** 推荐*/
const fs = require("fs");
const path = require("path");
const md5 = require("md5");
const moment = require("moment");
const config = require("../config/default");
const { getLocation } = require("../utils/url");
const cachePath = path.join(
    __dirname,
    "../../",
    `${config.path.public}/${config.path.upload}`
);
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
    const ext = file.name.split("."); // 获取上传文件扩展名
    const filename = `${md5(`${ext[0] + moment.valueOf()}`)}.${ext[1]}`;
    const upStream = fs.createWriteStream(`${cachePath}/${filename}`); // 创建可写流
    reader.pipe(upStream); // 可读流通过管道写入可写流
    const location = getLocation();
    ctx.body = {
        code: 0,
        msg: "上传成功",
        data: {
            url: `//${location.host}/${config.path.upload}/${filename}`,
        },
    };
});
router.get("/upload", async (ctx) => {
    ctx.body = ctx;
});

module.exports = router;
