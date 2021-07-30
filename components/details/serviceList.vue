<template>
	<view class="serviceList">
		<u-cell-item :arrow="true" arrow-direction="right" @click='serviceList'>
			<template slot="title">
				<view class="flex  ">
					<view class="mr-10 " style="white-space: nowrap;">
						服务
					</view>
					<view class="mr-5 flex  box" v-for="(item,index) in list.serviceList" :key='index'
						v-if="index<=3&&index!==2">
						<image src="../../static/icon/checkbox_check_hollowred.png" mode="" class="img mr-5 "></image>
						<text class="ellipsis width-80">{{item.name}}</text>
					</view>
				</view>
			</template>
		</u-cell-item>

		<!-- 弹出层 -->
		<u-popup mode="bottom" v-model="show1">
			<view class="content p-10">
				<scroll-view scroll-y="true" class="srcoll" style="height: 700rpx;">
					<view class="" v-for="(item,index) in list.serviceList" :key='index' @click="toView(index)">
						<view class="font-s-14 font-w-7 mb-10 ">
							<image src="../../static/icon/checkbox_check_hollowred.png" mode="" class="img mr-5">
							</image>
							{{item.name}}
						</view>
						<view class="m-tb-10  font-s-12 " v-for="(item1,index1) in item.descList" :key='index1'>
							{{index1+1}}:{{item1}}
						</view>
					</view>
				</scroll-view>

			</view>
		</u-popup>
		<!-- 资质 -->


		<view class="warp">
			<u-mask :show="show" @click="colse">
				<view class="warp1">
					<view class="rect" @tap.stop>
						<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000"
							class="swpier">
							<swiper-item v-for="(item,index) in list1" :key='index'>
								<image :src="item" mode="" class="img"></image>

							</swiper-item>

						</swiper>


					</view>
				</view>
			</u-mask>
		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			list: {
				type: Object
			}
		},
		data() {
			return {
				show: false,
				show1: false,
				list1: ''
			}
		},
		methods: {
			serviceList() {
				// console.log(2222)
				this.show1 = true
			},
			// 查看资质,
			toView(e) {
				// console.log(1111)
				if (e === 2) {

					this.show = true
					this.show1 = false
				}
				// console.log(this.show)
			},
			// 关闭
			colse() {
				this.show = false
				this.show1 = true
			}
		},
		mounted() {
			this.list1 = this.list.qualificationPic
			// console.log(this.list1)
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
	.serviceList {
		.img {
			width: 30rpx ;
			height: 30rpx;

		}

		.box {
			min-width: 50rpx;
			max-width: 300rpx;
			width: fit-content;
		}

		.warp {
			.warp1 {
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100%;

				.rect {
					width: 100vw;
					height: 600rpx;

					.img {
						width: 100vw;
						height: 600rpx;
					}

				}

			}

			z-index: 99;
		}
	}

	.swpier {
		height: 600rpx;
	}
</style>
