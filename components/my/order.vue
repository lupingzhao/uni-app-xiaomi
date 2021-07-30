<template>
	<view class="order mb-10">
		<view class="">

			<view class="flex jcsb p-10">
				<view class="font-w-7 ">
					我的订单
				</view>
				<view class=" font-s-12 font-c-gray" @click="goto(0)">
					全部订单 &nbsp;>
				</view>
			</view>
			<!-- 我的订单 -->
			<view class="flex jcsa">
				<view class="flex-1 " @click="goto(1)">
					<view class="flex jcc">
						<image src="../../static/user/daifukuan.png" mode="" class="dfk"></image>
					</view>
					<view class="t-a-c">
						待付款
					</view>
				</view>
				<view class="flex-1 " @click="goto(2)">
					<view class="flex jcc">
						<image src="../../static/user/daishouhuo.png" mode="" class="dfk"></image>
					</view>
					<view class="t-a-c">
						待收货
					</view>
				</view>
				<view class="flex-1 " @click="goto(3)">
					<view class="flex jcc">
						<image src="../../static/user/daipingjia.png" mode="" class="dfk"></image>
					</view>
					<view class="t-a-c">
						待评价
					</view>
				</view>
				<view class="flex-1 " @click="goto(4)">
					<view class="flex jcc">
						<image src="../../static/user/shouhou.png" mode="" class="dfk"></image>
					</view>
					<view class="t-a-c">
						退款/售后
					</view>
				</view>
			</view>

		<!-- 登陆提示 -->
		<loginToast  ref="content"></loginToast>

		</view>
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
				// 登陆提示
				show:false
			}
		},
		methods: {
			// 页面跳转
			goto(e){
				// #ifdef MP-WEIXIN
				if(this.$store.state.user){
					uni.navigateTo({
						url:`/pages/my/myOrder?index=${e}`
					})
				}else{
					this.$refs.content.show=true
				}
				// #endif
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					url:`/pages/my/myOrder?index=${e}`
				})
				// #endif
				
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
	.order {
		.dfk {
			width: 100rpx;
			height: 100rpx;
		}
	}
</style>
