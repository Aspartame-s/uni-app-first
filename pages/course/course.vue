<template>
	<view class="container">
		<view class="banner-container">
			<view class="base-title">
				<view class="base-icon"></view>
				热门老师
			</view>
			<view>
				<swiper duration="500" class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration"
					:indicator-dots="showDocts" :indicator-color="color" :indicator-active-color="activeColor">
					<swiper-item v-for="(item, index) in bannerList" :key="index" class="swiperitem">
						<image :src="item.bannerUrl" class="bannerImg"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<view class="course-container">
			<view class="base-title">
				<view class="base-icon"></view>
				全部课程
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getBannerList,
		getCourseCategoryList
	} from '../../utils/api/lesson.js';
	export default {
		data() {
			return {
				bannerList: [],
				showDocts: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				color: '#D8D8D8',
				activeColor: '#EB9A15'
			}
		},
		methods: {
			getBannerList() {
				getBannerList().then(res => {
					// console.log(res)
					this.bannerList = res.data
				})
			},
			getCourseCategoryList() {
				getCourseCategoryList().then(res => {
					console.log(res)
					this.courseCategoryList = res.data
				})
			}
		},
		mounted() {
			this.getBannerList()
			this.getCourseCategoryList()
		},
		onShow()  {
						this.setTabBarIndex(1);
				 }
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #F8F8F8;
		display: flex;
		flex-direction: column;
		.base-title {
			width: 100%;
			height: 44rpx;
			display: flex;
			align-items: center;
			margin-bottom: 38rpx;
		
			.base-icon {
				width: 10rpx;
				height: 28rpx;
				background-color: #F2B23A;
				border-radius: 6rpx;
				color: #1E1E20;
				font-size: 32rpx;
				margin-right: 28rpx;
			}
		}
		.banner-container {
			width: 100%;
			height: auto;
			background-color: #fff;
			padding: 20rpx 28rpx 15rpx;
			margin-bottom: 16rpx;

			.swiper {
				height: 417rpx;
				border-radius: 16rpx;
				overflow: hidden;
			}
			
			.wx-swiper-dot-active {
					width: 40rpx;
					border-radius: 10rpx;
				}

			.swiperitem {
				border-radius: 16rpx;
				box-sizing: border-box;
			}

			.bannerImg {
				width: 694rpx;
				height: 360rpx;
				border-radius: 16rpx;
				box-sizing: border-box;
			}
		}
		.course-container {
			width: 100%;
			flex-grow: 1;
			background-color: #fff;
			padding: 28rpx 28rpx 40rpx;
		}
	}
</style>
