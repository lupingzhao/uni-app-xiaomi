<template>
	<view class="more mb-10">
		<view class="flex jcsb p-10 m-t-10">
			<view class="font-w-7 ">
				更多工具
			</view>
		</view>
		<!-- 工具 -->
		<view class="flex  flex-wrap">
			<view class="width-25 mb-10" @click="goto(1)">
				<view class="flex jcc">
					<image src="../../static/user/qianbao.png" mode="" class="dfk"></image>
				</view>
				<view class="t-a-c">
					我的钱包
				</view>
			</view>
			<view class="width-25 mb-10" @click="goto(2)">
				<view class="flex jcc">
					<image src="../../static/user/kefu.png" mode="" class="dfk"></image>
				</view>
				<view class="t-a-c">
					官方客服
				</view>
			</view>
			<view class="width-25 mb-10" @click="goto(3)">
				<view class="flex jcc">
					<image src="../../static/user/yonghufankui.png" mode="" class="dfk"></image>
				</view>
				<view class="t-a-c">
					用户反馈
				</view>
			</view>
			<view class="width-25 mb-10" @click="goto(4)">
				<view class="flex jcc">
					<image src="../../static/user/zizhizhengzhao.png" mode="" class="dfk"></image>
				</view>
				<view class="t-a-c">
					资质证照
				</view>
			</view>
			<view class="width-25 mb-10" @click="goto(5)">
				<view class="flex jcc">
					<image src="../../static/user/xieyiguize.png" class="dfk"></image>
				</view>
				<view class="t-a-c">
					协议规则
				</view>
			</view>
			<view class="width-25 mb-10" @click="goto(6)">
				<view class="flex jcc">
					<image src="../../static/user/xianxiamendian.png" class="dfk"></image>
				</view>
				<view class="t-a-c">
					线下门店
				</view>
			</view>
			<view class="width-25 mb-10" @click="goto(1)">
				<view class="flex jcc">
					<image src="../../static/user/update.png" mode="" class="dfk"></image>
				</view>
				<view class="t-a-c">
					更新日志
				</view>
			</view>
		</view>

		<!-- 登陆提示 -->
		<loginToast ref="content"></loginToast>

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
				show: false
			}
		},
		methods: {
			// 页面跳转
			goto(e) {
				// #ifdef MP-WEIXIN
				if (this.$store.state.user) {
					uni.navigateTo({
						// url:`/pages/my/myOrder?index=&{e}`
					})
				} else {
					this.$refs.content.show = true
				}
				// #endif
				// #ifndef MP-WEIXIN
				uni.navigateTo({
					// url:`/pages/my/myOrder?index=&{e}`
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
	.more {
		.dfk {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>
