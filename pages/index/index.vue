<template>
	<view>
		<view class="placeholder" :style="{'height': (iStatusBarHeight * 2) + 'rpx'}"></view>
		<view class="container" :style="{'paddingBottom': paddingBottom}">
			<image src="/static/img/suezhiboLOGO.png" class="logo"></image>
			<view class="kechengbiao">
				<image :src="imgbaseUrl + '/img/kechengbiao.png'" mode="" class="kechengbiao-img">
				</image>
			</view>
			<view class="date-component-container">
				<attendCalendar @onClick="selectDate"></attendCalendar>
				<view class="link-container">
					<image :src="imgbaseUrl + '/icon/shortlink1.png'" mode="" class="link"></image>
					<image :src="imgbaseUrl + '/icon/shortlink1.png'" mode="" class="link"></image>
				</view>
			</view>
			<view class="course-container">
				<row-list v-if="lessonDataOnlyOne" v-for="(item, index) in lessonDataOnlyOne" :key="index"
					:lessonInfo="item" :hasMargin="false" :isShowTime="false"></row-list>
				<col-list v-if="lessonDataMuch" v-for="(item, index) in lessonDataMuch" :key="index" :lessonInfo="item">
				</col-list>
				<default-component style="width: 100%;" v-if="!lessonDataOnlyOne.length && !lessonDataMuch.length">
				</default-component>
			</view>
			<view style="margin-bottom: 16rpx;">
				<swiper duration="500" class="swiper" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="(item, index) in bannerList" :key="index" class="swiperitem">
						<image :src="item.bannerUrl" class="bannerImg"></image>
					</swiper-item>
				</swiper>
			</view>
			<view class="living-and-liveback-container">
				<view class="container-head">
					<view class="tab-container">
						<view class="tab-item" v-for="(item, index) in tabList" :key="index"
							@click="tabChange(item.id, item.path)">
							<image :src="item.active ? item.titleActiveUrl : item.titleUrl" alt="" class="tabTitle">
							</image>
							<image :src="item.iconUrl" alt="" class="tabActiveLine" v-show="item.active"></image>
						</view>
					</view>
					<view class="see-more" @click="seeMore">
						????????????
						<image src="../../static/img/chakangengduo@2x.png" alt="" class="more"></image>
					</view>
				</view>
				<view class="container-body">
					<view v-if="path == '/living'">
						<default-component v-if="!livingList.length" style="width: 100%;"></default-component>
						<row-list v-for="(item, index) in livingList" :key="index" :lessonInfo="item" :isLiving="true"
							v-else></row-list>
					</view>
					<view v-else>
						<default-component v-if="!livingBackList.length" style="width: 100%;"></default-component>
						<row-list v-for="(item, index) in livingBackList" :key="index" :lessonInfo="item" v-else>
						</row-list>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import rowList from '../../components/rowList/rowList.vue';
	import colList from '../../components/colList/colList.vue';
	import defaultComponent from '../../components/defaultComponent/defaultComponent.vue'
	import attendCalendar from '../../components/attend-calendar/attend-calendar.vue';
	const {
		userLogin
	} = require('../../utils/api/login');
	import {
		getLessonList,
		getBannerList,
		getLivingList,
		getLivingBackList
	} from '../../utils/api/lesson.js';
	import {
		getHobbyList,
		saveWxUserHobby
	} from '../../utils/api/hobby.js';
	import global from '../../common/global.js';
	import {getCurrentDate} from '../../utils/date/date.js'
	export default {
		components: {
			rowList,
			colList,
			attendCalendar,
			defaultComponent
		},
		data() {
			return {
				paddingBottom: global.paddingBottom,
				href: 'https://uniapp.dcloud.io/component/README?id=uniui',
				imgbaseUrl: global.imgbaseUrl,
				selected: ['2022-10-08', '2022-10-09'],
				lessonDataOnlyOne: null, //??????????????????
				lessonDataMuch: null, //???????????????
				bannerList: [],
				autoplay: true,
				interval: 2000,
				duration: 500,
				tabList: [{
						id: 1,
						name: "????????????",
						titleUrl: "https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/livingweixuanzhong.png",
						titleActiveUrl: "https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/livingxuanzhong.png",
						iconUrl: "https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/huxian.png",
						active: 1,
						path: "/living",
					},
					{
						id: 2,
						name: "????????????",
						titleUrl: "https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/zhibohuifangweixuanzhong.png",
						titleActiveUrl: "https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/livingxuanzhong1.png",
						iconUrl: "https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/icon/huxian.png",
						active: 0,
						path: "/livehistory",
					},
				],
				path: "/living",
				livingList: [],
				livingBackList: [],
				iStatusBarHeight: null
			}
		},
		methods: {
			selectDate(date) {
				this.getLessonList(date)
			},
			getLessonList(date) {
				return getLessonList(date).then(res => {
					if (res.data.length == 1) {
						this.lessonDataOnlyOne = res.data
						this.lessonDataMuch = null
					} else if (res.data.length > 1) {
						this.lessonDataMuch = res.data
						this.lessonDataOnlyOne = null
					} else if (res.data.length == 0) {
						this.lessonDataOnlyOne = null
						this.lessonDataMuch = null
					}
				})
			},
			getBannerList(route) {
				getBannerList(route).then(res => {
					// console.log(res)
					this.bannerList = res.data
				})
			},
			//tab??????
			tabChange(id, path) {
				this.path = path;
				this.tabList.forEach((item) => {
					if (item.id == id) {
						item.active = 1;
					} else {
						item.active = 0;
					}
				});
			},
			//??????????????????
			getLivingList() {
				getLivingList().then(res => {
					this.livingList = res.data.slice(0, 2)
				})
			},
			//????????????????????????
			getLivingBackList() {
				getLivingBackList().then(res => {
					this.livingBackList = res.data.slice(0, 2)
				})
			},
			seeMore() {
				// console.log(123)
				uni.navigateTo({
					url: `/pages/more/more?flag=${this.path}&headTitle=${this.path == '/living' ? '????????????' : '????????????'}`
				})
			}
		},
		async onLoad() {
			await this.$onLaunched;
			// console.log(uni.getStorageSync('phone'), 'index')
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight;
			this.getLessonList(getCurrentDate())
			this.getBannerList('index')
			this.getLivingList()
			this.getLivingBackList()
		},
		mounted() {
			// wx.hideShareMenu({
			//   menus: ['shareAppMessage', 'shareTimeline']
			// }),
		},
		onShow() {
			this.setTabBarIndex(0);
		},
		// onShareAppMessage(res) {
		// 	console.log(res, 'res')
		// 	if(res.from == 'menu') {
		// 		return {
		// 			title: '???????????????????????????',
		// 			path: `/pages/index/index`
		// 		}
		// 	}
		// }
	}
</script>
<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #FAE9CD;
		background-image: url('https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/img/beijingtu.png');
		background-size: 100%;
		background-repeat: no-repeat;
		background-position: left 0 top 30rpx;
		padding: 141rpx 28rpx 236rpx;
		font-size: 14px;
		line-height: 24px;
		position: relative;
	}

	.logo {
		position: absolute;
		left: 536rpx;
		right: 48rpx;
		top: 64rpx;
		width: 186rpx;
		height: 64rpx;
	}

	.kechengbiao {
		width: 306rpx;
		height: 74rpx;
		/* position: absolute; */
		/* top: 282rpx;
		left: 246rpx; */
		margin-top: 140rpx;
		margin-left: 208rpx;
		margin-bottom: 44rpx;
	}

	.kechengbiao-img {
		width: 100%;
		height: 100%;
	}

	.course-container {
		margin-top: 16rpx;
		width: 100%;
		height: auto;
		/* min-height: 500rpx; */
		border-radius: 16rpx;
		background-color: #fff;
		padding: 62rpx 21rpx 42rpx;
		display: flex;
		overflow-x: scroll;
		margin-bottom: 16rpx;
	}

	.date-component-container {
		width: 100%;
		height: auto;
		position: relative;
	}

	.link-container {
		width: 100%;
		height: 80rpx;
		/* background-color: pink; */
		position: absolute;
		bottom: -46rpx;
		display: flex;
		justify-content: space-between;
		padding: 0 68rpx 0 72rpx;
	}

	.link {
		width: 24rpx;
		height: 80rpx;
	}

	.swiper {
		height: 232rpx;
		border-radius: 16rpx;
		overflow: hidden;
	}

	.swiperitem {
		border-radius: 16rpx;
		box-sizing: border-box;
	}

	.bannerImg {
		width: 694rpx;
		height: 100%;
		border-radius: 16rpx;
		box-sizing: border-box;
	}

	.living-and-liveback-container {
		width: 100%;
		height: auto;
		background-color: #fff;
		padding: 48rpx 26rpx 2rpx 24rpx;
		border-radius: 16rpx;
	}

	.container-head {
		width: 100%;
		height: 77rpx;
		position: relative;
		margin-bottom: 34rpx;
	}

	.tab-container {
		width: 392rpx;
		height: 77rpx;
		@include between;

		.tab-item {
			width: 172rpx;
			height: 77rpx;
			@include betweenColumn;

			.tabTitle {
				width: 172rpx;
				height: 46rpx;
			}

			.tabActiveLine {
				width: 50rpx;
				height: 12rpx;
			}
		}
	}

	.see-more {
		position: absolute;
		top: 0;
		right: 0;
		font-size: 24rpx;
		color: #666666;

		.more {
			width: 10rpx;
			height: 19rpx;
			margin-left: 28rpx;

		}
	}

	.container-body {
		width: 100%;
		height: auto;
	}
	.share-btn {
		width: 20rpx;
		height: 20rpx;
		opacity: 0;
	}
</style>
