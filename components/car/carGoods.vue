<template>
	<view class="carGoods p-10">
		<!-- 有数据时 -->
		<view class="bgc-white p-10 b-radius-10">
			<view class="flex jcsb">
				<view class="">
					<u-checkbox shape="circle" v-model='all' @change="checkedAll">
						<text class="font-s-18 font-w-7 p-10">微淘精选</text>
					</u-checkbox>
				</view>
				<view class="flex">
					<image src="../../static/zhuyi.png" mode="" class="img mr-5"></image>
					<view class="font-s-14 font-c-gray">
						满99元免运费
					</view>
				</view>
			</view>


			<view class="flex m-t-10 width-100 ">

				<u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox class="mb-10  p-tb-10 " style='width: 100%;' shape="circle" v-model="item.checked"
						v-for="(item, index1) in data" :key="index1" :label-disabled="true">
						<view class="flex font-s-12 a-i-fs" @click="go(item.gid)">
							<view class="img1 ">
								<image :src="item.goods.picUrl" mode="" class="img2"></image>
							</view>
							<view class="m-l-10 mb-10 box ">
								<view class=" view">
									{{item.goods.name}}
								</view>
								<view class="m-t-5">
									<text v-for="(item1,index1) in item.order" :key='index1'> {{item1}};</text>

								</view>
								<view class="flex jcsb  m-t-10 ">
									<view class=" font-c-red ">
										￥{{item.goods.priceMin/100}}
									</view>
									<view class="">
										<u-number-box :min="1" v-model="item.sum"></u-number-box>
									</view>
								</view>
							</view>
						</view>
					</u-checkbox>
				</u-checkbox-group>
			</view> -->
		</view>
		<!-- 底部 -->
		<view class="flex jcsb bottom p-10 bgc-white">
			<view class="">
				<u-checkbox shape="circle" v-model='all' @change="checkedAll">
					<text class="  p-10">全选</text>
				</u-checkbox>
			</view>
			<view class="flex pr-5">
				<view class="font-c-red mr-5">
					合计：￥{{total.toFixed(2)}}

				</view>
				<view class="js font-c-w" @click="toOrder">
					结算
				</view>
				<view class="del font-c-w" @click="del">
					删除
				</view>
			</view>
		</view>

		<!-- 提示 -->
		<u-toast ref="uToast" />
		<!-- 删除弹框 -->
		<u-modal v-model="show" :content="content" :mask-close-able="true" :show-cancel-button='true'
			confirm-color='#DD524D' confirm-text='删除' title='删除' @confirm='toDel'></u-modal>
	</view>


</template>

<script>
	export default {
		components: {},
		props: {
			data: {
				type: Array,
			}
		},
		data() {
			return {
				all: false,
				sum1: 0,
				// 删除提示
				show: false,
				// 是否有选中商品
				boo: false,
				content: '从购物车删除已选中的商品',
			}
		},
		methods: {
			// 选中任一checkbox时，由checkbox-group触发
			checkboxGroupChange(e) {
				// console.log(this.data)
				if (e.length === this.data.length) {
					this.all = true
				} else {
					this.all = false
				}
				// 是否有选中
				if (e.length > 0) {
					this.boo = true
				} else {
					this.boo = false
				}
				// console.log(this.boo);
			},
			// 全选
			checkedAll() {
				this.all = !this.all
				this.data.map(val => {
					val.checked = this.all;
				})
				if (this.all) {
					this.boo = true
				}
				// console.log(this.all)
			},
			// 去详情
			go(e) {
				uni.navigateTo({
					url: `/pages/details/goodsDetails?gid=${e}`
				})
			},
			// 去结算
			toOrder() {
				// 有选择的商品
				if (this.boo) {
					let order = this.data.filter(a => {
						return a.checked
					})
					let newData = this.data.filter(a => {
						return !a.checked
					})

					if (newData.length > 0) {
						// // 修改本地数据
						uni.setStorageSync('carHistory', newData)
					} else {
						uni.removeStorageSync('carHistory')
					}
					// 修改角标
					this.$store.commit('setCarSum', uni.getStorageSync('carHistory'))
					this.$emit('toast', this.sum1.toFixed(2))
					order = {
						data: order,
						total: this.sum1.toFixed(2),
						crateTime: new Date()
					}
					this.sum1 = 0
					// 调用父组件的请求数据
					this.$emit('getData')
					// 本地存储完成订单
					this.$utils.saveHistory({
						key: 'ALLOrder',
						data: order,
					})
					// uni.setStorageSync(, )			

				} else {
					this.$refs.uToast.show({
						title: `无选中数据`,
						type: 'info',

					})
				}
			},
			// 删除按钮
			del() {
				// 有选中的商品
				if (this.boo) {
					// 弹出选项框
					this.show = true

				} else {
					this.$refs.uToast.show({
						title: `无选中数据`,
						type: 'info',

					})
				}
			},
			// 删除
			toDel() {

				let newData = this.data.filter(a => {
					return !a.checked
				})
				let delData = this.data.filter(a => {
					return a.checked
				})
				if (newData.length === 0) {
					uni.removeStorageSync('carHistory')

				} else {
					// // 修改本地数据
					uni.setStorageSync('carHistory', newData)
				}
				// 修改角标
				this.$store.commit('setCarSum', uni.getStorageSync('carHistory'))

				this.sum1 = 0
				this.$emit('getData')
			}

		},
		mounted() {


		},
		onLoad() {

		},
		onShow() {

		},
		filters: {},
		computed: {
			// 计算总价
			total() {
				this.sum1 = 0
				this.data.map(a => {
					if (a.checked) {
						this.sum1 += a.sum * a.goods.priceMin / 100
						return
					}
				})
				return this.sum1
			},

		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.carGoods {
		.img {
			width: 40rpx;
			height: 40rpx;
		}

		.img1 {

			.img2 {
				width: 200rpx;
				height: 200rpx;
			}
		}

		.box {

			width: 60%;

			.view {
				width: 55vw;
				color: #000;
			}
		}

		// 结算
		.js {
			width: 130rpx;
			text-align: center;
			background-color: #41A863;
			border-radius: 30rpx;
			padding: 20rpx;
		}

		.del {
			width: 130rpx;
			text-align: center;
			background-color: #DD524D;
			border-radius: 30rpx;
			padding: 20rpx;
			margin-left: 10rpx;
		}

		.bottom {
			position: fixed;
			/* #ifndef MP-WEIXIN */
			bottom: 90rpx;
			/* #endif */
			/* #ifdef MP-WEIXIN */
			bottom: 0;
			/* #endif */
			left: 0;
			right: 0;
			z-index: 22;
		}

	}
</style>
