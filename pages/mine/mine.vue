<template>
	<view class="container" :style="{'paddingBottom': paddingBottom}">
		<view class="user-container">
			<view class="user-info">
				<view class="user-avatar">

				</view>
				<view class="user-name-refresh">
					<view class="name">
						张三
					</view>
					<view class="refresh">
						<i class="iconfont icon-shuaxin"></i>
					</view>
				</view>
			</view>
			<view class="user-viewcount-course">
				<view class="user-viewcount-course-item">
					<span class="item-top">233323</span>
					<span class="item-bottom">我的课程</span>
				</view>
				<view class="user-viewcount-course-item">
					<span class="item-top">453434</span>
					<span class="item-bottom">观看次数</span>
				</view>
			</view>
		</view>
		<view class="other-container">
			<view class="history-more">
				<view class="history">
					历史记录
				</view>
				<view class="more">
					查看更多
					<i class="iconfont icon-you"></i>
				</view>
			</view>
			<view class="box">
				<view class="historyList-container">
					<view class="historyList-item">
						<view class="historyList-item-top">

						</view>
						<view class="historyList-item-bottom">
							第一篇章：学习准备篇第一篇章：学习准备篇第一篇章：学习准备篇第一篇章：学习准备篇
						</view>
					</view>
					<view class="historyList-item">
						<view class="historyList-item-top">

						</view>
						<view class="historyList-item-bottom">
							第一篇章：学习准备篇第一篇章：学习准备篇第一篇章：学习准备篇第一篇章：学习准备篇
						</view>
					</view>
					<view class="historyList-item">
						<view class="historyList-item-top">

						</view>
						<view class="historyList-item-bottom">
							第一篇章：学习准备篇第一篇章：学习准备篇第一篇章：学习准备篇第一篇章：学习准备篇
						</view>
					</view>
					<view class="historyList-item">
						<view class="historyList-item-top">

						</view>
						<view class="historyList-item-bottom">
							第一篇章：学习准备篇第一篇章：学习准备篇第一篇章：学习准备篇第一篇章：学习准备篇
						</view>
					</view>

				</view>
			</view>
			<view class="base-info-item" v-for="(item, index) in baseInfoLit" :key="index">
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
	export default {
		data() {
			return {
				paddingBottom: global.paddingBottom,
				baseInfoLit: [
					{
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
				]
			}
		},
		methods: {

		},
		onShow() {
			this.setTabBarIndex(3);
		}
	}
</script>

<style lang="scss">
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
				height: 148rpx;
				display: flex;
				align-items: center;
				color: #fff;
				font-weight: 500;
				margin-bottom: 34rpx;

				.user-avatar {
					width: 148rpx;
					height: 148rpx;
					margin-right: 28rpx;
					background-color: #fff;
				}

				.user-name-refresh {
					width: auto;
					height: 148rpx;
					padding: 10rpx 0;
					display: flex;
					flex-direction: column;
					justify-content: space-between;

					.name {
						font-size: 46rpx;
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
