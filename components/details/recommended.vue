<template>
	<view class="recommend">
		<view class="m-tb-10 t-a-c color">
			为你推荐

		</view>
		<swiper :indicator-dots="true" indicator-active-color="#e0A60A" @change='change' class="re-box"
			:current='current'>

			<swiper-item v-for="(item,index) in data" :key='index'>

				<view class=" flex flex-wrap" @touchmove="move" >
					<view class="width-30 name " v-for="(item1,index1) in item" :key='index1'
						@click.stop="go(item1.data.goods.gid)">
						<view class="">
							<image :src="item1.data.goods.imgSquare" mode="" class="img"></image>
						</view>
						<view class="p-5 ellipsis-2" style='height: 80rpx;'>
							{{item1.data.goods.name}}
						</view>
						<view class="font-w-7 font-c-red p-5 mb-10">
							￥{{item1.data.goods.priceMin/100}}
						</view>
					</view>
				</view>

			</swiper-item>

		</swiper>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {

		},
		data() {
			return {
				// 排行榜
				data: [],

				// 轮播的页数
				offset: 0,
				// 每页数据
				limit: 6,
				current: 0
			}
		},
		methods: {
			//推荐
			getData() {
				this.$api.goods.recommend(7, this.offset, this.limit).then(res => {
					// console.log(res)
					this.data.push(res.data.recommendResponseList)
				})
			},
			getData1() {
				this.$api.goods.recommend(7, this.offset, this.limit).then(res => {
					// console.log(res)
					if(res.data.recommendResponseList.length!==0){
						this.data.push(res.data.recommendResponseList)
					}
					
				})
			},
			// 去详情
			go(e) {
				// console.log(e)
				uni.navigateTo({
					url:`/pages/details/goodsDetails?gid=${String(e)}`
				})
		
			},
			// 用户滑动事件
			change(e) {
				// console.log(e)
				if(e.detail.current===this.data.length-1){
					this.offset++
					this.getData()
				}
				if(this.offset===6){
					return
				}
			},
			scroll() {
				// console.log(111)
			},
			move(e){
				// console.log(e)
				// console.log(2222)
			}
		},
		mounted() {
			this.getData()
			this.offset++
			this.getData1()

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
	.recommend {
		.re-box {
			height: 750rpx;
			margin-bottom: 20rpx;
		}

		.img {
			width: 100%;
			height: 200rpx;
		}

		.color {
			color: #BBA68A;
			border-bottom: 2rpx solid #BBA68A;
			width: fit-content;
			padding-bottom: 15rpx;
		}

		.name {
			height: 380rpx;
			margin:auto;
		}
	}
</style>
