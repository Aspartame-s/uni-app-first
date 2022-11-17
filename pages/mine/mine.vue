<template>
	<view class="container" :style="{'paddingBottom': paddingBottom}">
		<view class="user-container">
			<view class="user-info">
				<!-- <view class="user-avatar">
					<image :src="avatarUrl" mode="" class="avatar-img"></image>
				</view> -->
				<button class="user-avatar" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image class="avatar-img" :src="avatarUrl"></image>
				</button>
				<view class="user-name-refresh">
					<view class="name">
						<input type="nickname" v-model="nickName" class="weui-input" placeholder="请输入昵称"
							@blur="setNickName" />
					</view>
					<!-- <view class="refresh" @click="refreshUser">
						<i class="iconfont icon-shuaxin"></i>
					</view> -->
				</view>
			</view>
			<view class="user-viewcount-course">
				<view class="user-viewcount-course-item">
					<span class="item-top">{{collectCount ? collectCount : 0}}</span>
					<span class="item-bottom">我的收藏</span>
				</view>
				<view class="user-viewcount-course-item">
					<span class="item-top">{{watchCount ? watchCount : 0}}</span>
					<span class="item-bottom">观看次数</span>
				</view>
			</view>
		</view>
		<view class="other-container">
			<view class="history-more">
				<view class="history">
					历史记录
				</view>
				<view class="more" @click="moreHistory">
					查看更多
					<i class="iconfont icon-you"></i>
				</view>
			</view>
			<view class="box">
				<default-component v-if="!historyList.length" style="width: 100%;"></default-component>
				<view class="historyList-container" v-else>
					<view class="historyList-item" v-for="(item, index) in historyList" :key="index">
						<view class="historyList-item-top" @click="play(item)">
							<image :src="item.lessonCover" mode="" class="coverImg"></image>
							<video :src="item.lessonUrl" :show-center-play-btn="false" :id="'myVideo' + item.id"
								@fullscreenchange="screenchange"></video>
						</view>
						<view class="historyList-item-bottom">
							{{item.lessonDesc}}
						</view>
					</view>
				</view>
			</view>
			<view class="base-info-item" v-for="(item, index) in baseInfoLit" :key="index"
				@click="showModel(item.text)">
				<view class="base-info-left">
					<image :src="item.iconUrl" mode="" class="base-info-icon"></image>
					{{item.text}}
				</view>
				<i class="iconfont icon-you icon-you2"></i>
			</view>
		</view>
	</view>
</template>

<script>
	import global from '../../common/global.js';
	import {
		getHistoryList,
		refreshUser,
		userWatchCount,
		userCollectCount,
		addUserWatch
	} from '../../utils/api/wxuser.js'
	import defaultComponent from '../../components/defaultComponent/defaultComponent.vue'
	export default {
		components: {
			defaultComponent
		},
		data() {
			return {
				paddingBottom: global.paddingBottom,
				baseInfoLit: [{
						id: 1,
						iconUrl: global.imgbaseUrl + '/my/about.png',
						text: '关于我们',
					},
					{
						id: 2,
						iconUrl: global.imgbaseUrl + '/my/versions.png',
						text: '版本信息',
					},
					{
						id: 3,
						iconUrl: global.imgbaseUrl + '/my/feedback.png',
						text: '意见反馈',
					}
				],
				historyList: [],
				avatarUrl: uni.getStorageSync('avatarUrl'),
				nickName: uni.getStorageSync('nickName'),
				openid: uni.getStorageSync('openId'),
				watchCount: '',
				collectCount: '',
				eleId: '',
				courseId: '',
				lessonId: '',
				lessonInfo: null
			}
		},
		computed: {

		},
		methods: {
			onChooseAvatar(e) {
				console.log(e)
				this.avatarUrl = e.detail.avatarUrl
				const data = {
					openid: this.openid,
					name: this.nickName,
					url: this.avatarUrl
				}
				refreshUser(data).then(rr => {
					this.avatarUrl = rr.data.avatarUrl
					this.nickName = rr.data.nickName
					uni.setStorageSync('avatarUrl', rr.data.avatarUrl);
					uni.setStorageSync('nickName', rr.data.nickName);
				})
			},
			setNickName(e) {
				console.log(e)
				this.nickName = e.detail.value
				const data = {
					openid: this.openid,
					name: this.nickName,
					url: this.avatarUrl
				}
				refreshUser(data).then(rr => {
					this.avatarUrl = rr.data.avatarUrl
					this.nickName = rr.data.nickName
					uni.setStorageSync('avatarUrl', rr.data.avatarUrl);
					uni.setStorageSync('nickName', rr.data.nickName);
				})
			},
			getHistoryList(id) {
				getHistoryList(id).then(res => {
					this.historyList = res.data.records.slice(0, 10)
				})
			},
			screenchange(e) {
				console.log(this.eleId)
				let videoplay = uni.createVideoContext(this.eleId, this)
				if (e.detail.fullScreen) {
					videoplay.play()
				} else {
					let data = {
						courseId: this.courseId,
						lessonId: this.lessonId,
						wxUserId: uni.getStorageSync('wxUserId')
					}
					addUserWatch(data).then(res => {
						// console.log('添加一次直播', res);
						if (res.code == 0) {
							console.log('添加成功')
							this.userWatchCount(uni.getStorageSync('wxUserId'))
						}
					})
					videoplay.pause()
				}
			},
			play(item) {
				// this.lessonInfo = item
				let isStart
				//直播开始时间
				var startTime = new Date(item.startTime && item.startTime.replace(/-/g, '/')).getTime();
				//当前时间
				var cuttentTime = new Date().getTime();
				//如果开始时间大于当前时间 未开始
				if (startTime > cuttentTime) {
					isStart = false
				} else {
					//否则 可以跳转视频号或者播放视频
					isStart = true
				}
				let flag
				if (item.lessonUrl) {
					//如果lessonInfo.lessonUrl不为空 播放视频 flag = true
					flag = true //播放视频
				} else {
					//如果lessonInfo.lessonUrl不为空 跳转视频号 flag = false
					flag = false //跳转视频号
				}
				this.courseId = item.courseId
				this.lessonId = item.id
				this.eleId = 'myVideo' + item.id
				if (isStart) {
					if (flag) {
						this.videoContext = uni.createVideoContext(this.eleId, this); // 	创建 video 上下文 VideoContext 对象。
						this.videoContext.requestFullScreen({ // 设置全屏时视频的方向，不指定则根据宽高比自动判断。
							direction: 90 // 屏幕逆时针90度
						});
					} else {
						// 订阅号跳转
						uni.openChannelsLive({
							finderUserName: 'sphfYruhmZYLxXt',
							success: res => {
								let data = {
									courseId: this.lessonInfo.courseId,
									lessonId: this.lessonInfo.id,
									wxUserId: uni.getStorageSync('wxUserId')
								}
								addUserWatch(data).then(res => {
									console.log('添加一次直播', res);
								})
								console.log('成功打开', res);
							},
							fail: res => {
								console.log('打开失败', res);
							}
						})
					}
				} else {
					wx.showModal({
						title: '课程还未开始',
						content: '请稍后观看',
						showCancel: false
					})
					return
				}


			},
			//更新用户
			refreshUser() {
				uni.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						console.log(res)
						const data = {
							encryptedData: res.encryptedData,
							iv: res.iv,
							sessionKey: uni.getStorageSync('sessionKey')
						}
						refreshUser(data).then(rr => {
							this.avatarUrl = rr.data.avatarUrl
							this.nickName = rr.data.nickName
							uni.setStorageSync('avatarUrl', rr.data.avatarUrl);
							uni.setStorageSync('nickName', rr.data.nickName);
						})
					}
				})
			},
			//获取用户观看次数
			userWatchCount(id) {
				userWatchCount(id).then(res => {
					this.watchCount = res.data
				})
			},
			//获取用户收藏次数
			userCollectCount(id) {
				userCollectCount(id).then(res => {
					this.collectCount = res.data
				})
			},
			//查看更多历史
			moreHistory() {
				uni.navigateTo({
					url: `/pages/more/more?flag=history&headTitle=历史记录`
				})
			},
			// 关于我们
			showModel(text) {
				if (text == '关于我们') {
					uni.showModal({
						title: '苏e学堂',
						content: '2022年8月，江苏省电化教育馆推出的非学科类公益直播“苏e直播”上线啦!美术、音乐、书法、舞蹈、表演、手工、甜品制作、主持、体育……。“苏e直播”坚持公益属性，通过一节节超嗨直播，一门门好玩的课程，结合“双减”、课后服务、城乡义务教育均衡，以新媒体、新技术为小朋友们提供优质数字教育资源。',
						showCancel: false
					})
				} else if (text == '意见反馈') {
					uni.showModal({
						title: '如您有任何意见请反馈至',
						content: 'suezhibojs@163.com',
						showCancel: false
					})
				} else {
					uni.showModal({
						title: '苏e学堂小程序',
						content: '1.0',
						showCancel: false
					})
				}

			},
		},
		onShow() {
			this.setTabBarIndex(3);
		},
		onLoad() {
			console.log(this.avatarUrl)
			console.log(this.nickName)
			const wxUserId = uni.getStorageSync('wxUserId')
			this.getHistoryList(wxUserId)
			this.userWatchCount(wxUserId)
			this.userCollectCount(wxUserId)
		}
	}
</script>

<style lang="scss">
	
	.avatar-wrapper {
		width: 100rpx;
		height: 100rpx;
		background-color: pink;
	}

	::-webkit-scrollbar {
		display: none;
	}

	.container {
		width: 100%;
		height: auto;
		background-color: #fff;
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		background-image: url('https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/my/wodebeijing.png');
		background-repeat: no-repeat;
		background-size: 100%;
		padding-top: 100rpx;
		display: flex;
		flex-direction: column;

		.user-container {
			width: 100%;
			height: auto;
			min-height: 200rpx;
			padding-left: 30rpx;

			.user-info {
				width: 100%;
				height: 148rpx;
				// display: flex;
				align-items: center;
				color: #fff;
				font-weight: 500;
				margin-bottom: 34rpx;
				position: relative;

				.user-avatar {
					width: 148rpx;
					height: 148rpx;
					// margin-right: 28rpx;
					background-color: #fff;
					border-radius: 50%;
					overflow: hidden;
					padding: 0 !important;
					margin-left: 0;
					position: absolute;
					left: 0;
					top: 0;

					.avatar-img {
						width: 100%;
						height: 100%;
					}
				}

				.user-name-refresh {
					position: absolute;
					left: 176rpx;
					top: 0;
					width: auto;
					height: 148rpx;
					padding: 10rpx 0;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						font-size: 42rpx;

						.weui-input {
							color: #fff;
						}
					}

					.refresh {
						.icon-shuaxin {
							font-size: 40rpx;
							color: #fff;
							font-weight: 600;
						}
					}
				}
			}

			.user-viewcount-course {
				width: 100%;
				padding-left: 8rpx;
				display: flex;
				color: #fff;
				font-weight: 400;
				margin-bottom: 42rpx;

				.user-viewcount-course-item {
					width: auto;
					@include betweenColumn;
					margin-right: 56rpx;

					.item-top {
						font-size: 44rpx;
						font-weight: 500;
					}

					.item-bottom {
						font-size: 28rpx;

					}
				}
			}
		}

		.other-container {
			width: 100%;
			flex-grow: 1;
			background-color: #fff;
			border-radius: 52rpx 52rpx 0 0;
			padding: 52rpx 0 0;

			.history-more {
				width: 100%;
				padding: 0 28rpx;
				@include between;

				.history {
					font-size: 32rpx;
					font-weight: 500;
					color: #333;
				}

				.more {
					display: flex;
					align-items: center;
					color: #666;
					font-size: 24rpx;

					.icon-you {
						margin-left: 12rpx;
						font-size: 32rpx;
					}
				}
			}

			.box {
				display: flex;
				overflow: auto;

				// border:1px solid red;
				.historyList-container {
					// width: 100%;
					height: auto;
					min-height: 340rpx;
					// overflow-x: scroll;
					overflow: visible;
					display: flex;
					padding: 36rpx 0 0 28rpx;

					// width: max-content;
					.quesheng {
						width: 198rpx;
						height: 170rpx;
					}

					.historyList-item {
						flex-shrink: 0;
						width: 260rpx;
						height: 256rpx;
						border-radius: 16rpx;
						// background-color: pink;
						margin-right: 28rpx;
						box-shadow: 0rpx 8rpx 44rpx 2rpx rgba(0, 0, 0, 0.0800);

						// &:last-child {
						// 	margin-right: 0;
						// }

						.historyList-item-top {
							width: 100%;
							height: 120rpx;
							overflow: hidden;

							.coverImg {
								width: 100%;
								height: 120rpx;
								border-radius: 16rpx 16rpx 0 0;
							}
						}

						.historyList-item-bottom {
							width: 100%;
							// height: 136rpx;
							padding: 26rpx 18rpx 0;
							color: #333;
							font-size: 28rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							display: -webkit-box;
							-webkit-line-clamp: 2;
							-webkit-box-orient: vertical;
						}
					}
				}
			}

			.base-info-item {
				width: 100%;
				height: 44rpx;
				padding: 0 32rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				color: #353535;
				margin-bottom: 44rpx;

				.base-info-left {
					height: 100%;
					display: flex;
					align-items: center;
					font-size: 28rpx;

					.base-info-icon {
						width: 44rpx;
						height: 44rpx;
						margin-right: 32rpx;
					}
				}

				.icon-you2 {
					font-size: 32rpx;
				}
			}
		}
	}
</style>
