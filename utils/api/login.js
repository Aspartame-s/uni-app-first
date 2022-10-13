const {
	request
} = require('../http/request')

module.exports = {
	// 登录
	userLogin(url, data) {
		return request(url, 'POST', data);
	},
}
