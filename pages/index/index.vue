<template>
	<view class="index height-100" v-if="imgNav">
		<!-- 头部导航栏 -->
		<view class="head  ">
			<headNav :isShow='isShow'>
				<template #left>
					<view class="flex">
						<image src="../../static/navi_title_v6.png" mode="" class="head-img"></image>
					</view>
				</template>
				<template #center>
					<view class="ipt-box flex">
						<image src="../../static/icon/search.png" mode="" class="head-search mr-10"></image>
						<input type="text" :value="value" @input="searc" class="ipt" @confirm='goSearch' />
						<view class="hot" v-if="show">
							<u-notice-bar :volume-icon="false" type="none" mode="vertical" :list="list1">
							</u-notice-bar>
						</view>
					</view>

				</template>
			</headNav>
		</view>

		<!-- 轮播图 -->
		<view class="carousel" style="padding-bottom: 130rpx;">

			<carousel v-if="list.length>0" :list='list'> </carousel>
			<!-- 图片导航 -->
			<imgNav v-if='imgNav' :imgNav='imgNav'></imgNav>
			<!-- 大图 -->
			<view class="p-lr-10 l-h-0">
				<image v-if="img1" :src="img1.pic_url" class=" img"></image>
				<image v-if="img2" :src="img2._hotspot.image" class="img"></image>
			</view>
			<view class="p-10" style="	background-color: #D94744;">
				<rows v-if="rowsData.length>0" :rowsData='rowsData'></rows>
				<raise v-if='raise' :raise='raise'></raise>
				<sellHot v-if="sellHot" :sellHot='sellHot'></sellHot>
				<timeLimit v-if='timeLimit' :timeLimit='timeLimit'></timeLimit>
				<tabNav v-if="tabNav" :tabNav='tabNav'></tabNav>
			</view>

			<tabBars v-if="tabBars" :tabBars='tabBars'></tabBars>

			<!-- #ifndef MP-WEIXIN -->
			<view class="empt"> </view>
			<!-- #endif -->
		</view>

		<goTop :scrollTop='scrollTop'></goTop>

		<u-toast ref="uToast" />

	</view>

</template>

<script>
	import carousel from '../../components/index/carousel.vue';
	import imgNav from '../../components/index/imgNav.vue';
	import rows from '../../components/index/rows.vue';
	import raise from '../../components/index/raise.vue';
	import sellHot from '../../components/index/sellHot.vue';
	import timeLimit from '../../components/index/timeLimit.vue';
	import tabNav from '../../components/index/tabNav.vue';
	import tabBars from '../../components/index/tabBars.vue';
	import goTop from '../../components/goTop.vue'

	export default {
		components: {
			carousel,
			imgNav,
			rows,
			raise,
			sellHot,
			timeLimit,
			tabNav,
			tabBars,
			goTop
		},
		props: {},
		data() {
			return {
				isShow: false,
				value: '',
				list: [],
				imgNav: '',
				img1: '',
				img2: '',
				rowsData: [],
				raise: '',
				sellHot: '',
				timeLimit: '',
				tabNav: '',
				tabBars: '',
				list1: [],
				show: true,
				scrollTop: 0

			}
		},
		methods: {
			// 监听输入框的值
			searc(e) {
				// console.log(e.target.value)
				this.value = e.target.value
				if (e.target.value) {
					this.show = false
				} else {
					this.show = true
				}
				// console.log(222222)

			},
			// 占位符
			word() {
				this.$api.searchView.placeHolder().then(res => {
					res.data.map(a => {
						this.list1.push(a.queryName)
					})
					// console.log(res.data)
				})
			},
			// 首页数据
			getData() {
				this.$api.index.homeData().then(res => {
					// console.log(res.homepage.floors)
					res.homepage.floors[1].data.items.map(a => {
						this.list.push({
							image: a.item.pic_url,
							iid: a.iid
						})
					})
					this.imgNav = res.homepage.floors[2].data
					this.img1 = res.homepage.floors[4].data
					this.img2 = res.homepage.floors[3].data
					this.rowsData = res.homepage.floors[5].data.rows
					this.raise = res.homepage.floors[7].data
					this.sellHot = res.homepage.floors[8].data
					this.timeLimit = res.homepage.floors[9].data
					// console.log(this.timeLimit)
					this.tabNav = res.homepage.floors[10].data
					this.tabBars = res.homepage.floors[11].data.items

					// console.log(this.img1 )
				}).catch()

			},
			// 键盘确定搜索
			goSearch() {
				// 输入框有值
				if (this.value) {
					// console.log(222)
					uni.navigateTo({
						url: `./searchView?value=${this.value}`
					})
					this.$utils.saveHistory({
							key:'search',
							data:this.value,
						})
						this.show = true
						this.value=''
				} else {
					this.$refs.uToast.show({
						title: '未输入关键字',
						type: 'warning',
					})
				}
			}
		},
		mounted() {
			this.getData()
			this.word()
	
			
		},
		onLoad() {

		},
		onShow() {
 // #ifdef MP-WEIXIN
 if(this.$store.state.user){		
 	if(this.$store.state.carSum){
 		uni.setTabBarBadge({
 				text: String(this.$store.state.carSum.length),
 			// 需要添加角标的导航下标
 			index: 3
 		})
 	}
 	
 }else{
 	uni.removeTabBarBadge({
 		index: 3
 	})
 }					
 // #endif
 
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
		},
		// 页面滚动
		// onPageScroll(e){
		// 	console.log(e)
		// },
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.index {

		// overflow: hidden;
		.empt {
			height: 110rpx;
			width: 100%;
		}
	}

	.head {
		// background-color: #FF846F !important;
		// background: url('../../static/bg_banner.png');
		// background: url('../../static/bg_searchbar.png');

		.head-img {
			width: 80rpx;
			height: 50rpx;
		}

		.ipt-box {
			background-color: rgba(245, 245, 245, 0.4);
			height: 70rpx;
			border-radius: 30rpx;

			// width: 100%;
			.hot {
				width: 100%;
				position: absolute;
				left: 22%;
				z-index: -1;

			}

			.head-search {
				width: 40rpx;
				height: 40rpx;
				margin-left: 20rpx;
			}
		}
	}

	.carousel {
		/* #ifndef MP-WEIXIN */
		padding-bottom: 200rpx;
		/* #endif */

		/* #ifndef MP-WEIXIN */
		margin-top: 88rpx;
		/* #endif */
		/* #ifdef MP-WEIXIN */
		margin-top: 130rpx;
		/* #endif */
		background-color: #FF846F;
		// color: #D84846;
		height: 150rpx;

		.img {
			width: 100%;
			height: 200rpx;
			color: #FFF9E3;
		}
	}
</style>
