<template>
	<view class="searchView">
		<!-- #ifndef MP-WEIXIN -->
		<u-navbar title="搜索"></u-navbar>
		<!-- #endif -->

		<view class="p-10 flex mb-10">
			<u-search bg-color='#FFFFFF' @clear='clear' placeholder="请输入关键字" :show-action="false" v-model="keyword"
				class="ipt" @search='keydown'  @change='change'>
			</u-search>
			<u-button type="error" size="mini" class='m' @click='keydown'>搜索</u-button>
		</view>

		<!-- 未搜索时的页面 输入框没有值 -->
		<noSearch  v-if="show"></noSearch>
		<view class="" v-else>
			<search v-if="keyword" :keyword='keyword' ref="yes"></search>
		</view>
		
	</view>

</template>

<script>
	import noSearch from '../../components/searchView/noSearch.vue';
	import search from '../../components/searchView/search.vue'
	export default {
		components: {
			noSearch,
			search
		},
		props: {},
		data() {
			return {
				keyword: '',
				// 页面显示
				show:false

			}
		},
		methods: {
			// 清除输入框
			clear() {
				this.keyword = '',
				this.show=true
			},
			// 输入框实时值
			change(e){
				if(!e){
					this.show=true
				}else{
					this.show=false
				}
				
			},
			// 点击搜索
			keydown(){
				// console.log(this.keyword)
				this.show=false
				this.$refs.yes.getData()				
			}	

		},
		mounted() {

		},
		onLoad(option) {
			// console.log(option.value)
			if(!option.value){
				this.show=true
			}
			this.keyword = option.value

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.searchView {
		background-color: #F1F1F1;

		.ipt {
			// background-color: #FFFFFF;
			height: 60rpx;
			border-radius: 20rpx;
			width: 80vw;

			// border: ;
		}

		.m {
			margin-left: 20rpx;
		}
	}
</style>
