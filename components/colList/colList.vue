<template>
	<view class="list-col-container" :style="{'marginBottom': hasMargin ? '40rpx' : '0'}">
		<view class="container-top" @click="play">
			<view class="start-time" v-if="hasLeftTopTip">
				{{lessonInfo.startTime.substring(11, 16)}}
			</view>
			<view class="video-container">
				<image :src="lessonInfo.lessonCover || lessonInfo.courseCover" class="bg-img"></image>
				<video :src="lessonInfo.lessonUrl" :show-center-play-btn="false" id="myVideo"
					@fullscreenchange="screenchange" v-if="hasVideo"></video>
				<image :src="imgbaseUrl + '/course/bofang.png'" class="bofangImg" v-if="hasVideo"></image>
			</view>
		</view>
		<view class="container-bottom">
			<view class="top">
				{{lessonInfo.lessonName || lessonInfo.courseName}}
			</view>
			<view class="middle">
				{{lessonInfo.lessonDesc || lessonInfo.courseName}}
			</view>
			<view class="bottom">
				<view class="teacher-info">
					<image :src="lessonInfo.teacher.teacherAvatar" class="teacher-icon"></image>
					<span class="teacher-name">{{lessonInfo.teacher.teacherName}}</span>
				</view>
				<view v-if="false">
					<view class="live-time" v-if="Number(lessonInfo.videoDuration) >= Number(lessonInfo.elapsedTime)">
						已播1分钟</view>
					<view class="live-time" v-else>已播完</view>
				</view>
				<view class="view-container">
					<image src="../../static/img/viewCount@2x.png" mode="" class="view-count"></image>
					<span class="count-num">45</span>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import global from '../../common/global.js';
	export default {
		name: 'col-list',
		props: {
			lessonInfo: {
				type: Object,
				default: {}
			},
			hasMargin: {
				type: Boolean,
				default: false
			},
			hasVideo: {
				type: Boolean,
				default: true
			},
			hasLeftTopTip: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				imgbaseUrl: global.imgbaseUrl
			}
		},
		computed: {
			//判断课程是否开始
			isStart() {
				let isStart
				//直播开始时间
				var startTime = new Date(this.lessonInfo.startTime && this.lessonInfo.startTime.replace(/-/g, '/')).getTime();
				//当前时间
				var cuttentTime = new Date().getTime();
				//如果开始时间大于当前时间 未开始
				if (startTime > cuttentTime) {
					isStart = false
				} else {
					//否则 可以跳转视频号或者播放视频
					isStart = true
				}
				return isStart
			},
			//判断是跳转视频号还是播放视频
			isPlayOrSkip() {
				let flag
				if (this.lessonInfo.lessonUrl) {
					//如果lessonInfo.lessonUrl不为空 播放视频 flag = true
					flag = true //播放视频
				} else {
					//如果lessonInfo.lessonUrl不为空 跳转视频号 flag = false
					flag = false //跳转视频号
				}
				return flag
			}
		},
		methods: {
			test() {
				console.log(this.isPlayOrSkip)
			},
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
			play() {
				this.videoContext = uni.createVideoContext('myVideo', this); // 	创建 video 上下文 VideoContext 对象。
				this.videoContext.requestFullScreen({ // 设置全屏时视频的方向，不指定则根据宽高比自动判断。
					direction: 90 // 屏幕逆时针90度
				});
			}
		}
	}
</script>

<style>
	.list-col-container {
		width: 320rpx;
		height: 428rpx;
		/* background-color: pink; */
		box-shadow: 0 8rpx 8rpx 2rpx rgba(0, 0, 0, 0.0700);
		border-radius: 16rpx; 
		margin: 0 6rpx;
	}

	.container-top {
		width: 320rpx;
		height: 208rpx;
		border-radius: 16rpx 16rpx 0 0;
		overflow: hidden;
		position: relative;
	}

	.start-time {
		z-index: 99;
		width: auto;
		padding: 0 14rpx;
		height: 40rpx;
		border-radius: 4rpx;
		background-color: #FD9770;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 24rpx;
		color: #fff;
	}

	.video-container {
		width: 320rpx;
		height: 208rpx;
		position: relative;
		overflow: hidden;
		/* -webkit-backface-visibility: hidden;
	-webkit-transform: translate3d(0, 0, 0); */
	}

	/* 播放按钮 */
	.bofangImg {
		width: 50rpx;
		height: 50rpx;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 100;
	}

	.bg-img {
		width: 100%;
		height: 100%;
		border-radius: 16rpx 16rpx 0 0;
	}

	.container-bottom {
		width: 320rpx;
		height: auto;
		position: relative;
		padding: 16rpx 12rpx 0rpx;
	}

	.top {
		font-size: 28rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1; 
		-webkit-box-orient: vertical;
		margin-bottom: 2rpx;
	}

	.middle {
		width: 100%;
		height: 75rpx;
		margin-bottom: 25rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #666;
		font-size: 28rpx;
		line-height: 40rpx;
	}

	.bottom {
		width: 100%;
		height: 40rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-right: 10rpx;
/* 		position: absolute;
		bottom: 10rpx; */
	}

	.teacher-info {
		width: auto;
		height: 40rpx;
		display: flex;

	}

	.teacher-icon {
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	.teacher-name {
		color: #666;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.live-time {
		height: 40rpx;
		display: flex;
		align-items: center;
		color: #666;
		font-size: 24rpx;
	}

	.view-container {
		height: 40rpx;
		display: flex;
		align-items: center;
	}

	.view-count {
		width: 26rpx;
		height: 14rpx;
		margin-right: 10rpx;
		vertical-align: middle;
	}

	.count-num {
		font-size: 24rpx;
		color: #666;
	}

	.getPhoneBtn {
		width: 320rpx;
		height: 208rpx;
		opacity: 0;
		z-index: 99;
		position: absolute;
	}

	.quesheng {
		width: 100%;
		height: 100%;
		background-color: pink;
	}
</style>
