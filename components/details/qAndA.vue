<template>
	<view class="qa">
		<!--问答 -->
		<view v-if="list">
			<view class="font-s-16 font-w-7  pl-10 flex jcsb pr-10">
				<view class="">
					问大家({{list.length}})
				</view>
				<view class="" @click="toMore">
					更多&nbsp; >
				</view>
			</view>


			<view class="q  p-10" v-for="(item,index) in list" v-if="index<=3" :key='index'>
				<view class="flex  jcsb ">
					<view class="flex " style="width: 400rpx;">
						<image src="../../static/icon/ask_question.png" mode="" class="portrait"></image>
						<view class="p-lr-10 ellipsis width-100">
							{{item.ask}}？
						</view>
					</view>
					<view class="width-fit">
						{{item.reply_total}}个回答 &nbsp;
					</view>
				</view>

			</view>

			<view class="flex jcc m-t-5">
				<view class="gd width-fit" @click="toMore">
					点击查看全部
				</view>
			</view>

		</view>

		<view class="font-s-16 font-w-7 m-tb-10  pl-10" v-else>
			暂无问答
		</view>
		<!-- 提问 -->
		<view class=" p-10 flex jcsb">
			<view class="flex">
				<image src="../../static/icon/ask_list_empty.png" mode="" class="portrait mr-10"></image>
				好不好？问大家
			</view>
			<view class="tw">
				去提问
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			gid: {
				type: String
			}
		},
		data() {
			return {
				list: []
			}
		},
		methods: {
			getData() {
				this.$api.goods.askInfo(this.gid).then(res => {
					this.list = res.data.list
					// console.log(this.list)
				})
			},
			// 查看全部
			toMore() {
				uni.navigateTo({
					url: '/pages/details/QA',
				})
				uni.setStorageSync('qa', this.list)
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
	.qa {
		.tw {
			padding: 10rpx;
			border-radius: 15rpx;
			border: 2rpx solid #FCB54F;
		}

		.portrait {
			width: 40rpx;
			height: 40rpx;
		}

		.gd {

			padding: 10rpx 15rpx;
			border-radius: 15rpx;
			border: 2rpx solid;
		}
	}
</style>
