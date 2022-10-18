const {
	request
} = require('../http/request')

//课程分页列表
export const getLessonList = (data = '') => {
	return request(`/wxmini/lesson/page?startDate=${data}`, 'GET')
}

//banner
export const getBannerList = (route) => {
	return request(`/wxmini/banner?bannerRoute=${route}`, 'GET')
}

//正在直播的课时分页列表
export const getLivingList = () => {
	return request(`/wxmini/lesson/page/live`, 'GET')
}

//直播回放课时分页列表
export const getLivingBackList = () => {
	return request(`/wxmini/lesson/page/history`, 'GET')
}

//课程类别列表
export const getCourseCategoryList = () => {
	return request(`/wxmini/course-category`, 'GET')
}

//课程分页列表(根据课程类别id获取课程)
export const getCourseListWithCategoryId = (id = '') => {
	return request(`/wxmini/course/page?courseCategoryId=${id}`, 'GET')
}