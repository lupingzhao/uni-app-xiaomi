<template>
	<view>
		<scroll-view scroll-y="true" style="height: 100vh;" @scrolltolower="scroll" >
			<view class="content flex flex-wrap p-lr-10 jcsb">
				<view @click="goDetails(item1.data.goods.gid)" class="width-48 box " v-if="item1.data.goods"
					v-for="(item1,index1) in data" :key='index1'>
			
						<image :src="item1.data.goods.imgSquare" mode="" class="goods"></image>
						<!-- 标签 -->
						<view class="flex tab width-fit">
							<view class="tab-img mr-5 font-s-12 " :class="b===0?'bgc1':'bgc2'"
								v-for="(a,b) in item1.data.goods.labels" :key='b'>
								{{a.text}}
							</view>
						</view>
						<view class="p-lr-10 m-t-5 font-s-14 ellipsis">
							{{item1.data.goods.name}}
						</view>
						<view class="p-lr-10 m-t-5 font-s-12 font-c-gray ellipsis">
							{{item1.data.goods.newCname2}}
						</view>
						<view class="flex jcsb p-lr-5 m-t-10">
							<view class="">
								<text class="font-c-red">￥{{item1.data.goods.priceMin/100}}</text>
								<text class="font-c-gray del-line">￥{{item1.data.goods.marketPrice/100}}</text>
							</view>
							<view class="">
								<image src="../static/icon/menu/mini_menu.png" mode="" class="menu"></image>
							</view>
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
			data: {
				type: Array
			},

		},
		data() {
			return {}
		},
		methods: {
			// 触底
			scroll(e) {
				this.$emit('scroll')	
			},
			// 去详情
			goDetails(e) {
				// console.log(e)
				uni.navigateTo({
					url: `/pages/details/goodsDetails?gid=${e}`
				})
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
	.scroll {
		display: flex;
		flex-wrap: nowrap;
		background-color: #FFFFFF;
	}

	.box {
		.title {
			color: #333333;
			width: 150rpx;
		}

	}

	.content {
		padding-top: 20rpx;
		background-color: #F1F1F1;

		.box {
			border-radius: 15rpx;
			overflow: hidden;
			background-color: #FFFFFF;
			border: 2rpx solid #F8F8F8;
			margin: 10rpx 0;
			padding-bottom: 15rpx;
		}

		.menu {
			width: 30rpx;
			height: 10rpx;
		}

		.goods {

			width: 100%;
			height: 250rpx;
		}

		.tab {
			position: absolute;
			transform: translateY(-130%);

			.tab-img {
				padding: 5rpx;
				border-radius: 10rpx;
			}

			.bgc1 {
				background-color: #d96b6c;
			}

			.bgc2 {
				background-color: #FF0000;

			}

		}
	}
</style>
