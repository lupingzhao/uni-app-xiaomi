<template>
	<view class="raise ">
		<!-- 头 -->
		<view class="head flex jcsb " :style="{ 'background-image': 'url(' +raise.config.card_bg_image + ')' }">
			<view class="font-s-18 font-w-7">
				微淘众筹
			</view>
			<view class="flex " @click="gotoRaise">
				<view class="">
					更多
				</view>
				<image src="../../static/icon/arrow_right.png" mode="" class="right"></image>
			</view>
		</view>

		<!-- body -->
		<view class="p-10 flex flex-wrap jcsb">
			<view class="body1 mb-10" :class="b===0?'box1':'box2'" v-for="(a,b) in raise.items" :key='b' @click="gotoOne(a.item.jump_url)">
				<view class="">
					<view class="font-s-16 p-tb-5">
						{{a.item.name}}
					</view>
			
					<view class="flex jcsb a-i-fs">
						<view class="width-60">
							<view class="bgc ellipsis p-5 " v-if="b===0">
								{{a.item.summary}}
							</view>
							<view class="font-c-red font-s-14">
								￥{{a.item.market_price/100}}
							</view>
						</view>
						<view class="width-100">
							<image :src="a.item.pic_url" mode="" class="goods-img"></image>
						</view>
					</view>
					<view class="">
						<image :src="a.item.label_url" mode="" class="label mr-5"></image>
						支持人数<text class="font-c">{{a.item.saled_count}}</text> 
						<text v-if="b===0" >/完成度<text class="font-c">{{a.item.progress}}%</text></text>
					</view>
					<view class="caitiao">
						
					</view>
				</view>
	
		</view>
		

		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			raise: {
				type: Object
			}
		},
		data() {
			return {}
		},
		methods: {
			// 众筹
			gotoRaise(){
				// #ifndef MP-WEIXIN
				window.open(this.raise.jump_url)
				// #endif
				// #ifdef MP-WEIXIN
				// 复制
				uni.setClipboardData({
					data: this.raise.jump_url,
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
			// console.log(this.raise)
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
	.raise {
		border-radius: 20rpx;
		overflow: hidden;
		background-color: #FFFFFF;

		.head {
			// background: no-repeat;
			background-size: contain;
			// color: #FFF9E3;
			padding: 20rpx;

			.right {
				width: 40rpx;
				height: 40rpx;
			}
		}

		.body1 {
			
			width: 49%;
			.bgc {
				background-color: #FFF9E3;
			}
			.label{
				width: 30rpx;
				height: 30rpx;
			}
			.width-60{
				width: 69%;
			}
			.goods-img{
				width: 100%;
				height: 250rpx;
			}
			.font-c{
				color: #D1B29C;
			}
			.caitiao{
				margin: 10rpx 0;
				height: 5rpx;
				 background-image: linear-gradient(to right, yellow , red);	
			}
			
		}
		.box1{
			width: 100% !important;
		}
	}
</style>
