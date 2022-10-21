export const getCurrentDate = () => {
	let myDate = new Date()
	let year = myDate.getFullYear()
	let month = myDate.getMonth() + 1
	let day = myDate.getDate()
	let currentdate = year + '-' + (month > 9 ? month : '0' + month) + '-' + (day > 9 ? day : '0' + day)
	return currentdate
}