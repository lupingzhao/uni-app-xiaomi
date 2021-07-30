<template>
	<view class="no p-10">
		<view class="mb-10" v-if="data">
			<view class="font-s-16 m-tb-10 font-w-7 flex jcsb">
				<view class="">
					搜索历史
				</view>
				<view class="" @click="clear">
					<image src="../../static/icon/del.png" mode="" class="img1"></image>
				</view>
			</view>
			<view class="flex flex-wrap">
				<view class="word mr-10 mb-10" v-for="(item,index) in data" :key='index' @click="dianji(item)">
					{{item}}
				</view>
			</view>
		</view>


		<!-- 搜搜发现 -->
		<view class="">
			<view class="m-tb-10 font-s-16 font-w-7">
				搜索发现
			</view>
			<view class="flex flex-wrap">
				<view class="word mr-10 mb-10 flex " v-for="(a,index) in data1" :key='index' @click="dianji(a.queryName)">
					<image src="../../static/huo.png" mode="" v-if="a.querySubType" class="img1 mr-5"></image>
					{{a.queryName}}
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				data: "",
				data1: ''
			}
		},
		methods: {
			// 清除记录
			clear() {
				uni.removeStorageSync('search')
				this.data = this.$utils.getHistory('search')
			},
			// 搜索发现
			word() {
				this.$api.searchView.placeHolder().then(res => {
					this.data1 = res.data
					// console.log(res.data)
				})
			},
			// 点击搜索 历史记录
			dianji(e) {
				uni.navigateTo({
					url:`/pages/list/goodsList?word=${e}`
				})
				// this.$emit('dj', e)e
			}

		},
		mounted() {
			this.word()
			this.data = this.$utils.getHistory('search')
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
	.no {
		height: 100%;

		background-color: #FFFFFF;

		.word {
			background-color: #F1F1F1;
			padding: 15rpx;
			border-radius: 15rpx;
		}

		.img1 {
			width: 30rpx;
			height: 30rpx;
		}
	}
</style>
