const http = require('http');
const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const koaStatic = require('koa-static');
const staticCache = require('koa-static-cache');
const session = require('koa-session-minimal');

const chalk = require('chalk');
const router = require('./router');
const { getIPAdress } = require('./utils/url');
const { HTTP_SERVER_PORT, path: configPath } = require('./config/default');
const { sidPrefix, myqlSessionStore } = require('./models/session');

const app = new Koa();

app.use(cors());

// 配置静态资源加载
// app.use(koaStatic(path.join(__dirname, staticPath)));
app.use(koaStatic(`${configPath.public}`));
// app.use(
//     staticCache(
//         path.join(__dirname, staticImg),
//         { dynamic: true },
//         { maxAge: 365 * 24 * 60 * 60 }
//     )
// );

// 配置服务器路由请求
app.use(bodyParser({ formLimit: '1mb' }));

/* session */
app.use(
	session({
		key: sidPrefix,
		store: myqlSessionStore,
	})
);
app.context.sessionStore = myqlSessionStore;

/* router */
router(app);

// 创建服务
const server = http.createServer(app.callback());

// socket.io
// require("./lib/socketIO")(server);
// websocket
require('./websocket/websocket');

// 监听端口
server.listen(HTTP_SERVER_PORT);
console.log(`http server listening on port ${chalk.underline.green('%s:%s')}`, getIPAdress(), HTTP_SERVER_PORT);
