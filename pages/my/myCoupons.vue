<template>
	<view class="myCoupons">
		<!--  -->
		<!-- #ifndef MP-WEIXIN -->
		<u-navbar title="优惠券"></u-navbar>
		<!-- #endif -->
		<view class="">

			<!-- 导航栏 -->
			<u-tabs name="cate_name" :list="list" :is-scroll="false" :current="current" @change="change"></u-tabs>

			<!-- 内容 -->
			<view class="p-10">
				<view class=" box  mb-10 " v-for="(item,index) in list1" :key='index'>
					<!-- :style="{'background': 'url('+ww+')'}"> -->
					<!-- 头部 -->
					<view class=" b-radius-10 flex">
						<view class=" head">
							<image v-if="current===0" src="../../static/usable_left.png" mode=""></image>
							<image v-else src="../../static/disabled_left.png" mode=""></image>
						</view>
						<view class="l-box mr-10 flex jcc">
							<view class="">
								<view class="font-s-18 font-c-w mb-10 t-a-c flex jcc width-100">
									￥{{item.couponDesc.valueDesc}}
								</view>
								<view class="font-c-w">
									买满{{item.bottomPrice/100 }}可用
								</view>
							</view>

						</view>
						<view class="r-box font-s-12">
							<view class="mb-10">
								{{item.couponDesc.nameDesc}}
							</view>
							<view class="flex jcsb">
								<view class="mr-5">
									有效期至{{item.endTime}}
								</view>
								<view class="" v-if="current===0" @click="go(item.target)">
									<u-button v-if="(item.target)" type="warning" size="mini">去使用</u-button>
								</view>
							</view>
						</view>
					</view>
					<!-- 限制 -->
					<view class="m-tb-10 pl-10 font-c-gray font-s-12">
						{{item.couponDesc.scopeDesc}}
					</view>
				</view>

			</view>

		</view>



	</view>



</template>

<script>
	import dayjs from 'dayjs'
	export default {
		components: {},
		props: {},
		data() {
			return {
				current: 0,
				list: [{
						cate_name: '未使用'
					}, {
						cate_name: '不可用'
					},
					// {
					// 	cate_name: '待评价',
					// 	cate_count: 5
					// },
				],
				list1: '',
				type: 0
			}
		},
		methods: {
			getData() {
				this.$api.searchView.user(this.type).then(res => {
					// console.log(res)
					this.list1 = res.data.couponInfos
					this.list1.map(a => {
						a.endTime = dayjs(a.endTime).format('YYYY.MM.DD/HH:mm')
					})
				})
			},
			// 标签切换事件
			change(e) {
				this.current = e
				this.list1 = []
				this.type = e
				this.getData()
			},
			// 去使用
			go(e) {
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
	.myCoupons {
		.box {
			margin-bottom: 15rpx;

			.l-box {
				width: 30%;
				height: 200rpx;
			}

			.r-box {
				width: 68%;
			}
		}
	}

	.head {
		width: 30%;
		position: absolute;
		z-index: -2;

		image {
			width: 100%;
			height: 200rpx;
		}
	}
</style>
