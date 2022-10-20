<script>
	const {
		userLogin
	} = require('./utils/api/login');
	export default {
		data() {
			return {}
		},
		computed: {
			// padding() {
			// 	let paddingBottom
			// 	let padding
			// 	paddingTop = uni.getSystemInfoSync().safeAreaInsets.bottom * 2 + 'rpx'
			// 	padding = `--paddingBottom: ${paddingBottom}`
			// 	return padding
			// }
		},
		onLaunch: function() {
			console.warn('当前组件仅支持 uni_modules 目录结构 ，请升级 HBuilderX 到 3.1.0 版本以上！')
			console.log('App Launch')
			// uni.login({
			// 	success: (res) => {
			// 		console.log(res)
			// 	}
			// })
			uni.login({
				provider: 'weixin',
				success: async res => {
					console.log(res)
					await userLogin('/wxmini/wxuser/login', {
						"jscode": res.code
					}).then(rr => {
						uni.setStorageSync('wxUserId', rr.data.wxuser.id);
						uni.setStorageSync('sessionKey', rr.data.sessionKey);
						if(rr.data.hobbies.length != 0) {
							uni.switchTab({
								url: '/pages/index/index'
							})
						}else {
							uni.reLaunch({
								url: '/pages/hobby/hobby'
							})
						}
						this.$isResolve()
					})
				}
			})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import url('@/static/fonts/iconfonts.css');
	/*每个页面公共css */
	@import '@/uni_modules/uni-scss/index.scss';
	/* #ifndef APP-NVUE */
	@import '@/static/customicons.css';

	// 设置整个项目的背景色
	page {
		background-color: #f5f5f5;
	}

	.all {
		padding-bottom: var(--paddingBottom) !important;
	}

	/* #endif */
	.example-info {
		font-size: 14px;
		color: #333;
		padding: 10px;
	}

	// .swiper .wx-swiper-wrapper .wx-swiper-dots-horizontal .wx-swiper-dot-active {
	// 		width: 40rpx;
	// 		border-radius: 10rpx;
	// 	}

	// .uni-swiper-dot-active {
	// 			width: 40rpx!important;
	// 			border-radius: 6rpx!important;
	// 			background-color: #000 !important;
	// 		}
</style>
