<template>
	<view class="timeLimt p-10">
		<!-- 头 -->
		<view class="flex jcsb p-b-10 ">
			<view class="flex">
				<view class="font-s-18 font-w-7 mr-5">
					限时购
				</view>
				<view class="font-s-12 flex ">
					<view class="mr-5">
						10点场
					</view>
					<view class="flex" v-if="hour<=10">
						<view class="h">{{h}}</view>:
						<view class="h">{{m}}</view>:
						<view class="h">{{s}}</view>
					</view>
					<view v-else class="font-c-red">
						秒杀已结束
					</view>
					
				</view>
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
		<!-- 内容 -->
		<scroll-view scroll-x="true" class="scroll">
			<view class="flex">
				<!-- 单个 -->
				<view class="" v-for="(a,b) in timeLimit.goods" :key='b' @click="gotoOne(a.item.jump_url)">
					<image :src="a.item.imgs.img_square" mode="" class="goods-img"></image>
					<view class="">
						<text class="font-c-red font-w-7 mr-5">￥{{a.item.flash_price/100}}</text>
						<text class="font-c-gray del-line">￥{{a.item.market_price/100}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	export default {
		components: {},
		props: {
			timeLimit: {
				type: Object
			}
		},
		data() {
			return {
				h: '00',
				m: '00',
				s: "00",
				hour:dayjs().hour(),
				// 当前日期的十点
				times: dayjs().set('hour', 10).set('minute', 0).set('second', 0).set('millisecond', 0)
			}
		},
		methods: {
			// 倒计时
			countdown() {
				// 当前小时
				let timeH = dayjs().hour()
				// 差值
				if (timeH < 10) {
					this.h = parseInt(dayjs(this.times).diff(dayjs(), 'hour'))
					this.m = parseInt((dayjs(this.times).diff(dayjs(), 'minute')) % 60)
					this.s = parseInt((dayjs(this.times).diff(dayjs(), 'second')) % 60 % 60)
					if(this.h<10){
						this.h='0'+this.h
					}
					if(this.m<10){
						this.m='0'+this.m
					}
					if(this.s<10){
						this.s='0'+this.s
					}
				} else {
					this.h = "00"
					this.m = "00"
					this.s = "00"
				}
			},
			goto(){
				// #ifndef MP-WEIXIN
				window.open(this.timeLimit.jump_url)
				// #endif
				// #ifdef MP-WEIXIN
				// 复制
				uni.setClipboardData({
					data: this.timeLimit.jump_url,
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
			this.countdown()
			setInterval(this.countdown, 1000)
			// console.log(this.timeLimit)
		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {

		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.timeLimt {
		background-color: #FFFFFF;
		border-radius: 15rpx;

		.right {
			width: 40rpx;
			height: 40rpx;
		}

		.h {
			width: 40rpx;
			height: 40rpx;
			line-height: 40rpx;
			text-align: center;
			background-color: #D1B86F;
			color: #FFFFFF;

		}

		.scroll {
			display: flex;
			flex-wrap: nowrap;
			background-color: #FFFFFF;

			.goods-img {
				width: 250rpx;
				height: 250rpx;
				border-radius: 15rpx;
				margin-right: 20rpx;
			}
		}


	}
</style>
