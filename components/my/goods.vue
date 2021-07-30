<template>
	<view class="p-10 goods">
<view class="" v-if='list'>
	<view  class="flex mb-10 a-i-fs width-100" v-for="(a,index) in list" :Key="index" @click="goto(a.gid)">
		<view class="mr-5 " style="width: 28%;">
			<u-image width="100%" height="250rpx" :src="a.data.picUrl"></u-image>
		</view>
		<view class="r-box width-70">
			<view class="font-s-16 font-w-7">
				{{a.data.shortName}}
			</view>
			<view class="ellipsis m-tb-10">
				{{a.data.summary}}
			</view>
			<!-- 标签 -->
			<!-- 		<view class="" v-for="(item1,index1) in a" :key='index1'>
				
			</view> -->
			<view class="font-s-16 font-w-7 font-c-red flex jcsb">
				<view class="">
					￥{{a.data.priceMin/100}}起
				</view>
				<view class="" @click.stop="del(index)">
					X
				</view>
			</view>
	
		</view>
	</view>
</view>
		

	<view class="empt div-center" v-else>
			<u-empty text="暂无数据" mode="car"></u-empty>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			data: {
				type: String
			}
		},
		data() {
			return {
				list: ''
			}
		},
		methods: {
			goto(e) {
				// console.log(e)
				uni.navigateTo({
					url: `/pages/details/goodsDetails?gid=${e}`
				})
			},
			// 删除记录
			del(e) {
				this.$utils.delMapOne({
					key:this.data,
					index:e,
				})
         	this.list = this.$utils.getHistory(this.data)
			}
		},
		mounted() {
			this.list = this.$utils.getHistory(this.data)
			// console.log(this.list)
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
	.goods {
		.empt {
			position: absolute;
			left: 0;
		}
	}
</style>
