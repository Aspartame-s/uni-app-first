const {
	request
} = require('../http/request')

//爱好列表
export const getHobbyList = () => {
	return request(`/wxmini/hobby`, 'GET')
}

//批量保存微信用户爱好
export const saveWxUserHobby = (data) => {
	return request(`/wxmini/wxuser-hobby/batch`, 'POST', data)
}