const {
	request
} = require('../http/request')

//微信用户观看记录分页列表(我的 历史记录)
export const getHistoryList = (id) => {
	return request(`/wxmini/wxuser-watch/page/${id}`, 'GET')
}

//更新用户
export const refreshUser = (data) => {
	return request(`/wxmini/wxuser/refresh`, 'POST', data)
}

//微信用户观看次数
export const userWatchCount = (id) => {
	return request(`/wxmini/wxuser-watch/counts/${id}`, 'GET')
}

//微信用户收藏的课程数量
export const userCollectCount = (id) => {
	return request(`/wxmini/wxuser-collect/counts/${id}`, 'GET')
}

//更新手机号
export const refreshUserPhone = (data) => {
	return request(`/wxmini/wxuser/refresh/phone`, 'POST', data)
}

//新增微信用户观看次数
export const addUserWatch = (data) => {
	return request(`/wxmini/wxuser-watch`, 'POST', data)
}