<template>
	<view class="calendar">
		<view class="top-bar">
			<view class="top-change-month" @click="turning('prev')">
				<i class="iconfont icon-xiangzuo1"></i>
			</view>
			<!-- <image class="top-change-month" @click="turning('prev')" src="/static/attend-calendar/class_attendance_left.png"></image> -->
			<view class="top-bar-ym">{{ y }}{{ text.year }}{{ m + 1 }}{{ text.month }}</view>
			<!-- <image class="top-change-month" @click="turning('next')" src="/static/attend-calendar/class_attendance_right.png"></image> -->
			<view class="top-change-month" @click="turning('next')">
				<i class="iconfont icon-xiangyou1"></i>
			</view>
		</view>

		<view class="week">
			<view class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</view>
		</view>

		<view :class="{ hide: !monthOpen }" class="content" >
			<view :style="{ top: positionTop + 'upx' }" class="days">
				<view class="item" v-for="(item, index) in dates" :key="index">
					<view class="day" @click="selectOne(item, $event)"
						:class="{ choose: choose == `${item.year}-${(item.month + 1) > 9 ? (item.month + 1) : '0' + (item.month + 1)}-${item.date > 9 ? item.date : '0' + item.date}`, nolm: !item.lm, hasrecord: dateArr.indexOf(`${item.year}-${(item.month + 1) > 9 ? (item.month + 1) : '0' + (item.month + 1)}-${item.date > 9 ? item.date : '0' + item.date}`) > -1 }">
						{{ item.date }}</view>
					<view class="late" v-if="isLateed(item.year, item.month + 1, item.date)"></view>
					<view class="truancy" v-if="isTruancyed(item.year, item.month + 1, item.date)"></view>
					<view class="today-text" v-if="isToday(item.year, item.month, item.date)">今</view>
				</view>
			</view>
		</view>

	<!-- 	<image src="/static/attend-calendar/ico-arrow-up.png" mode="scaleToFill" @click="trgWeek()" class="weektoggel"
			:class="{ down: !monthOpen }"></image> -->
	</view>
</template>

<script>
	import { getLessonList } from '../../utils/api/lesson.js';
	export default {
		name: 'attend-calendar',
		props: {
			// 第一列星期几
			weekstart: {
				type: Number,
				default: 1
			},
			// 只有迟到的日期
			lateddates: {
				type: Array,
				default: () => []
			},
			// 有旷课的日期
			truancyeddates: {
				type: Array,
				default: () => []
			},
			// 是否展开
			open: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				arr: ['aaa', 'bbb', 'ccc'],
				text: {
					year: '年',
					month: '月',
					week: ['一', '二', '三', '四', '五', '六', '日'],
					today: '今'
				},
				y: new Date().getFullYear(), // 年
				m: new Date().getMonth(), // 月
				dates: [], // 当前月日期集合
				positionTop: 0,
				monthOpen: true,
				choose: '',
				dateArr: []
			}
		},
		created() {
		this.dates = this.monthDay(this.y, this.m)
		!this.open && this.trgWeek()
		},
		mounted() {
			let date = new Date()
			let y = date.getFullYear()
			let m = date.getMonth()
			let d = date.getDate()
			this.choose = `${y}-${(m + 1) > 9 ? (m + 1) : '0' + (m + 1)}-${d > 9 ? d : '0' + d}`
			const currentDate = `${y}-${(m + 1) > 9 ? (m + 1) : '0' + (m + 1)}`
			this.getLessonList(currentDate)
		},
		computed: {
			// 顶部星期栏目
			weekDay() {
				return this.text.week.slice(this.weekstart - 1).concat(this.text.week.slice(0, this.weekstart - 1))
			},
			height() {
				return (this.dates.length / 7) * 80 + 'upx'
			}
		},
		methods: {
			//获取当前月份有视频的数据 传年月
			getLessonList(date) {
				getLessonList(date).then(res => {
					if(res.data.length !== 0) {
						res.data.forEach(item => {
							this.dateArr.push(item.startDate)
						})
					}
				})
			},
			// 获取当前月份天数
			monthDay(y, m) {
				let firstDayOfMonth = new Date(y, m, 1).getDay() // 当月第一天星期几
				let lastDateOfMonth = new Date(y, m + 1, 0).getDate() // 当月最后一天
				let lastDayOfLastMonth = new Date(y, m, 0).getDate() // 上一月的最后一天
				let dates = [] // 所有渲染日历
				let weekstart = this.weekstart == 7 ? 0 : this.weekstart // 方便进行日期计算，默认星期从0开始
				let startDay = (() => {
					// 周初有几天是上个月的
					if (firstDayOfMonth == weekstart) {
						return 0
					} else if (firstDayOfMonth > weekstart) {
						return firstDayOfMonth - weekstart
					} else {
						return 7 - weekstart + firstDayOfMonth
					}
				})()
				let endDay = 7 - ((startDay + lastDateOfMonth) % 7) // 结束还有几天是下个月的
				for (let i = 1; i <= startDay; i++) {
					dates.push({
						date: lastDayOfLastMonth - startDay + i,
						day: weekstart + i - 1 || 7,
						month: m - 1 >= 0 ? m - 1 : 12,
						year: m - 1 >= 0 ? y : y - 1
					})
				}
				for (let j = 1; j <= lastDateOfMonth; j++) {
					dates.push({
						date: j,
						day: (j % 7) + firstDayOfMonth - 1 || 7,
						month: m,
						year: y,
						lm: true
					})
				}
				for (let k = 1; k <= endDay; k++) {
					dates.push({
						date: k,
						day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
						month: m + 1 <= 11 ? m + 1 : 0,
						year: m + 1 <= 11 ? y : y + 1
					})
				}
				return dates
			},
			// 迟到处理
			isLateed(y, m, d) {
				let flag = false
				for (let i = 0; i < this.lateddates.length; i++) {
					let dy = `${y}-${m}-${d}`
					if (this.lateddates[i] == dy) {
						flag = true
						break
					}
				}
				return flag
			},
			// 旷课处理
			isTruancyed(y, m, d) {
				let flag = false
				for (let i = 0; i < this.truancyeddates.length; i++) {
					let dy = `${y}-${m}-${d}`
					if (this.truancyeddates[i] == dy) {
						flag = true
						break
					}
				}
				return flag
			},
			isToday(y, m, d) {
				let date = new Date()
				return y == date.getFullYear() && m == date.getMonth() && d == date.getDate()
			},
			// 切换成周模式
			trgWeek() {
				this.monthOpen = !this.monthOpen
				if (this.monthOpen) {
					this.positionTop = 0
				} else {
					let index = -1
					this.dates.forEach((i, x) => {
						this.isToday(i.year, i.month, i.date) && (index = x)
					})
					this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 80
				}
			},
			// 点击回调
			selectOne(i, event) {
				let date = `${i.year}-${(i.month + 1) > 9 ? (i.month + 1) : '0' + (i.month + 1)}-${(i.date) > 9 ? (i.date) : '0' + (i.date)}`
				if (i.month != this.m) {
					console.log('不在可选范围内')
					return false
				}
				this.choose = date
				this.$emit('on-click', date)
			},
			// 上个月，下个月
			async turning(_action) {
				if (_action === 'next') {
					if (this.m + 1 == 12) {
						this.m = 0
						this.y = this.y + 1
					} else {
						this.m = this.m + 1
					}
				} else {
					if (this.m + 1 == 1) {
						this.m = 11
						this.y = this.y - 1
					} else {
						this.m = this.m - 1
					}
				}
				let currentDate = `${this.y}-${(this.m + 1) > 9 ? (this.m + 1) : '0' + (this.m + 1)}`
				// let currentMonthList = []
				// await getLessonList(currentDate).then(res => {
				// 	currentMonthList = res.data
				// })
				// console.log(currentMonthList)
				this.getLessonList(currentDate)
				this.dates = this.monthDay(this.y, this.m)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.calendar {
		box-sizing: border-box;
		width: 100%;
		height: auto;
		border-radius: 16rpx;
		color: #666;
		font-size: 28upx;
		text-align: center;
		background-color: #fff;
		padding-bottom: 10upx;
		overflow: hidden;
		padding: 0 30upx;
		.top-bar {
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: 100upx;
			padding: 0 100upx;
			>view {
				flex: auto;
			}
			.top-bar-ym{
				font-size: 40upx;
				font-weight: 400;
				height: 80upx;
				line-height: 80upx;
			}
			.top-change-month{
				height: 80upx;
				width: 40upx;
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}

		.week {
			display: flex;
			align-items: center;
			height: 60upx;
			line-height: 60upx;
			view {
				flex: 1;
			}
			.week-day{
				font-size: 32upx;
				font-weight: 400;
				color: #333;
			}
		}

		.content {
			position: relative;
			overflow: hidden;
			height: 390upx;
			transition: height 0.4s ease;
			// padding-bottom: 40upx;
			.days {
				transition: top 0.3s;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				position: relative;

				.item {
					position: relative;
					display: block;
					// height: 80upx;
					// line-height: 80upx;
					width: calc(100% / 7);
					.day {
						font-style: normal;
						display: inline-block;
						vertical-align: middle;
						width: 60upx;
						height: 60upx;
						line-height: 60upx;
						overflow: hidden;
						border-radius: 14upx;

						&.choose {
							background-color: #F39A2D;
							color: #FFFFFF;
						}

						&.nolm {
							color: #fff;
							opacity: 0.3;
							display: none;
						}
						
						&.hasrecord {
							background-image: url('../../static/img/hasDataIcon.png');
							background-size: 100%;
						}
					}

					.late {
						bottom: 0;
						left: 50%;
						font-style: normal;
						width: 12upx;
						height: 12upx;
						background: #F7B300;
						border-radius: 6upx;
						position: absolute;
						margin-left: -6upx;
						pointer-events: none;
					}
					.truancy {
						bottom: 0;
						left: 50%;
						font-style: normal;
						width: 12upx;
						height: 12upx;
						background: #FF2222;
						border-radius: 6upx;
						position: absolute;
						margin-left: -6upx;
						pointer-events: none;
					}

					.today-text {
						position: absolute;
						font-size: 20upx;
						font-weight: normal;
						width: 20upx;
						height: 20upx;
						line-height: 20upx;
						right: 5upx;
						top: 10upx;
						color: #333;
					}
				}
			}
		}

		.hide {
			height: 80upx !important;
		}

		.weektoggel {
			width: 80upx;
			height: 40upx;
			margin: 10upx auto 0;

			&.down {
				transform: rotate(180deg);
			}
		}
	}
</style>
