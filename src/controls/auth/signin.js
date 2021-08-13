const app = require('koa');
const { loginUser } = require('../../models/user');
const { authentication } = require('../../middlewares/authentication');

exports.postSignin = async (ctx) => {
	// const auth = await authentication(ctx); // 权鉴
	// console.log('aaaa', auth)
	try {
		let { name, password } = ctx.request.body;

		if (!name && !password) {
			ctx.body = {
				code: 20003,
				message: '账号密码不能为空',
			};
			return;
		}

		// console.log('signin', name, password);
		await loginUser([name, password]).then((res) => {
			if (res.length) {
				ctx.session.id = res[0].id;
				let sidObj = ctx.sessionStore.get('USER_SID:iqqiBIl0zcrZ9H_NL57W7xCZm8F4XyHW');
				console.log(sidObj.next().value);
				ctx.body = {
					code: 0,
					message: '登录成功',
					data: res[0],
					// token: JSON.parse(ctx.sessionStore.get('USER_SID:TSMx5pIC4tVw-MVOijvv9VMsIZQeyP54').next()),
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
