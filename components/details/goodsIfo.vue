<template>
	<view class="goodsInfo p-lr-10">
		<view class="flex jcsb">
			<view class="">
			<text class="font-c-red font-s-18 font-w-7 mr-5">￥{{goodsInfo.priceMin/100}}</text>	
			<text class="del-line font-c-gray font-s-12 mr-5">￥{{goodsInfo.marketPrice/100}}</text>
			<text v-for="(item,index) in labels" :key='index' :style="{ background: item.attrs.bgColor  }" class="font-s-12 mr-5 bgc">{{item.name}}</text>
			</view>
			<!-- 收藏 -->
			<view class="img" @click="goCollect">
				<image v-if="collect" src="../../static/icon/product_favor.png" mode=""></image>
				<image v-else src="../../static/icon/product_unfavor.png" mode=""></image>
			</view>
		</view>

		<view class=" m-tb-10 font-s-18 font-w-7">
			{{goodsInfo.shortName}}
		</view>
		<view class="mb-10 font-s-14 font-c-gray ">
			{{goodsInfo.shortSummary}}
		</view>
		<view class="font-c-red ellipsis">
			{{goodsInfo.name}}>
		</view>
		
		
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			goodsInfo: {
				type: Object
			},
			labels:{
				type:Array
			}
		},
		data() {
			return {
				// 收藏
				collect: false
			}
		},
		methods: {
			// 收藏
			goCollect(){
				// console.log(this.goodsInfo.gid)
				this.collect=!this.collect
				// 收藏
				if(this.collect){					
					this.$utils.saveHistory({
						key:'collect',
						data:{data:this.goodsInfo,gid:this.goodsInfo.gid},
						attr:'gid'
					})
				}else{
					this.$utils.delHistoryOne({
					  key:'collect',
					  value:{data:this.goodsInfo,gid:this.goodsInfo.gid},
					  // id判断额属性名是字符串
					  id:'gid'
					})
					
					
				}
			},
			// 是否收藏
			getCollect(){
			let collectData=this.$utils.getHistory('collect')
			// console.log(collectData)
			if(collectData){
				collectData.map(a=>{
					if(a.gid===this.goodsInfo.gid){
						this.collect=true
					}
				})
			}
			}
		},
		mounted() {
			// console.log(this.goodsInfo)
			// console.log(this.labels)
			this.getCollect()
			
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
	.goodsInfo {
		.img {
			image {
				width: 100rpx;
				height: 100rpx;
			}
		}
		.bgc{
		
			padding: 5rpx 10rpx;
			color: #FFFFFF;
		}
	}
</style>
