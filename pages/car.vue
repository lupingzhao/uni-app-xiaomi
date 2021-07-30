<template>
	<view class="car">
		<view class="" v-if="login">
			<view class="" v-if="show">
				<!-- 头部 -->
				<view class="head1">
					<image src="../static/static/top-bg.png" mode="" class="img"></image>
					<view class="flex jcc head">
						<view class="font-c-w font-s-18 font-w-7">
							购 物 车
						</view>
					</view>
				</view>
				<!-- 内容 -->
				<view class="m-tb-25 content">
					<carGoods @getData='getData' v-if="data" :data='data' @toast='toast'></carGoods>
				</view>
			</view>

			<view class="empt " v-else>
				<u-empty text="暂无数据" mode="car"></u-empty>
			</view>
			<view class="recommended">
				<recommended></recommended>
			</view>

		</view>

	<!-- 未登录  -->
		<view class="div-center" v-else>
			<u-empty text="检测到用户未登录" mode="permission">
				<template #bottom>
					<u-button type="warning" size="mini" @click='goto'>去登陆</u-button>
				</template>
			</u-empty>
		</view>

		<!-- 提示 订单-->
		<u-toast ref="uToast" />

	



	</view>

</template>

<script>
	import carGoods from '../components/car/carGoods.vue';
	import recommended from '../components/details/recommended.vue'
	export default {
		components: {
			carGoods,
			recommended,
		},
		props: {},
		data() {
			return {
				title: '购物车',
				show: false,
				data: '',
				// #ifndef MP-WEIXIN
				login: true
				// #endif
				// #ifdef MP-WEIXIN
				login: false
				// #endif

			}
		},
		methods: {
			getData() {
				// 获取购物车数据				
				if (this.$utils.getHistory('car')) {
					this.show = true
					this.data = this.$utils.getHistory('car')
					// 设置角标
					if (this.$store.state.carSum.length) {
						uni.setTabBarBadge({
							text: String(this.$store.state.carSum.length),
							// 需要添加角标的导航下标
							index: 3
						})
					}
				} else {
					this.show = false
					// 如果没有数据就移除角标
					uni.removeTabBarBadge({
						index: 3
					})
				}
				// console.log(this.$utils.getHistory('car'));
			},
			// 提示
			toast(a) {
				this.$refs.uToast.show({
					title: `结算成功共计${a}`,
					type: 'success',
				})
			},
			// 去登陆
			goto(){
				uni.switchTab({
					url:'/pages/my'
				})
			}
		},
		mounted() {},
		onLoad() {

		},
		onShow() {
			
			// #ifndef MP-WEIXIN
			// 是数据同步
			this.getData()
			// #endif
			// 设置tabBar的角标
			// #ifdef MP-WEIXIN
			if(this.$store.state.user){
				this.login=true
				this.getData()
			}else{
				this.login=false
			}					
			// #endif
			
		},
		filters: {},
		computed: {},
		watch: {

		},
	}
</script>

<style scoped lang="scss">
	.car {
		.head {
			padding-top: 10%;

		}

		.img {
			width: 100vw;
			height: 400rpx;
			position: absolute;
			z-index: -1;
		}

		.empt {
			height: 380rpx;
		}

		.recommended {
			margin-bottom: 100rpx;
		}
	}
</style>
