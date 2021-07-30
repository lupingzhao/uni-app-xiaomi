<template>
	<view class="oconeter">
		<!-- 订单内容 -->
		<view class="p-10" v-if="data">
			<view class="mb-10 bgc-low-gray p-10 b-radius-10" v-for="(a1,b1) in data" :key='b1'>
				<view class="p-5 flex jcsb">
					<view class="">
						订单时间：{{a1.crateTime}}
					</view>
					<view class="font-c-red">
						交易已完成
					</view>
				</view>
				<view class="flex a-i-fs p-tb-5" v-for="(item,index) in a1.data" :key='index'>
					<view class="width-30 mr-10">
						<image :src="item.goods.img800s" mode="" class="img"> </image>
					</view>
					<!-- 右边大盒子 -->
					<view class="width-70">
						
						<view class="font-w-7">
							{{item.goods.name}}
						</view>
						<view class="m-tb-10">
							<text v-for="(a,b) in item.order" :key='b'>{{a}} <text
									v-if="b<item.order.length-1">,</text></text>
						</view>
						<view class="">
							<text class="font-c-red font-s-16 font-w-7">￥{{item.goods.priceMin/100}}</text>
							<text class="font-s-12 m-l-5"> X {{item.sum}}</text>
						</view>

					</view>
				</view>
				<view class="t-a-r  font-c-red font-s-14 font-w-7">
					总计：￥{{a1.total}}
				</view>
			</view>

		</view>
		<view class="empt " v-else>
			<u-empty text="暂无数据" mode="car"></u-empty>
		</view>





	</view>




</template>

<script>
	import dayjs from 'dayjs'
	export default {
		components: {},
		props: {
			slect: {
				type: Number,
			}
		},
		data() {
			return {
				list: ['ALLOrder', '待付款', '待收货', '已发货', '退款'],
				data: ''
			}
		},
		methods: {
		},
		mounted() {
			
		},
		onLoad() {
			
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {
			// 监听下标的值
			slect: {
				handler(val) {		
					this.data = this.$utils.getHistory(this.list[val])
					if(this.data){
						this.data.map(a => {
							a.crateTime = dayjs(a.crateTime).format('YYYY年MM月DD日HH时')
						})
					}
					
					// console.log(this.data);
				},
				immediate: true
			},
		},
	}
</script>

<style scoped lang="scss">
	.oconeter {
		.empt {
			height: 300rpx;
		}

		.img {
			width: 100%;
			height: 200rpx;
		}
	}
</style>
