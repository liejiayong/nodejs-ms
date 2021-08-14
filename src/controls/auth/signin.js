const app = require('koa');
const { loginUser } = require('../../models/user');

exports.postSignin = async (ctx) => {
	try {
		let { name, password } = ctx.request.body;

		if (!name && !password) {
			ctx.body = {
				code: 20003,
				message: '账号密码不能为空',
			};
			return;
		}

		await loginUser([name, password]).then((res) => {
			if (res.length) {
				ctx.session.id = res[0].id;
				ctx.body = {
					code: 0,
					message: '登录成功',
					data: res[0],
				};
				console.log('登录成功');
			} else {
				ctx.body = {
					code: 20001,
					msg: '用户名或密码错误',
				};
				console.log('用户名或密码错误!');
			}
		});
	} catch (error) {
		ctx.body = {
			code: 500,
			message: '查询出错啦~',
		};
	}
};
