<template>
	<view class="life">
		<image src="../static/life_bg.png" mode="" class="head-img"></image>
		<!-- 标题 -->
		<view class="flex jcc">
			<image src="../static/life_title.png" mode="" class="title-img"></image>
		</view>
		<!-- 导航栏 -->
		<scroll-view scroll-x="true" class="width-100">
			<view class="flex p-10" style="width: 100vh;">
				<view class="title  font-c-w font-s-16 " v-for="(item,index) in tab" :key='index'
					@click="change(index,item.id)">
					<view class="p-tb-10 width-100 ellipsis" :class="slecct===index?'slecct':''">
						{{item.title}}
					</view>
				</view>

			</view>
		</scroll-view>
		<!--  -->
		<u-swiper mode='none' name='picUrl' @click='click' :list="list" :effect3d="true" bg-color=' '></u-swiper>
		<!-- 导航 -->
		<view class="flex jcsa p-10">
			<view class="flex-1 " v-for="(item,index) in kkong" :key='index' @click="goto(item.link)">
				<view class="flex jcc">
					<image :src="item.picUrl" mode="" class="kkong"></image>
				</view>
				<view class="t-a-c">
					{{item.title}}
				</view>
			</view>

		</view>

		<!-- 内容 -->
		<waterfall v-if="waterfall" :waterfall='waterfall' ref='waterfallVue'></waterfall>
		<goTop :scrollTop='scrollTop'></goTop>
	</view>

</template>

<script>
	import waterfall from '../components/life/waterfall.vue';
	import goTop from '../components/goTop.vue'
	export default {
		components: {
			waterfall,
			goTop
		},
		props: {},
		data() {
			return {
				data: '',
				tab: "",
				slecct: 0,
				list: [],
				kkong: '',
				waterfall: "",
				scrollTop: 0
			}
		},
		methods: {
			getData() {
				this.$api.life.LifeIndex().then(res => {
					// console.log(res)
					this.data = res.data
					this.tab = this.data.tab
					this.waterfall = this.tab[0].id
					this.list = res.data.banner
					this.kkong = res.data.kkong

				})
			},
			// 导航栏点击事件
			change(index, id) {
				this.slecct = index
				this.waterfall = id
				this.$refs.waterfallVue.remove()
			},
			// 跳转
			goto(e) {
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
			click(e) {
				// #ifndef MP-WEIXIN
				window.open(this.kkong[e].link)
				// #endif
				// #ifdef MP-WEIXIN
				// 复制
				uni.setClipboardData({
					data: this.kkong[e].link,
				});
				// #endif

			}

		},
		mounted() {
			this.getData()

			if(this.$store.state.carSum){		
				uni.setTabBarBadge({
				text: String(this.$store.state.carSum.length),
					// 需要添加角标的导航下标
					index: 3
				})
			}
			
		},
		onLoad() {

		},
		onShow() {

		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.life {
		.title-img {
			margin-top: 60rpx;
			width: 150rpx;
			height: 50rpx;

		}

		.head-img {
			width: 100vw;
			position: absolute;
			z-index: -1;
		}

		.title {
			border-bottom: 8rpx solid transparent;
			margin: 10rpx 20rpx;

		}

		.slecct {
			font-size: 16px;
			font-weight: 700;
			border-bottom: 8rpx solid #FFFFFF;
		}

		.kkong {
			height: 100rpx;
			width: 100rpx;
		}

	}
</style>
