<template>
	<view class="container">
		<view class="placeholder" :style="{'height': (iStatusBarHeight * 2) + 'rpx'}"></view>
		<view class="title">
			请选择你的兴趣爱好
		</view>
		<view class="hobby-container">
			<view class="hobby-item" v-for="(item ,index) in hobbyList" :key="index" @click="selectHobby(item, index)">
				<view class="hobby-icon-container">
					<i class="iconfont icon-xuanzhong" v-show="item.active"></i>
					<image :src="item.icon" mode="" class="hobby-icon"></image>
				</view>
				{{item.hobbyName}}
			</view>
		</view>
		<view class="selected" @click="selectSuccess">
			选好了
		</view>
	</view>
</template>

<script>
	import {
		getHobbyList,
		saveWxUserHobby
	} from '../../utils/api/hobby.js';
	import global from '../../common/global.js';
	export default {
		data() {
			return {
				iStatusBarHeight: null,
				hobbyList: [],
				wxUserId: '',
				wxUserHobbyList: []
			}
		},
		methods: {
			getHobbyList() {
				console.log(1)
				getHobbyList().then(res => {
					this.hobbyList = res.data
					this.hobbyList.forEach(item => {
						item.active = false
					})
				})
			},
			selectHobby(item, index) {
				this.$set(this.hobbyList, index, Object.assign(item, {active: item.active ? false : true}))
				// this.wxUserHobbyList.push({
				// 	hobbyId: item.id,
				// 	wxUserId: this.wxUserId
				// })
				// console.log(this.hobbyList)
			},
			selectSuccess() {
				this.hobbyList.forEach(item => {
					if(item.active) {
						this.wxUserHobbyList.push({
							hobbyId: item.id,
							wxUserId: this.wxUserId
						})
					}
				})
				saveWxUserHobby(this.wxUserHobbyList).then(res => {
					// console.log(res)
					if(res.code == 0) {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})
			}
		},
		async onLoad() {
			 await this.$onLaunched;
			this.wxUserId = uni.getStorageSync('wxUserId')
			this.getHobbyList()
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
		background-image: url('https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/hobby/hobby_bg@2x.png');
		background-size: 100%;
		background-repeat: no-repeat;
		display: flex;
		flex-direction: column;
		align-items: center;
		.placeholder {
			margin-bottom: 180rpx;
		}
		.title {
			width: 100%;
			font-size: 44rpx;
			text-align: center;
			color: #1E1E20;
			margin-bottom: 100rpx;
		}
		.hobby-container {
			width: 100%;
			height: auto;
			display: flex;
			flex-wrap: wrap;
			// justify-content: space-between;
			padding-left: 88rpx;
			margin-bottom: 144rpx;
			.hobby-item {
				width: 124rpx;
				height: 188rpx;
				margin-right: 102rpx;
				margin-bottom: 24rpx;
				flex-shrink: 0;
				@include betweenColumn;
				color: #1E1E20;
				font-size: 32rpx;
				&:nth-child(3) {
					margin-right: 0;
				}
				&:nth-child(6) {
					margin-right: 0;
				}
				&:nth-child(9) {
					margin-right: 0;
				}
				.hobby-icon-container {
					width: 100%;
					height: 124rpx;
					position: relative;
					.hobby-icon {
						width: 100%;
						height: 100%;
					}
					.icon-xuanzhong {
						color: #febf54;
						position: absolute;
						right: 0;
						bottom: 0;
						font-size: 32rpx;
					}
				}
				
			}
		}
		.selected {
			width: 280rpx;
			height: 72rpx;
			border-radius: 36rpx;
			background-color: #EB9A15;
			color: #fff;
			font-size: 28rpx;
			@include center;
		}
	}
</style>