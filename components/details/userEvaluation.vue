<template>
	<view class="userEvaluation" v-if="comment.index">
		<!-- 排行榜 -->
		<view class="p-10 m-tb-10 flex" v-if="data.data">
			<image src="../../static/paihang.png" mode="" class="img mr-5"></image>
			<view class="font-s-18 font-w-7">
				<text class="mr-10">排行榜 </text>
				<text class="" v-if="data.data">{{data.data.text}}</text>
			</view>
		</view>


		<u-cell-item :arrow="true" arrow-direction="right" @click='click'>
			<template slot="title">
				<text class="font-s-14 font-w-7">
					用户评价 ({{comment.index.total_count}})
				</text>

			</template>
			<template slot="right-icon">
				{{comment.index.positive_rate}}% 满意
			</template>
		</u-cell-item>
		<!-- 评价标签 -->
		<view class="m-tb-10 flex flex-wrap p-lr-10">
			<view v-if="index<4" class="tag-bgc mr-10 mb-10" :key='index' v-for="(item,index) in comment.index.tags"
				@click="comments(item.id,index)">
				{{item.name}}({{item.count}})
			</view>
		</view>

		<!-- 展示的评价 -->
		<view class="p-lr-10 mb-10">
			<scroll-view scroll-x="true">
				<view class="flex  ">
					<view class="content-one p-10 flex-1" v-for="(item,index) in comment.content" :key='index'>
						<view class="flex  width-100">
							<view class="">
								<image v-if="!item.avatar" src="../../static/avatar_default.png" mode=""
									class="portrait"></image>
								<image v-else :src="item.avatar" class="portrait"></image>
							</view>
							<view class="p-lr-10 ellipsis">
								{{item.nick_name}}
							</view>
							<view class="">
								<u-rate v-model="item.score" disabled active-color="#FA3534"></u-rate>
							</view>
						</view>
						<view class="text ellipsis-2 m-tb-10">
							{{item.text}}
						</view>
					</view>
					<view class="t-a-c" @click="click">
						查看更多
						<image src="../../static/icon/arrow_right_circle.png" mode="" class="img m-t-5"></image>
					</view>
				</view>
			</scroll-view>
		</view>



	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			comment: {
				type: Object
			},
			gid: {
				type: String
			}
		},
		data() {
			return {
				// 全部评价数
				count: '',
				// 排行
				data: ""

			}
		},
		methods: {
			// 点击评价标签获取评价列表
			comments(i, index) {
				// console.log(i)
				uni.navigateTo({
					url: `/pages/details/evaluation?tags=${i}&index=${index}&gid=${this.gid}`
				})
			},
			// 去评价页面
			click() {
				uni.navigateTo({
					url: `/pages/details/evaluation?gid=${this.gid}?index=0`
				})
			},
			getData() {
				this.$api.goods.composeTwo(this.gid).then(res => {
					// console.log(res)
					this.data = res[1]
				})
			}
		},
		mounted() {
			// console.log(this.comment)
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
	.userEvaluation {
		.tag-bgc {
			background-color: rgb(255, 251, 226);
		}

		.img {
			width: 40rpx;
			height: 40rpx;
		}

		.content-one {
			background-color: #F1F1F1;
			width: 600px;
			border-radius: 15rpx;
			margin: 10rpx 15rpx;
			height: 200rpx;

			.portrait {
				width: 60rpx;
				height: 60rpx;
			}

			.text {
				width: 400rpx;
				// height: 100rpx;
			}
		}

	}
</style>
