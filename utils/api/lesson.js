const {
	request
} = require('../http/request')

//课程分页列表
export const getLessonList = (data = '') => {
	return request(`/wxmini/lesson/page?startDate=${data}`, 'GET')
}

//banner
export const getBannerList = () => {
	return request(`/wxmini/banner`, 'GET')
}

//正在直播的课时分页列表
export const getLivingList = () => {
	return request(`/wxmini/lesson/page/live`, 'GET')
}

//直播回放课时分页列表
export const getLivingBackList = () => {
	return request(`/wxmini/lesson/page/history`, 'GET')
}
