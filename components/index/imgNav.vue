<template>
	<view class="p-10 flex flex-wrap jcsb imgNav" style="width: 100%;">

		<view class="nav-box" v-for="(item,index) in imgNav.items" :key='index' @click="goto(item)">
			<view class="flex jcc">
				<image :src="item.item.pic_url" mode="" class="m-c"></image>
			</view>
			<view class="t-a-c">
				{{item.item.title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: {
			imgNav: {
				type: Object,
			}
		},
		data() {
			return {}
		},
		methods: {
			goto(e) {
				// console.log(e)
				// #ifndef MP-WEIXIN
				window.open(e.item.jump_url)
				// #endif
				// #ifdef MP-WEIXIN
				// 复制
				uni.setClipboardData({
					data: e.item.jump_url,
				});
				// #endif

			}
		},
		mounted() {
			// console.log(111)
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
	.imgNav {
		background-color: rgb(254, 240, 237);
	}

	.nav-box {
		width: 18%;
		margin: 15rpx 5rpx;

		image {
			width: 100rpx;
			height: 100rpx;
			// position: center center;
		}
	}
</style>
