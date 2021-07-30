<template>
	<view class="list">
		<!-- #ifndef MP-WEIXIN -->
		<u-navbar title="商品列表"></u-navbar>
		<!-- #endif -->
		<!-- 搜索信息 -->
		<view class="p-10 flex jcsb ">
			<view class="font-c-w bgc-gray word" @click="del">
				{{word}}X
			</view>
			<view class="" @click="flex">
				<image class="img" v-if="!istrue" src="../../static/icon/arrange_cell_black.png" mode=""></image>
				<image class="img" v-else src="../../static/icon/arrange_list_black.png" mode="" ></image>
			</view>
		</view>
		
		<!-- 内容 -->
		<listGoods v-if="word" :word='word' :istrue='istrue'></listGoods>
		
	</view>

</template>

<script>
	import listGoods from '../../components/list/listGoods.vue'
	export default {
		components: {
			listGoods
		},
		props: {},
		data() {
			return {				
				word:"",
				istrue:true
			}
		},
		methods: {
			// 切换布局
			flex(){
				this.istrue=!this.istrue
			},
			// 删除搜索词
			del(){
				uni.navigateTo({
					url:'/pages/index/searchView'
				})
			}
		},
		mounted() {
          
		},
		onLoad(option) {
			// console.log(option.word)
			this.word=option.word
		
		
		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
.list{
	.word{
		padding: 10rpx 15rpx;
		border-radius: 20rpx;
	}
	.img{
		width: 80rpx;
		height: 80rpx;
	}
}
</style>
