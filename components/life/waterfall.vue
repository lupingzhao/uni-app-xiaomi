<template>
	<view class="wrap">

		<scroll-view scroll-y="true" @scrolltolower="scroll" style="height: 100vh;">
			<u-waterfall v-model="flowList" ref="uWaterfall">
				<template v-slot:left="{leftList}">
					<view class="demo-warter width-50"  v-for="(item, index) in leftList" :key="index" @click="goto(item.detailUrl)">

						<u-lazy-load threshold="-450" border-radius="10" :image="item.pic" :index="index"></u-lazy-load>
						<view class="demo-title p-5 font-w-7 width-100 ">
							{{item.title}}
						</view>


						<view class="demo-shop m-tb-10 flex jcsb ">
							<view class="flex width-48">
								<image :src="item.author.avatar" mode="" class="tx mr-5"></image>
								<view class=" ellipsis name">
									{{item.author.nickname}}
								</view>
							</view>
							<view class="ellipsis width-48">
								{{item.readingNum}}阅读
							</view>
						</view>

					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter  width-50" v-for="(item, index) in rightList" :key="index" @click="goto(item.detailUrl)">
						<u-lazy-load threshold="-450" border-radius="10" :image="item.pic" :index="index"></u-lazy-load>
				
						<view class="demo-title p-5 font-w-7  ">
							{{item.title}}
						</view>

						<view class="demo-shop m-tb-10 flex jcsb ">
							<view class="flex ">
								<image :src="item.author.avatar" class="tx mr-5"></image>
								<view class=" ellipsis name ">
									{{item.author.nickname}}
								</view>
							</view>
							<view class="ellipsis width-48">
								{{item.readingNum}}阅读
							</view>
						</view>

					</view>
				</template>
			</u-waterfall>
		</scroll-view>


	</view>

</template>

<script>
	export default {
		components: {

		},
		props: {
			waterfall: {
				type: Number
			}
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				flowList: [],
				scrollTop: 0
			}
		},
		methods: {
			getData() {

				this.$api.life.LifePlate(this.waterfall, this.page, this.pageSize).then(res => {
					// console.log(res.data)
					this.flowList = this.flowList.concat(res.data)
				})
			},
			// 清空显示数据
			clear() {
				this.$refs.uWaterfall.clear();
			},
			// 触底
			scroll() {
				// console.log(111)
				this.page++
				this.getData()
			},
			// 清空 flowList
			remove() {
				this.flowList = []
				this.page = 1
				this.pageSize = 10
				this.clear()
				this.getData()

			},
			// 跳转
			goto(e){
				// #ifndef MP-WEIXIN
				window.open(e)
				// #endif
				// #ifdef MP-WEIXIN
				// 复制
				uni.setClipboardData({
					data: e,
				});
				// #endif
			},
		},
		mounted() {
			this.getData()
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
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #F1F1F1;
		padding: 8px;
		position: relative;
	}

	.wrap {
		.demo-title {
			font-size: 30rpx;
			margin-top: 5px;
		}
	}

	.tx {

		width: 60rpx;
		height: 60rpx;
		border-radius: 100%;
	}

	.img2 {
		width: 100rpx;
	}

	.name {
		width: 100rpx;
	}
</style>
