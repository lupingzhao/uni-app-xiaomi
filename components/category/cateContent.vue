<template>
	<view class="contents height-100">
		<scroll-view scroll-y="true" style="height: 100vh;">
			<!-- 头部图片 -->
			<view class="banner m-t-5">
				<image :src="levelData2.banner" mode="" v-if="levelData2.banner"></image>
			</view>
			<!-- {{levelData2}} -->
			<!-- 下方内容 -->
			<view class="box width-100" v-for="(item,index) in levelData2.children" :key='index'>
				<view class="head  font-s-16 font-w-7">
					{{item.name}}
				</view>
				<view class="flex flex-wrap width-100">
					<view class="box-goods " v-for="(a,b) in item.children" :key='b' @click="goto(a.smallImgCard.name)"
						v-if="a.smallImgCard">
						<image v-if="a.smallImgCard.badge" :src="a.smallImgCard.badge" mode="" class="badge"></image>
						<view class="flex jcc">
							<image :src="a.smallImgCard.img" mode="" class="img"></image>
						</view>
						<view class="t-a-c ellipsis-2" style="height: 80rpx;">
							{{a.smallImgCard.name}}
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
			levelData2: {
				type: Object
			}
		},
		data() {
			return {}
		},
		methods: {
			// 去商品列表
			goto(e) {				
				// console.log(e)
				uni.navigateTo({
					url:`/pages/list/goodsList?word=${e}`
				})
			}
		},
		mounted() {
			// console.log(this.levelData2)
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
	.contents {
		/* #ifndef MP-WEIXIN */
		width: 100%;
		/* #endif */
		padding: 0 15rpx 15rpx;
		margin-left: 170rpx;
		/* #ifdef MP-WEIXIN */
		width: 77%;
		/* #endif */

		.banner {
			/* #ifndef MP-WEIXIN */
			margin-top: 100rpx;

			/* #endif */
			image {
				width: 100%;
				height: 200rpx;
			}
		}

		.box {
			background-color: #FFFFFF;
			border-radius: 20rpx;
			margin: 15rpx 0;


			.head {
				padding: 15rpx 20rpx;
			}

			.box-goods {
				position: relative;
				width: 32%;
				margin-bottom: 10rpx;
				margin-left: 1%;

				.ellipsis-2 {
					overflow: hidden;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.badge {
					width: 40rpx;
					height: 40rpx;
					position: absolute;
					top: 5rpx;
					left: 5rpx;
					z-index: 2;
				}

				.img {
					width: 150rpx;
					height: 150rpx;

				}
			}

		}


	}
</style>
