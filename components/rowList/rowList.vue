<template>
	<view class="list-row-container" :style="{'marginBottom': hasMargin ? '40rpx' : '0'}">
		<view class="container-left" @click="play">
			<view class="start-time" v-if="!isLiving">
				{{lessonInfo.startTime.substring(11, 16)}}
			</view>
			<view class="is-living" v-if="isLiving">
				<image src="../../static/img/livingIcon@2x.png" mode="" class="living-icon"></image>
				正在直播
			</view>
			<view class="video-container">
				<image :src="lessonInfo.lessonCover" class="bg-img"></image>
				<video :src="lessonInfo.lessonUrl" :show-center-play-btn="false" id="myVideo"
					@fullscreenchange="screenchange"></video>
				<image :src="imgbaseUrl + '/course/bofang.png'" class="bofangImg"></image>
			</view>
		</view>
		<view class="container-right">
			<view class="top" @click="test">{{lessonInfo.lessonName}}</view>
			<view class="middle">{{lessonInfo.lessonDesc}}</view>
			<view class="bottom">
				<view class="teacher-info">
					<image :src="lessonInfo.teacher.teacherAvatar" class="teacher-icon"></image>
					<span class="teacher-name">{{lessonInfo.teacher.teacherName}}</span>
				</view>
				<view v-if="isShowTime">
					<view class="live-time" v-if="Number(lessonInfo.videoDuration) >= Number(lessonInfo.elapsedTime)">
						已播{{lessonInfo.elapsedTime}}分钟</view>
					<view class="live-time" v-else>已播完</view>
				</view>
				<view class="view-container" v-if="!isShowTime">
					<image src="../../static/img/viewCount@2x.png" mode="" class="view-count"></image>
					<span class="count-num">{{lessonInfo.views}}</span>
				</view>
			</view>
		</view>
		<!-- <button open-type="getPhoneNumber" wx:if="{{phoneModel}}" bindgetphonenumber="getPhoneNumber" class="getPhoneBtn"></button> -->
	</view>
</template>

<script>
	import global from '../../common/global.js';
	export default {
		name: 'row-list',
		props: {
			lessonInfo: {
				type: Object,
				default: {}
			},
			hasMargin: { //判断是否有margin-bottom
				type: Boolean,
				default: true
			},
			isLiving: { //判断左上角标识是直播还是 时间
				type: Boolean,
				default: false
			},
			isShowTime: { //判断右下角是观看次数还是已播多久
				type: Boolean,
				default: true
			},
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
				var startTime = new Date(this.lessonInfo.startTime.replace(/-/g, '/')).getTime();
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
		mounted() {
			
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

<style lang="scss">
	.list-row-container {
		/* background-color: pink; */
		width: 100%;
		height: 208rpx;
		display: flex;
		/* justify-content: space-between; */
		align-items: center;
	}

	.container-left {
		width: 320rpx;
		height: 208rpx;
		border-radius: 16rpx;
		overflow: hidden;
		position: relative;
		margin-right: 32rpx;
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

	.start-time {
		z-index: 99;
		width: 80rpx;
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
	.is-living {
		z-index: 99;
		background-color: #FD9770;
		position: absolute;
		left: 0;
		top: 0;
		width: 129rpx;
		height: 43rpx;
		border-radius: 16rpx 0 16rpx 0;
		@include center;
		color: #fff;
		font-size: 20rpx;
		.living-icon {
			width: 25rpx;
			height: 23rpx;
			margin-right: 4rpx;
		}
	}

	.bg-img {
		width: 100%;
		height: 100%;
		border-radius: 16rpx;
	}

	.container-right {
		width: 280rpx;
		height: 200rpx;
		position: relative;
	}

	.top {
		font-size: 28rpx;
		color: #333;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
		margin-bottom: 8rpx;
	}

	.middle {
		width: 100%;
		height: auto;
		margin-bottom: 12rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		color: #666;
		font-size: 28rpx;
	}

	.bottom {
		width: 100%;
		height: 40rpx;
		display: flex;
		// padding-right: 20rpx;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		bottom: 0;

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
</style>
