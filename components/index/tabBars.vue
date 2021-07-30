<template>
	<view class="tabBars">
		<u-sticky :offset-top="top">
			<scroll-view scroll-x="true" class="scroll p-tb-10" @scroll="scroll">
				<view class="flex p-lr-10 ">
					<view class="box flex jcc" v-for="(item,index) in tabBars" :key='index'
						@click="change(index,item.query_id)">
						<view class="t-a-c title" :class="selectindex===index?'select':'' ">
							<view class="">
								<text v-if="index===1">618</text>
								<text v-else>{{item.tabConfig.title}}</text>
							</view>
							<view class="">{{item.tabConfig.subtitle}}</view>
							<view class="m-c m-t-5 " :class="selectindex===index?'select-line':'select-line1'"></view>
						</view>
						<view class="line" v-if="index!==tabBars.length-1"></view>
					</view>

				</view>

			</scroll-view>
		</u-sticky>
		<!-- 内容 -->
		<scrollContent :data="data"  @scroll='scroll'></scrollContent>

	</view>

</template>

<script>
	import scrollContent from "../scrollContent.vue"
	export default {
		components: {
			scrollContent
		},
		props: {
			tabBars: {
				type: Array
			}
		},
		data() {
			return {
				// #ifdef MP-WEIXIN
				top: 130,
				// #endif
				// #ifndef MP-WEIXIN
				top: 8,
				// #endif			
				selectindex: 0,
				page: 0,
				queryid: '',
				data: [],
			}
		},
		methods: {
			// 触底
			scroll(e) {
				// 如果使用此方法，请自行增加防抖处理
				this.page++
				this.getData()
			},
			// 分类切换
			change(index, id) {
				this.selectindex = index
				this.queryid = id
				this.data = []
				this.page = 1
				this.getData()
				// console.log(id)
			},
			// 请求分类的数据
			getData() {
				// 获取内容
				this.$api.index.list(this.page, this.queryid).then(res => {
					// console.log(res)
					this.data = this.data.concat(res.data.feeds.items)
					// console.log(this.data)
				})
			}
		
		},
		mounted() {
			// console.log(this.tabBars)
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
	.tabBars {
		// background-color: #F1F1F1;

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

		.select-line {
			background-color: #C30D23;
			width: 60rpx;
			height: 5rpx;
		}

		.select-line1 {
			background: none;
			width: 60rpx;
			height: 5rpx;
		}

		.select {
			font-size: 16px;
			font-weight: 700;
			color: #C30D23 !important;
		}
	}
</style>
