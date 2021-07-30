<template>
	<!-- 		顶部导航栏 -->
	<view class="head" :class="!isShow?'BGC':''">
		<!-- 非首页的顶部导航栏 -->
		<view  v-if="isShow">
			<u-navbar :is-back="false" :title="title" @custom-back='goback'>
			</u-navbar>
		</view>

		<!-- 顶部导航栏 -->
		<view class="headNav flex " v-else>
			<view class="left">
				<slot name="left"></slot>
			</view>
			<view class="center">			
				<slot name="center">
				</slot>
			</view>
			<!-- 微信不可看 -->
		
			<view class="right">
				
				<slot name="right"></slot>
			</view>
	
		</view>


	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			isShow: {
				type: Boolean,
				default: true
			},
			title: {
				type: String
			}
		},
		data() {
			return {
				// background:{
				// 		background: '#000000' 
				// }

			}
		},
		methods: {
			goback() {
				// console.log(1111)
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.head{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 99;
		
	}
	.BGC{
		background-color: #FF846F;
		// background:url('../static/bg_searchbar.png')
	}
	.center{
		width: 70%;
	}
	.left{
		width: 15%;
	}
	.right{
		width: 15%;
	}
	/* #ifdef MP-WEIXIN */
	.center{
		width: 60%;
	}
	/* #endif */
	.headNav {
		height: 88rpx;
		padding: 0 15rpx;
	
		background-color: rbg(0, 0, 0);
		line-height: 88rpx;
	

	}

	/* #ifdef  MP-WEIXIN */
	.headNav {
		height: 130rpx;
		padding: 15rpx;
		/* #ifdef MP-WEIXIN */
		padding: 40rpx 15rpx 15rpx;
		/* #endif */
		line-height: 170rpx;
		background-color: rbg(0, 0, 0);
	}
	/* #endif */
</style>
