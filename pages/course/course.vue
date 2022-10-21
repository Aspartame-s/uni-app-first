<template>
	<view class="container" :style="{'paddingBottom': paddingBottom}">
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
		<view class="middle-link">
			
		</view>
		<view class="course-container">
			<view class="base-title">
				<view class="base-icon"></view>
				全部课程
			</view>
			<view class="categoryList">
				<view class="courseClassfiy" v-for="(item, index) in courseCategoryList" :key="index"
					@click="selectCategory(item.id)">
					<image :src="item.imgUrl" class="courseImg"></image>
					<view style="text-align: center;"
						:class="['catetory-name', categoryId == item.id ? 'active-category-name' : '']">
						{{item.courseCategoryName}}
					</view>
					<view class="active-ponit" v-show="categoryId == item.id"></view>
				</view>
			</view>
			<div class="course-detail-container">
				<col-list :hasMargin="true" v-for="(item, index) in courseList" :key="index" :lessonInfo="item"
					:hasVideo="false" :hasLeftTopTip="false" @click.native="enterCourseDetail(item.id)" :isHandle="false"></col-list>
			</div>
		</view>

	</view>
</template>

<script>
	import colList from '../../components/colList/colList.vue';
	import {
		getBannerList,
		getCourseCategoryList,
		getCourseListWithCategoryId
	} from '../../utils/api/lesson.js';
	import global from '../../common/global.js';
	export default {
		components: {
			colList
		},
		data() {
			return {
				paddingBottom: global.paddingBottom,
				bannerList: [],
				showDocts: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				color: '#D8D8D8',
				activeColor: '#EB9A15',
				courseCategoryList: [],
				categoryId: '1',
				courseList: []
			}
		},
		methods: {
			getBannerList(route) {
				getBannerList(route).then(res => {
					// console.log(res)
					this.bannerList = res.data
				})
			},
			//获取课程类型
			getCourseCategoryList() {
				getCourseCategoryList().then(res => {
					// console.log(res)
					this.courseCategoryList = res.data
				})
			},
			//选择课程类型
			selectCategory(id) {
				this.categoryId = id
				this.getCourseListWithCategoryId(this.categoryId == 1 ? '' : this.categoryId)
			},
			//课程分页列表(根据课程类别id获取课程)
			getCourseListWithCategoryId(id) {
				getCourseListWithCategoryId(id).then(res => {
					// console.log(res)
					this.courseList = res.data.records
				})
			},
			//进入课程详情
			enterCourseDetail(courseId) {
				// console.log('123')
				uni.navigateTo({
					url: `/pages/courseDetail/courseDetail?courseId=${courseId}`
				})
			}
		},
		mounted() {
			this.getBannerList('course')
			this.getCourseCategoryList()
			this.getCourseListWithCategoryId()
		},
		onShow() {
			this.setTabBarIndex(1);
		}
	}
</script>

<style lang="scss">
	.container {
		min-height: 100vh;
		background-color: #fff;
		display: flex;
		flex-direction: column;

		.base-title {
			width: 100%;
			height: 44rpx;
			display: flex;
			align-items: center;
			margin-bottom: 38rpx;
			font-weight: 500;

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

		.middle-link {
			width: 100%;
			height: 16rpx;
			background-color: #F8F8F8;
		}

		.course-container {
			width: 100%;
			flex-grow: 1;
			background-color: #fff;
			padding: 28rpx 28rpx 20rpx;

			::-webkit-scrollbar {
				width: 0;
				height: 0;
				color: transparent;
			}

			.categoryList {
				width: 100%;
				// padding: 0 18rpx;
				display: flex;
				overflow-x: scroll;

				.courseClassfiy {
					width: 98rpx;
					height: 180rpx;
					flex-shrink: 0;
					// background-color: pink;
					margin-right: 44rpx;
					display: flex;
					flex-direction: column;
					align-items: center;

					&:last-child {
						margin-right: 28rpx;
					}

					.courseImg {
						width: 88rpx;
						height: 88rpx;
					}

					.catetory-name {
						height: 40rpx;
						line-height: 40rpx;
						color: #1E1E20;
						font-size: 28rpx;
						margin-bottom: 14rpx;
					}

					.active-category-name {
						color: #F2B23A;
					}

					.active-ponit {
						width: 10rpx;
						height: 10rpx;
						border-radius: 50%;
						background-color: #F2B23A;
					}
				}
			}

			.course-detail-container {
				width: 100%;
				height: auto;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;
			}
		}


	}
</style>
