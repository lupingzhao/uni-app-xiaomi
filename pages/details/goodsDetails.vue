<template>
	<view class="details" v-if="data">
		<!-- 头部 -->
		<detailsVideo :imgs="imgs" @previewImages="previewImages"></detailsVideo>
		<!-- 商品信息 -->
		<goodsInfo v-if="goodsInfo" :goodsInfo='goodsInfo' :labels='labels'></goodsInfo>
		<!-- <cell v-if="shopTags" :list="shopTags"></cell> -->
		<specifications v-if="shopTags" :list="shopTags" :goodsInfo='goodsInfo'></specifications>
		<serviceList v-if="serviceList" :list='serviceList'></serviceList>


		<userEvaluation v-if="comment" :comment='comment' :gid='gid'></userEvaluation>
		<qAndA v-if="gid" :gid='gid'></qAndA>
		<recommended v-if="gid" :gid='gid'></recommended>
		<bank v-if="bank" :bank="bank"></bank>
		<introExt v-if="introExt" :introExt='introExt'></introExt>


		
		<!-- 返回顶部 -->
		<u-back-top :scroll-top="scrollTop"></u-back-top>

	</view>

</template>

<script>
	import detailsVideo from '../../components/details/detailsVideo.vue';
	import goodsInfo from '../../components/details/goodsIfo.vue';
	import cell from '../../components/details/cell.vue';
	import serviceList from '../../components/details/serviceList.vue';
	import specifications from '../../components/details/specifications.vue';
	import userEvaluation from '../../components/details/userEvaluation.vue';
	import qAndA from '../../components/details/qAndA.vue';
	import introExt from '../../components/details/introExt.vue';
	import recommended from '../../components/details/recommended.vue';
	import bank from '../../components/details/bank.vue';
	import cateContent from '../../components/goTop.vue'
	export default {
		components: {
			// carousel,
			detailsVideo,
			goodsInfo,
			cell,
			serviceList,
			specifications,
			userEvaluation,
			qAndA,
			introExt,
			recommended,
			bank
		},
		props: {},
		data() {
			return {
				gid: '',
				data: '',
				comment: '',
				list: [],
				imgs: [],
				show: false,
				goodsInfo: '',
				shopTags: '',
				serviceList: '',
				labels: '',
				introExt: '',
				bank: '',
				scrollTop: 0

			}
		},
		methods: {
			// 数据
			getData() {
				this.$api.goods.detail(this.gid).then(res => {
					let carouselMapList = ''
					// console.log(res)
					this.data = res.data.goods
					this.goodsInfo = res.data.goods.goodsInfo
					this.comment = res.data.comment
					this.imgs = res.data.goods.carouselMapList
					this.shopTags = this.data.shopTags
					this.serviceList = res.data.serviceInfo
					this.labels = this.data.labels
					this.bank = res.data.goods.brand
					// 商品详情图常见问题
					this.introExt = this.goodsInfo.introExt
					// console.log(res.data.goods.carouselMapList)
					// console.log(this.introExt)
					// 保存浏览记录
					this.$utils.saveHistory({
						key: 'look',
						data: {
							data: this.goodsInfo,
							gid: this.gid
						},
						attr: 'gid'
					})

				})
			},
			// 出现返回顶部按钮
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			}
		},
		mounted() {

		},
		onLoad(option) {
			this.gid = option.gid
			this.getData()
			// console.log(option.gid)
		},
		onShow() {

		},

		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.details {
		/* #ifdef MP-WEIXIN */
		margin-top: 55rpx;
		/* #endif */
padding-bottom: 100rpx;
		.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}

		.rect {
			width: 100%;
			height: 450rpx;
			// background-color: #fff;
		}
		

	}
</style>
