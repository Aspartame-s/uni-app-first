<template>
	<view class="container" :style="{'paddingBottom': paddingBottom}">
		<image src="https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view/img/huodongjijiangkaiqi.png" class="plazaImg"></image>
	</view>
</template>

<script>
	import global from '../../common/global.js';
	export default {
		data() {
			return {
				paddingBottom: global.paddingBottom,
			}
		},
		methods: {
			
		},
		onShow()  {
						this.setTabBarIndex(2);
				 }
	}
</script>

<style>
	.container {
		background-color: #fefbeb;
	}
	.plazaImg{
	  width: 100vw;
	  height: 1624rpx;
	}
</style>
