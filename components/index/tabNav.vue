<template>
	<view class="tabNav p-tb-10">
		<!-- 头 -->
		<view class="flex ">
			<view class="box flex jcc" v-for="(item,index) in data" :key='index' @click="gotoOne(item.item.jump_url)">
				<view class="t-a-c">
					<view class="font-s-18 font-w-7">{{item.item.title}}</view>
					<view class="sub">{{item.item.subtitle}}</view>
					<image :src="item.item.pic_url1" mode="" class="img"></image>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			tabNav: {
				type: Object
			}
		},
		data() {
			return {
				data: ''
			}
		},
		methods: {

			gotoOne(e){
				// console.log(e)
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
			this.data = this.tabNav.items
			// console.log(this.tabNav)
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
	.tabNav {
		background-color: #FFFFFF;
		border-radius: 15rpx;
		margin: 20rpx 0;

		.box {
			width: 25%;
			margin-right: 5rpx;

			.sub {
				font-size: 12px;
				color: #D9B782;
			}

			.img {
				width: 100%;
				height: 150rpx;
			}
		}

	}
</style>
