<template>
	<view class="funtion">
		<view class="flex jcsb p-10 m-t-10">
			<view class="font-w-7 ">
				我的功能
			</view>

		</view>
		<!-- 我的功能 -->
		<view class="flex jcsa">
			<view class="flex-1 " @click="goto(1)">
				<view class="flex jcc">
					<image src="../../static/user/youhuiquan.png" mode="" class="dfk"></image>
				</view>
				<view class="t-a-c">
					<text v-if="count">{{count}}张优惠券</text>
					<text v-else>无优惠券</text>
				</view>
			</view>
			<view class="flex-1 " @click="goto(2)">
				<view class="flex jcc">
					<image src="../../static/user/hongbao.png" mode="" class="dfk"></image>
				</view>
				<view class="t-a-c">
					我的红包
				</view>
			</view>
			<view class="flex-1 " @click="goto(3)">
				<view class="flex jcc">
					<image src="../../static/user/shoucang.png" class="dfk"></image>
				</view>
				<view class="t-a-c">
					我的收藏
				</view>
			</view>
			<view class="flex-1 " @click="goto(4)">
				<view class="flex jcc">
					<image src="../../static/user/liulanjilu.png" mode="" class="dfk"></image>
				</view>
				<view class="t-a-c">
					我的足迹
				</view>
			</view>
		</view>
     
	 <!-- 登陆提示 -->
	 
	 	<loginToast :show="show" ref="content"></loginToast>
	 
	</view>

</template>

<script>
	import loginToast from './loginToast.vue'
	export default {
		components: {
			loginToast
		},
		props: {},
		data() {
			return {
				// 动态本地图片用绝对路径
				url: [
					'/pages/my/myCoupons?index=0',
					'',
					'/pages/my/myCollection?index=1',
					'/pages/my/myLook?index=2'
				],
				count:'',
				// 登陆提示
				show:false
			}
		},
		methods: {
			// 页面跳转
			goto(e) {
				// #ifdef MP-WEIXIN
				if(this.$store.state.user){
					uni.navigateTo({
						url: this.url[e - 1]
					})
					// console.log(this.$refs.content.show);
				}else{
					this.$refs.content.show=true
				}
				// #endif
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url: this.url[e - 1]
				})
				// #endif
				
				
			},
			// 
			// 优惠券
			coupons() {
				this.$api.searchView.couponCount().then(res => {
					// console.log(res)
					this.count=res.data.count
				})
			},
		
		},
		mounted() {
			this.coupons()
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
	.funtion {
		.dfk {
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>
