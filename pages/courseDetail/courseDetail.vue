<template>
	<view class="container">
		<view class="placeholder" :style="{'height': (iStatusBarHeight * 2) + 'rpx'}"></view>
		<view class="course-filter-container">
			<image src="https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/course/yyj-td-c1.jpg" mode=""
				class="filter-bg"></image>
			<image src="../../static/img/fanhui-big@2x.png" mode="" class="back"></image>
			<view class="video-container">

			</view>
		</view>
		<view class="main-container">
			<view class="">
				1
			</view>
			<view class="">
				1
			</view>
			<view class="">
				1
			</view>
			<view class="">
				1
			</view>
			<view class="">
				1
			</view>
			<view class="">
				1
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				iStatusBarHeight: null,
				bgUrl: 'https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/course/yyj-td-c1.jpg'
			}
		},
		onLoad(option) {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
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
				position: absolute;
				left: 28rpx;
				bottom: -16rpx;
				background-color: pink;
				z-index: 20;
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
			padding: 170rpx 22rpx 40rpx;
		}
	}
</style>
