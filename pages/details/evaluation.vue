<template>
	<view class="evaluation">
		<!-- #ifndef MP-WEIXIN -->
		<u-sticky>
			<u-navbar title="全部评价"></u-navbar>
		</u-sticky>

		<!-- #endif -->
		<!-- 内容 -->
		<scroll-view scroll-y="true" style="height: 100vh;" @scrolltolower="scroll">
			<view class="flex jcsb p-10 mb-10">
				<view class="flex">
					<view class="mr-5 font-s-16">
						综合评分:
					</view>
					<u-rate v-model="data.avg_score" active-color="#FA3534"></u-rate>
				</view>
				<view class="" v-if="data.positive_rate">
					{{data.positive_rate}}%满意
				</view>
			</view>
			<!-- 标签 -->
			<view class="m-tb-10 flex flex-wrap p-lr-10">
				<view class="tag-bgc mr-10 " v-for="(item,index) in data.tags" @click="comments(item.id,index)"
					:class="slectindex===index ?'slectBgc':''">
					{{item.name}}({{item.count}})
				</view>
			</view>
			<!-- 评价详情 -->


			<view class="">
				<view class="flex a-i-fs p-10 " v-for="(item,index) in data1" :key='index'>
					<!-- 头 -->
					<view class="mr-5">
						<image v-if="!item.avatar" src="../../static/avatar_default.png" mode="" class="img"></image>
						<image v-else :src="item.avatar" mode="" class="img"></image>
					</view>
					<view class="width-100 p-lr-10">
						<view class="flex jcsb">
							<view class="flex">
								<view class="">
									<view class="flex">
										<view class="mr-10">
											{{item.nick_name}}
										</view>
										<view class="">
											<u-rate v-model="item.score" active-color="#FA3534"></u-rate>
										</view>
									</view>
									<view class="m-t-5 font-s-14 font-c-gray">
										已选: {{item.pid_spec}}
									</view>
								</view>
							</view>
							<view style=" width: 180rpx">
								{{item.ctime }}
							</view>
						</view>
						<!-- 内容 -->
						<view class=" m-t-10">
							<view class="text">
								{{item.text}}
							</view>
							<!-- 图片 -->
							<view class="m-t-10">

								<view class="flex jcsb flex-wrap">
									<image :src="item1.img" class="img1 " v-for="(item1,index1) in item.comment_imgs"
										:key='index1'></image>

								</view>
							</view>
						</view>
					</view>


				</view>
			</view>

		</scroll-view>





	</view>

</template>

<script>
	import dayjs from 'dayjs'
	export default {
		components: {},
		props: {},
		data() {
			return {
				page: 1,
				pageSize: 20,
				tagid: '__all__',
				data1: [],
				data: '',
				// 标签下标
				slectindex: 0,
				value: 0,
				gid: ''
			}
		},
		methods: {
			// 评论数据
			getData() {
				this.$api.goods.commentContent(this.gid, this.page, this.pageSize, this.tagid).then(res => {
					// console.log(res)
					res.data.list.map(a => {
						a.ctime = dayjs(a.ctime).format('YYYY-MM-DD')
					})
					this.data1 = this.data1.concat(res.data.list)

				})
			},
			// 评论标签
			tags(e) {
				this.$api.goods.commentTag(e).then(res => {					
					this.data = res.data
				})
			},
			// 点标签
			comments(e, index) {
				this.slectindex = index
				this.tagid = e
				this.data1 = []
				this.getData()
			},
			// 触底
			scroll() {		
				// 当前标签的总数
				if (this.data1.length < this.data[this.slectindex].count) {
					this.page++
					this.getData()
				}
				// console.log(11)
			}
		},
		mounted() {

		},
		onLoad(option) {
			this.gid = option.gid
			// 如果是点击标签进入评价
			if (option.tags) {
				this.tagid = option.tags
				this.slectindex = Number(option.index)
			}
			this.tags(option.gid)
			this.getData()
			// console.log(option)
			// console.log(dayjs().valueOf())
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.evaluation {
		.tag-bgc {
			border-radius: 15rpx;
			padding: 10rpx;
			margin-bottom: 15rpx;
			background-color: rgb(255, 251, 226);
		}

		.slectBgc {
			background-color: #F9C55A;
		}

		.img {
			width: 100rpx;
			height: 100rpx;
			border-radius: 100%;
		}

		.img1 {
			width: 48%;
			height: 200rpx;
			margin-bottom: 15rpx;
			border-radius: 20rpx;
		}
	}
</style>
