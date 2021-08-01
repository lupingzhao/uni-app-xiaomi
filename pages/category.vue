<template>
	<view class="category height-100">
		<!-- #ifndef MP-WEIXIN -->
		<headNav :title='title'></headNav>
		<!-- #endif -->


		<u-sticky :offset-top="0">
			<view class="box-h" style='background-color: #FFFFFF;'>
				<view class="ipt-box flex">
					<image src="../static/icon/search.png" mode="" class="head-search"></image>
					<input type="text" :value="value" @input="search" class="ipt" @confirm="goLIstanbul()">
					<view class="hot" v-if="show">
						<u-notice-bar :volume-icon="false" type="none" mode="vertical" :list="list1">
						</u-notice-bar>
					</view>

				</view>
			</view>
		</u-sticky>



		<!-- 内容 -->
		<view class="flex a-i-fs content width-100">
			<!-- 侧边 -->
			<side @leverl2="side" ref="side"></side>
			<!-- 右边 内容 -->
			<cateContent v-if="levelData2" :levelData2='levelData2' @bottom='bottom'></cateContent>
		</view>

		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>
	</view>

</template>

<script>
	import side from '../components/category/side.vue';
	import cateContent from '../components/category/cateContent.vue'
	export default {
		components: {
			side,
			cateContent
		},
		props: {},
		data() {
			return {
				title: '分类',
				list1: [],
				value: '',
				show: true,
				levelData2: '',
				id: '5d3912da9bbe3147969a4ad1',
				scrollTop: 0
			}
		},
		methods: {
			// 搜索框占位符的显示与否
			search(e) {
				// console.log(e.target.value)
				this.value = e.target.value
				if (e.target.value) {
					this.show = false
				} else {
					this.show = true
				}
				// console.log(222222)

			},
			// 输入框确定事件
			goLIstanbul() {
				// console.log(this.value);
				uni.navigateTo({
					url: `/pages/list/goodsList?word=${this.value}`
				})
			},
			// 占位词
			word() {
				this.$api.searchView.placeHolder().then(res => {
					res.data.map(a => {
						this.list1.push(a.queryName)
					})
					// console.log(res.data)
				})
			},
			// 二级分类数据
			leverl2() {
				this.$api.Category.askInfo1(this.id).then(res => {
					// console.log(res)
					this.levelData2 = res.data
				})
			},
			// 侧边栏点击事件
			side(e) {
				this.id = e
				// console.log(e)
				this.leverl2()
			},
			// 出现返回顶部按钮
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			// 触底
			bottom() {
				this.$refs.side.bottom()
			}

		},
		mounted() {
			this.word()
			this.leverl2()
			// this.$store

		},
		onLoad() {

		},
		onShow() {
			// #ifdef MP-WEIXIN
			if (this.$store.state.user) {
				if (this.$store.state.carSum) {
					uni.setTabBarBadge({
						text: String(this.$store.state.carSum.length),
						// 需要添加角标的导航下标
						index: 3
					})
				}

			} else {
				uni.removeTabBarBadge({
					index: 3
				})
			}
			// #endif
		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.category {
		background-color: #F1F1F1;
		// background-color: #FFFFFF;
		padding-bottom: 20rpx;
		width: 100%;

		.box-h {
			padding: 20rpx 0;
		}

		.ipt-box {
			background-color: rgba(245, 245, 245, 0.4);

			.ipt {
				// background-color: #4CD964;
				// background-color:rgba(245,245,245,0.4);
				height: 100%;
				width: 100%;
				z-index: 2;
			}

			// padding: 10rpx 0;
			width: 90%;
			margin: auto;
			// background-color: #f5f5f5;
			background-color:rgba(245, 245, 245, 0.4);
			height: 70rpx;
			border-radius: 30rpx;
			/* #ifdef MP-WEIXIN */
			// margin-top: 130rpx;
			/* #endif */

			.hot {
				width: 100%;
				position: absolute;
				left: 15%;
				// z-index: -1;
			}

			.head-search {
				width: 40rpx;
				height: 40rpx;
				margin-left: 20rpx;
				margin-right: 10rpx;
			}
		}

		.content {}
	}
</style>
