<template>
	<view class="container">
		<view class="placeholder" :style="{'height': (iStatusBarHeight * 2) + 'rpx'}"></view>
		<view class="course-filter-container">
			<image :src="courseDetail.courseCover" mode=""
				class="filter-bg"></image>
			<image src="../../static/img/fanhui-big@2x.png" mode="" class="back" @click="back"></image>
			<view class="video-container">
				<image :src="courseDetail.courseCover" mode="" class="course-cover-img"></image>
				<video :src="courseDetail.coursePromotionVideo" class="video" :show-center-play-btn="false" id="myVideo"
					@fullscreenchange="screenchange"></video>
				<image :src="imgbaseUrl + '/course/bofang.png'" class="bofangImg" @click="play"></image>
			</view>
		</view>
		<view class="main-container">
			<view class="title">
				{{courseDetail.courseName}}
			</view>
			<view class="desc">
				{{courseDetail.courseDesc}}
			</view>
			
			<view class="handle-container">
				<view class="view-box">
					<image src="../../static/img/viewCount@2x.png" mode="" class="view-icon"></image>
					20
				</view>
				<view class="handle-box">
					<view class="collect-box" @click="collect">
						收藏
						<i class="iconfont icon-shoucang" :style="{'color': isCollected ? '#edc312' : ''}"></i>
					</view>
					<view class="share-box">
						分享
						<i class="iconfont icon-fenxiang"></i>
						<button class="share-btn" open-type="share"></button>
					</view>
				</view>
			</view>
			<view class="middle-link">
				
			</view>
			<view class="course-teacher-desc-container">
				<view class="tab-container">
					<view class="tab-item" v-for="(item, index) in tabList" :key="index"
						@click="selectTab(item.id, item.path)">
						<view :class="['tabTitle', item.active ? 'active' : '']">
							{{item.name}}
						</view>
						<image :src="item.iconUrl" alt="" class="tabActiveLine" v-show="item.active"></image>
					</view>
				</view>
				<view class="container-body" v-if="tabFlag == 'course'">
					<!-- <default-component v-if="!livingList.length" style="width: 100%;"></default-component> -->
					<col-list v-for="(item, index) in lessonList" :key="index" :lessonInfo="item" :hasMargin="true"
						:hasLeftTopTip="false"></col-list>
				</view>
				<view class="container-body" v-else>
					<image :src="teacherIntroduction" mode="" class="teacher-intruction"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import colList from '../../components/colList/colList.vue';
	import {
		getLessonList,
		getCourseDetailWithCourseId,
		getTeacherDetailWithId
	} from '../../utils/api/lesson.js';
	import {saveUserCollect, cancelUserCollect, userCollectList} from '../../utils/api/wxuser.js'
	import global from '../../common/global.js';
	export default {
		components: {
			colList
		},
		data() {
			return {
				imgbaseUrl: global.imgbaseUrl,
				noTabbarPaddingBottom: global.noTabbarPaddingBottom,
				iStatusBarHeight: null,
				tabList: [{
						id: 1,
						name: "课时介绍",
						iconUrl: "https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/huxian.png",
						active: 1,
						path: "course",
					},
					{
						id: 2,
						name: "老师介绍",
						iconUrl: "https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/huxian.png",
						active: 0,
						path: "teacher",
					},
				],
				active: 1,
				courseId: null,
				lessonList: [],
				courseDetail: {},
				teacherId: '',
				teacherIntroduction: '',
				tabFlag: 'course',
				isCollected: false
			}
		},
		methods: {
			selectTab(id, path) {
				this.tabFlag = path
				// console.log(id)
				// this.active = id
				this.tabList.forEach((item) => {
					if (item.id == id) {
						item.active = 1;
					} else {
						item.active = 0;
					}
				});
			},
			//根据课程id获取课时列表
			getLessonList(date, id) {
				getLessonList(date, id).then(res => {
					// console.log(res)
					this.lessonList = res.data
				})
			},
			//根据id查看课程详情(获取课程详情页的上半部分以及老师id)
			async getCourseDetailWithCourseId(id) {
				await getCourseDetailWithCourseId(id).then(res => {
					this.courseDetail = res.data
					this.teacherId = res.data.teacherId
				})
				this.getTeacherDetailWithId(this.teacherId)
			},
			//根据id查看老师详情
			getTeacherDetailWithId(id) {
				getTeacherDetailWithId(id).then(res => {
					// console.log(res)
					this.teacherIntroduction = res.data.teacherIntroduction
				})
			},
			//video屏幕变化监测
			screenchange(e) {
				let videoplay = uni.createVideoContext('myVideo', this)
				if (e.detail.fullScreen) {
					videoplay.play()
				} else {
					// let data = {
					//   "courseId": this.properties.listdata.courseId,
					//   "lessonId": this.properties.listdata.lessonId,
					//   // "liveId": this.properties.liveId
					// }
					// addUserwatch('userwatch', data).then(res => {
					//   // console.log('添加一次直播', res);
					// })
					videoplay.pause()
				}
			},
			//播放按钮
			play() {
				this.videoContext = uni.createVideoContext('myVideo', this); // 	创建 video 上下文 VideoContext 对象。
				this.videoContext.requestFullScreen({ // 设置全屏时视频的方向，不指定则根据宽高比自动判断。
					direction: 90 // 屏幕逆时针90度
				});
			},
			back() {
				uni.navigateBack()
			},
			//微信用户收藏的课程
			userCollectList(id) {
				userCollectList(id).then(res => {
					if(res.data.indexOf(this.courseId) > -1) {
						this.isCollected = true
					}else {
					}
				})
			},
			//收藏
			collect() {
				var data = {
					courseId: this.courseId,
					wxUserId: uni.getStorageSync('wxUserId')
				}
				if(!this.isCollected) {
					saveUserCollect(data).then(res => {
						console.log(res)
						if(res.code == 0) {
							this.isCollected = true
						}
					})
				}else {
					cancelUserCollect(data).then(res => {
						console.log(res)
						if(res.code == 0) {
							this.isCollected = false
						}
					})
				}
				
			}
		},
		onShareAppMessage(res) {
			console.log(res)
			if(res.from == 'button') {
				return {
					title: '微信小程序测试分享',
					path: `/pages/courseDetail/courseDetail?courseId=${this.courseId}`
				}
			}
		},
		onLoad(option) {
			this.courseId = option.courseId
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.getLessonList('', this.courseId)
			this.getCourseDetailWithCourseId(this.courseId)
			this.userCollectList(uni.getStorageSync('wxUserId'))
		},
	}
</script>

<style lang="scss">
	.container {
		width: 100%;
		height: auto;
		background-color: #fff;
		min-height: 100vh;
		display: flex;
		flex-direction: column;

		.placeholder {
			width: 100%;
			background-color: #F8F8F8;
			// position: fixed;
			// top: 0;
			// z-index: 9999;
		}

		.course-filter-container {
			width: 100%;
			height: 578rpx;
			position: relative;

			.filter-bg {
				width: 100%;
				height: 100%;
				filter: blur(8px);
				z-index: 10;
			}

			.back {
				width: 68rpx;
				height: 68rpx;
				position: absolute;
				left: 28rpx;
				top: 10rpx;
			}

			.video-container {
				width: 694rpx;
				height: 396rpx;
				border-radius: 16rpx;
				position: absolute;
				left: 28rpx;
				bottom: -16rpx;
				z-index: 20;
				overflow: hidden;

				.course-cover-img {
					width: 100%;
					height: 100%;
				}
				.bofangImg {
					width: 108rpx;
					height: 108rpx;
					position: absolute;
					left: 50%;
					top: 50%;
					transform: translate(-50%, -50%);
					z-index: 100;
				}
			}
		}

		.main-container {
			width: 100%;
			// height: auto;
			flex-grow: 1;
			background-color: #fff;
			border-radius: 48rpx 48rpx 0px 0px;
			position: relative;
			top: -140rpx;
			z-index: 15;
			padding: 170rpx 0 0;

			.title {
				width: 100%;
				text-align: center;
				color: #1E1E20;
				font-size: 32rpx;
				font-weight: 500;
				margin-bottom: 12rpx;
			}

			.desc {
				width: 100%;
				height: auto;
				padding: 0 22rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				color: #666;
				font-size: 28rpx;
				margin-bottom: 24rpx;
			}
			.handle-container {
				width: 100%;
				height: 34rpx;
				padding: 0 28rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 24rpx;
				color: #666;
				.view-box {
					height: 34rpx;
					@include center;
					.view-icon {
						width: 22rpx;
						height: 13rpx;
						margin-right: 6rpx;
					}
				}
				.handle-box {
					width: 210rpx;
					height: 34rpx;
					@include between;
					i {
						margin-left: 12rpx;
						font-size: 28rpx;
					}
					.icon-shoucang {
						// color: #edc312;
					}
					.collect-box {
						@include center;
					}
					.share-box {
						@include center;
						position: relative;
						.share-btn {
							position: absolute;
							width: 100%;
							height: 100%;
							opacity: 0;
						}
					}
				}
			}
			.middle-link {
				width: 100%;
				height: 16rpx;
				background-color: #F8F8F8;
				margin: 40rpx 0;
			}

			.course-teacher-desc-container {
				width: 100%;
				height: auto;
				padding: 0 28rpx;

				.tab-container {
					width: 290rpx;
					height: 71rpx;
					@include between;
					margin-bottom: 34rpx;

					.tab-item {
						width: auto;
						height: 71rpx;
						@include betweenColumn;

						.tabTitle {
							width: auto;
							height: 44rpx;
							line-height: 44rpx;
							color: #333;
							font-size: 28rpx;
						}

						.active {
							color: #EB9A15;
							font-size: 32rpx;
						}

						.tabActiveLine {
							width: 37rpx;
							height: 7rpx;
						}
					}
				}

				.container-body {
					width: 100%;
					height: auto;
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;
				}

				.teacher-intruction {
					width: 100%;
					height: 852rpx;
				}
			}
		}
	}
</style>
