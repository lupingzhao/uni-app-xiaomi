<template>
	<view class="listGoods">
		<!-- 导航栏 -->
		<view class="flex jcsa">
			<view class="flex-1" :class="selectindex===item.id?'select':''" @click="qh(item.id)"
				v-for="(item,index) in title" :Key='index'>
				{{item.name}}

				<image v-if="item.id===''" src="../../static/icon/shaixuan.png" mode="" class="img1"></image>
			</view>


		</view>
		<!-- 价格选项 -->
		<view class="jge " v-if="isjg">
			<view v-for="(item1,index1) in jg1" :key='index1' class="box" :class="boxsle===index1+1?'box-sle':''"
				@click="jg(index1+1)">
				{{item1}}
			</view>
		</view>

		<!-- 商品列表 -->
		<view class=" p-10  " :class="istrue?'istrue':'isfalse'">
			<!-- 单独的盒子 -->
			<view class="box" v-for="(item2,index2) in list" :key='index2' @click="godetils(item2.data.goodsInfo.gid)">
				<view class="">
					<image :src="item2.data.goodsInfo.img800s" mode="" class="img"></image>
				</view>
				<view class="">
					<view class=" m-t-10" :class="{'ellipsis':istrue}">
						{{item2.data.goodsInfo.name}}
					</view>
					<view class=" font-s-12 font-c-gray m-tb-10" :class="{'ellipsis':istrue}">
						{{item2.data.goodsInfo.summary}}
					</view>
					<view class="m-tb-10">
						<text class="font-s-16 font-c-red mr-5">￥{{item2.data.goodsInfo.priceMin/100}}</text>
						<text class="del-line font-c-gray font-s-12">￥{{item2.data.goodsInfo.marketPrice/100}}</text>
					</view>

					<view class="font-s-12 font-c-gray mb-10">
						{{item2.data.comment.count}}条评论
						&nbsp; &nbsp;
						{{item2.data.comment.positiveRate}}%好评
					</view>
				</view>

			</view>
		</view>



	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			word: {
				type: String
			},
			// 布局
			istrue: {
				type: Boolean,
				value: true
			}
		},
		data() {
			return {
				list: '',
				sortBy: 0,
				selectindex: 0,
				boxsle: 0,
				jg1: ['价格从低到高',
					'价格从高到低'
				],
				isjg: false,
				title: [{
						name: '综合',
						id: 0
					}, {
						name: '新品',
						id: 7
					}, {
						name: '销量',
						id: 8
					}, {
						name: '信用',
						id: 6
					}, {
						name: '筛选',
						id: ''
					},

				]

			}
		},
		methods: {
			// 商品列表
			getData() {
				// sortBy: 综合排序传0 销量排序传8  新品传7 价格降序传2 价格升序传1 信用排序传6 
				let query = [{
					queryName: this.word,
					queryType: 0,
					rule: []
				}]
				this.$api.goods.doSearch(query, this.sortBy).then(res => {
					this.list = res.data.data.goods
					// console.log(this.list);
				})
			},
			// 去详情
			godetils(e) {
				// console.log(e)
				uni.navigateTo({
					url: `/pages/details/goodsDetails?gid=${e}`
				})
			
		},
		// 点击导航栏
		qh(e) {
			if (e) {
				this.selectindex = e
				this.sortBy = e
				this.getData()
			} else {
				this.isjg = true
			}
		},
		//jiage
		jg(e) {
			this.sortBy = e
			this.boxsle = e
			this.getData()
			this.isjg = !this.isjg
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
	.listGoods {
		.img1 {
			width: 20rpx;
			height: 20rpx;
			margin-left: 10rpx;
		}

		.select {
			color: #DD524D;
		}

		.img {
			width: 300rpx;
			height: 300rpx;
		}

		.istrue {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;

			.box {
				width: 48%;
			}

		}

		.isfalse {
			.box {
				display: flex;
				// width: 400rpx;
			}
		}

		.jge {
			position: absolute;
			background-color: #F1F1F1;
			z-index: 22;
			right: 10rpx;
			margin-top: 30rpx;

			.box {
				font-size: 12px;
				padding: 20rpx;
			}

			.box-sle {
				color: #007AFF;
			}
		}

	}
</style>
