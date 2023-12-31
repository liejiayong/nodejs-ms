const config = {
    // 启动端口
    HTTP_SERVER_PORT: 3888,
    HTTPS_SERVER_PORT: 3889,

    // 数据库配置
    database: {
        DATABASE: "koa_blog",
        USERNAME: "root",
        PASSWORD: "123456",
        PORT: "3306",
        HOST: "localhost",
    },

    // file path
    path: {
        upload: "upload",
        public: "public",
        staticImg: "staticImg",
    },
};

module.exports = config;
