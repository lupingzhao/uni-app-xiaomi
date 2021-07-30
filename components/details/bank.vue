<template>
	<view class="back">
		<view class="flex jcsb p-10">
			<view class="flex">

				<image :src="bank.brandLogo" mode="" class="brandLogo"></image>
				<view class="m-l-5">
					<view class="mb-10 font-w-7">
						{{bank.brandName}}
					</view>
					<view class="">
						{{bank.brandSlogan}}
					</view>
				</view>
			</view>
			<view class="dp" @click="go(bank.jumpURL)">
				进入店铺 &nbsp;>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			bank: {
				type: Object
			}
		},
		data() {
			return {

			}
		},
		methods: {
			go(e) {
				// #ifndef MP-WEIXIN
				window.open(e)
				// #endif
				// #ifdef MP-WEIXIN
				// 复制
				uni.setClipboardData({
					data: e,
				});
				// #endif
			}
		},
		mounted() {
			// console.log(this.bank)
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
	.back {
		.brandLogo {
			width: 100rpx;
			height: 100rpx;
		}

		.dp {
			color: #F0AD4E;
		}
	}
</style>
