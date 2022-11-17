<template>
	<view class="more-container">
		<view class="placeholder" :style="{'height': (iStatusBarHeight * 2) + 'rpx'}"></view>
		<view class="custom-bar" :style="{'marginTop': (iStatusBarHeight * 2) + 'rpx'}">
			<image src="../../static/img/fanhui@2x.png" mode="" class="back" @click="back"></image>
			{{headTitle}}
		</view>
		<view :style="{'marginTop': (iStatusBarHeight * 2 + 104) + 'rpx'}">
			<view class="list-item-container"
				v-for="(item, index) in (flag == '/living' ? livingList : flag == '/livehistory' ? livingBackList : historyList)">
				<row-list :lessonInfo="item" :hasMargin="false" :isLiving="flag == '/living' ? true : false"></row-list>
			</view>
		</view>
		<view v-show="isLoadMore">
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
	</view>
</template>

<script>
	import rowList from '../../components/rowList/rowList.vue';
	import {
		getLivingList,
		getLivingBackList
	} from '../../utils/api/lesson.js';
	import {
		getHistoryList
	} from '../../utils/api/wxuser.js'
	export default {
		components: {
			rowList
		},
		data() {
			return {
				livingList: [],
				livingBackList: [],
				historyList: [],
				flag: null,
				iStatusBarHeight: null,
				headTitle: '',
				loadStatus: 'loading',
				isLoadMore: false, //是否加载中
				page: 1, //页码
				size: 10, //每页条目数
				totalPage: null //总页数
			}
		},
		methods: {
			//获取直播列表
			getLivingList(page, size) {
				getLivingList(page, size).then(res => {
					this.totalPage = Math.ceil(res.data.total / this.size)
					if (res.data.records.length) {
						this.livingList = this.livingList.concat(res.data.records)
						if (res.data.records.length < this.pagesize) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
							this.isLoadMore = true
							this.loadStatus = 'nomore'
						} else {
							this.isLoadMore = false
						}
					} else {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					}
				})
			},
			//获取直播回放列表
			getLivingBackList(page, size) {
				getLivingBackList(page, size).then(res => {
					this.totalPage = Math.ceil(res.data.total / this.size)
					if (res.data.records.length) {
						this.livingBackList = this.livingBackList.concat(res.data.records)
						if (res.data.records.length < this.pagesize) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
							this.isLoadMore = true
							this.loadStatus = 'nomore'
						} else {
							this.isLoadMore = false
						}
					} else {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					}

				})
			},
			//获取历史记录列表
			getHistoryList(id, page, size) {
				getHistoryList(id, page, size).then(res => {
					this.totalPage = Math.ceil(res.data.total / this.size)
					if (res.data.records.length) {
						this.historyList = this.historyList.concat(res.data.records)
						if (res.data.records.length < this.pagesize) { //判断接口返回数据量小于请求数据量，则表示此为最后一页
							this.isLoadMore = true
							this.loadStatus = 'nomore'
						} else {
							this.isLoadMore = false
						}
					} else {
						this.isLoadMore = true
						this.loadStatus = 'nomore'
					}
				})
			},
			back() {
				uni.navigateBack()
			}
		},
		onLoad(option) {
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.flag = option.flag
			this.headTitle = option.headTitle
		},
		mounted() {
			const wxUserId = uni.getStorageSync('wxUserId')
			if(this.flag == '/living') {
				this.getLivingList(this.page, this.size)
			}else if(this.flag == '/livehistory') {
				this.getLivingBackList(this.page, this.size)
			}else if(this.flag == 'history') {
				this.getHistoryList(wxUserId, this.page, this.size)
			}
		},
		onReachBottom() { //上拉触底函数
			if (this.page >= this.totalPage) {
				this.loadStatus = 'nomore'
				return
			} else {
				if (!this.isLoadMore) { //此处判断，上锁，防止重复请求
					this.isLoadMore = true
					this.page += 1
					if(this.flag == '/living') {
						this.getLivingList(this.page, this.size)
					}else if(this.flag == '/livehistory') {
						this.getLivingBackList(this.page, this.size)
					}else if(this.flag == 'history') {
						this.getHistoryList(uni.getStorageSync('wxUserId'), this.page, this.size)
					}
				}
			}

		},
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
