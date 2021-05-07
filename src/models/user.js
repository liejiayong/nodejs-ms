const { query } = require("../lib/mysql");

// 通过名字查找用户
exports.findDataByName = (name) => {
    let _sql = `select * from jy_blog_users where name="${name}";`;
    return query(_sql);
};

// 通过用户id查找用户
exports.findDataByUId = (id) => {
    let _sql = `select * from jy_blog_users where id="${id}";`;
    return query(_sql);
};

// 注册用户
exports.registerUser = (value) => {
    let _sql = "insert into jy_blog_users set username=?,password=?;";
    return query(_sql, value);
};

// test-添加实名认证
exports.certiUser = (value) => {
    let _sql = "insert into certification set type=?,username=?;";
    console.log(_sql, value);
    return query(_sql, value);
};
