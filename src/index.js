const http = require("http");
const path = require("path");
const Koa = require("koa");
const koaBody = require("koa-body");
const bodyParser = require("koa-bodyparser");
// const koaStatic = require('koa-static')
const cors = require("@koa/cors");
const staticCache = require("koa-static-cache");
const session = require("koa-session-minimal");
const MysqlStore = require("koa-mysql-session");
const router = require("./router");
const { HTTP_SERVER_PORT, database } = require("./config/default");
const { sidPrefix } = require("./models/session");
const staticPath = "/cachefile";

const app = new Koa();

// 配置静态资源加载
// app.use(koaStatic(path.join(__dirname, staticPath)))
app.use(
    staticCache(
        path.join(__dirname, staticPath),
        { dynamic: true },
        { maxAge: 365 * 24 * 60 * 60 }
    )
);

// 配置服务器路由请求
app.use(bodyParser({ formLimit: "1mb" }));

app.use(
    koaBody({
        multipart: true,
        formidable: {
            maxFileSize: 200 * 1024 * 1024, // 设置上传文件大小最大限制，默认2M
        },
    })
);

// session
app.use(
    session({
        key: sidPrefix,
        store: new MysqlStore({
            user: database.USERNAME,
            password: database.PASSWORD,
            database: database.DATABASE,
            host: database.HOST,
        }),
    })
);
app.use(cors());
app.use(async (ctx, next) => {
    ctx.response.set(
        "Access-Control-Allow-Origin",
        "http://192.168.10.8:5505/"
    );
    ctx.response.set("Access-Control-Allow-Headers", "age"); //自定义的头部信息
    ctx.response.set("Access-Control-Allow-Methods", "POST");
    ctx.response.set("Access-Control-Allow-Credentials", true);
    ctx.response.set("Access-Control-Allow-Max-Age", 6);
    ctx.response.set("Access-Control-Expose-Headers", "name");
    // 以上这些响应头都需设置
    ctx.body = "I am a OPTION method request"; //为option请求报文设置响应
    await next();
});

// 路由
router(app);

// 创建服务
const server = http.createServer(app.callback());

// socket.io
require("./lib/socketIO")(server);

// 监听端口
server.listen(HTTP_SERVER_PORT);
console.log(`http server listening on port ${HTTP_SERVER_PORT}`);
