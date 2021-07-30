<template>
	<view class="yes">
		<view class="t-a-c empt" v-if="data.length===0">
			为检索到该商品
		</view>

		<!-- 搜索时的页面 -->
		<view class="flex p-10" v-for="(item,index) in data" :key='index' v-else @click="goto(item.queryName)">
			<image src="../../static/icon/search.png" mode="" class="img mr-5"></image>
			<view class="" v-html="item.queryName.replace(keyword,`<text style='color: #C8C7CC'>${keyword}</text>`)"></view>
		</view>


	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			keyword: {
				type: String
			}
		},
		data() {
			return {
				data: '',
				data1: ''
			}
		},
		methods: {
			getData() {
				// console.log(this.keyword)
				this.$api.searchView.search(this.keyword).then(res => {
					this.data = res.data		
					this.$utils.saveHistory({
						key:'search',
						data:this.keyword,
					})
					// console.log(this.data)
				})
			},
			// 去商品列表
			goto(e){
				uni.navigateTo({
					url:`/pages/list/goodsList?word=${e}`
				})
				this.$utils.saveHistory({
					key:'search',
					data:this.keyword,
				})
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
	.yes {
		height: 100%;

		background-color: #FFFFFF;

		.img {
			width: 30rpx;
			height: 30rpx;
		}

		.empt {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
</style>
