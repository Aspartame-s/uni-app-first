const {
	request
} = require('../http/request')

//课时分页列表
export const getLessonList = (data = '', courseId = '') => {
	return request(`/wxmini/lesson/page?startDate=${data}&courseId=${courseId}`, 'GET')
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
export const getLivingBackList = (page = '', size = '') => {
	return request(`/wxmini/lesson/page/history?current=${page}&size=${size}`, 'GET')
}

//课程类别列表
export const getCourseCategoryList = () => {
	return request(`/wxmini/course-category`, 'GET')
}

//课程分页列表(根据课程类别id获取课程)
export const getCourseListWithCategoryId = (id = '') => {
	return request(`/wxmini/course/page?courseCategoryId=${id}`, 'GET')
}

//根据id查看课程详情(获取课程详情页的上半部分以及老师id)
export const getCourseDetailWithCourseId = (id = '') => {
	return request(`/wxmini/course/${id}`, 'GET')
}

//根据id查看老师详情
export const getTeacherDetailWithId = (id = '') => {
	return request(`/wxmini/teacher/${id}`, 'GET')
}