<template>
	<view class="more-container">
		<view class="placeholder" :style="{'height': (iStatusBarHeight * 2) + 'rpx'}"></view>
		<view class="custom-bar" :style="{'marginTop': (iStatusBarHeight * 2) + 'rpx'}">
			<image src="../../static/img/fanhui@2x.png" mode="" class="back" @click="back"></image>
			{{headTitle}}
		</view>
		<view :style="{'marginTop': (iStatusBarHeight * 2 + 104) + 'rpx'}">
			<view class="list-item-container" v-for="(item, index) in (flag == '/living' ? livingList : livingBackList)">
				<row-list :lessonInfo="item" :hasMargin="false" :isLiving="flag == '/living' ? true : false"></row-list>
			</view> 
		</view>
	</view>
</template>

<script>
	import rowList from '../../components/rowList/rowList.vue';
	import {
		getLivingList,
		getLivingBackList
	} from '../../utils/api/lesson.js';
	export default {
		components: {
			rowList
		},
		data() {
			return {
				livingList: [],
				livingBackList: [],
				flag: null,
				iStatusBarHeight: null,
				headTitle: ''
			}
		},
		methods: {
			//获取直播列表
			getLivingList() {
				getLivingList().then(res => {
					this.livingList = res.data
				})
			},
			//获取直播回放列表
			getLivingBackList() {
				getLivingBackList().then(res => {
					this.livingBackList = res.data
				})
			},
			back() {
				uni.navigateBack()
			}
		},
		 onLoad(option) {
			 this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			 console.log(uni.getSystemInfoSync().statusBarHeight)
			 this.flag = option.flag
			 this.headTitle = option.headTitle
		 },
		mounted() {
			this.getLivingList()
			this.getLivingBackList()
		}
	}
</script>

<style lang="scss">
	.more-container {
		height: auto;
		width: 100%;
		min-height: 100vh;
		background-color: #F8F8F8; 
		// padding-top: var(--status-bar-height);
		// padding-top: env(safe-area-inset-top);
		padding-bottom: env(safe-area-inset-bottom); 
		.placeholder {
			width: 100%;
			// height: 88rpx;
			background-color: #F8F8F8;
			position: fixed;
			top: 0;
			z-index: 9999;
		}
		.custom-bar {
			width: 100%;
			height: 104rpx;
			box-shadow: 0 6rpx 12rpx 2rpx rgba(0, 0, 0, 0.0400);
			@include center;
			padding: 15rpx;
			position: relative;
			background-color: #fff;
			color: #1E1E20;
			font-size: 32rpx;
			font-weight: 400;
			position: fixed;
			top: 0;
			z-index: 9998;
			.back {
				width: 39rpx;
				height: 32rpx;
				position: absolute;
				left: 42rpx;
			}
		}
		.list-item-container {
			width: 100%;
			height: auto;
			padding: 40rpx 28rpx 40rpx 30rpx;
			background-color: #fff;
			margin-bottom: 16rpx;
			// margin-top: 88rpx;
			z-index: 1;
		}
	}
</style>