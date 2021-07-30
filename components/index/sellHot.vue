<template>
	<view class="sellHot m-tb-10">
		<view class="flex jcsb p-b-10">
			<view class="font-s-18 font-w-7 ">
				{{sellHot.title}}
				<text class="font-s-12 font-c-gray font-w-4 m-l-5">{{sellHot.subtitle}}</text>
			</view>
			<view class="flex " @click="goto">
				<view class="mr-5">
					更多
				</view>
				<view class="flex ">
					<image src="../../static/icon/arrow_right.png" mode="" class="right"></image>
				</view>
			</view>
		</view>
		<scroll-view scroll-x="true" style="width: 100%;" class="scroll">
			<view class="flex ">
				<!-- 小盒子 -->
				<view class="goods pos-rel" v-for="(a,b) in data" :key='b' @click="gotoOne(a.item.jump_url)">
					<view class=" flex jcc a-i-c paimin">
						<image src="../../static/paimin.png" mode="" class="bgc-img"></image>
						<view class="pos-num font-c-red">
							{{b+1}}
						</view>
					</view>
					<view class="">
						<image :src="a.item.pic_url" mode="" class="goods-img"></image>
					</view>
					<view class="p-5 width-100 recommend ellipsis font-s-12 font-c-gray">
						{{a.item.recommend}}
					</view>
					<view class="name font-s-12">
						{{a.item.name}}
					</view>
				</view>
			</view>
		</scroll-view>


	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			sellHot: {
				type: Object
			}
		},
		data() {
			return {
				data: ''
			}
		},
		methods: {
			// 热销
			goto(){
				// #ifndef MP-WEIXIN
				window.open(this.sellHot.jump_url)
				// #endif
				// #ifdef MP-WEIXIN
				// 复制
				uni.setClipboardData({
					data: this.sellHot.jump_url,
				});
				// #endif
			},
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
			// console.log(this.sellHot)
			this.data = this.sellHot.items
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
	.sellHot {

		background-color: #FFFFFF;
		padding: 20rpx;
		border-radius: 15rpx;

		.right {
			width: 40rpx;
			height: 40rpx;
		}

		.paimin {
			position: absolute;
			left: -5rpx;

			.bgc-img {
				width: 60rpx;
				height: 60rpx;
			}

			.pos-num {
				position: absolute;
			}
		}

		.scroll {
			display: flex;
			flex-wrap: nowrap;
			background-color: #FFFFFF;
		}

		.goods {
			width: 250rpx;
			margin-left: 10rpx;
			background-color: #f5f5f5;

			.recommend {
				background-color: #FF5A1C;
			}

			.name {
				padding: 10rpx 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #FFE1B5;
				border-bottom-right-radius: 15rpx;
				border-bottom-left-radius: 15rpx;
			}

			.goods-img {
				width: 250rpx;
				height: 250rpx;
			}
		}
	}
</style>
