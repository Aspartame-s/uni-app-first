<template>
	<view class="default-cointainer">
		<image src="../../static/img/quesheng@2x.png" mode=""></image>
		<span>这里暂时什么都没有哦～</span>
	</view>
</template>

<script>
	export default {
		name: 'default-component'
	}
</script>

<style lang="scss">
	.default-cointainer {
		width: 100%;
		height: auto;
		padding: 20rpx 0;
		@include centerColumn
		image {
			width: 198rpx;
			height: 170rpx;
			margin-bottom: 22rpx;
		}
		span {
			color: #333;
			font-size: 28rpx;
		}
	}
</style>