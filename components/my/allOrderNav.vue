<template>
	<view class="">
		<view class="flex jcsa p-10 orderNav">

			<view @click="change(item, index)" class="flex-1 title " v-for="(item,index) in list" :key='index'
				:class="slect===index?'slect':''">
				{{item}}
			</view>

		
		</view>
	<!-- 内容 -->
			<orderContent :slect='slect' ></orderContent>

	</view>

</template>

<script>
	import orderContent from './orderContent.vue'
	export default {
		components: {
			orderContent
		},
		props: {
			index:{
				type:Number
			}
		},
		data() {
			return {
				list: ['全部', '待付款', '待收货', '待评价', '退款'],
				slect: 0
			}
		},
		methods: {
			// 下标改变
			change(item, index) {
				this.slect = index
			}
			
		},
		mounted() {
             this.slect=this.index
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
	.orderNav {
		.slect {
			background-color: #FFD565;
			border-radius: 20rpx;
			color: #FFFFFF;
		}

		.title {
			padding: 10rpx 20rpx;
		}
	}
</style>
