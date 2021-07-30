<template>
  <view class="rows ">
	  <!-- 活动板块下的数据 -->
	  <view class="flex jcsb flex-wrap" v-for="(item,index) in rowsData" :key='index'>
	  	<view class="box"  v-for="(a,c) in item.items" :key='c' @click="goto(a.item.jump_url)">
	  		<image :src="a.item.pic_url" mode=""></image>
	  	</view>
	  </view>

  </view>

</template>

<script>
  export default {
    components: {},
    props: {
		rowsData:{
			type:Array,
			required:true
		}
	},
    data() {
      return {}
    },
    methods: {
		goto(e){
			// #ifndef MP-WEIXIN
			window.open(e)
			// #endif
			// #ifdef MP-WEIXIN
			// 复制
			uni.setClipboardData({
				data: e,
			});
			// #endif
		}
	},
    mounted() {
		// console.log(this.rowsData)

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
.rows{

	.box{
		width: 32%;

		margin: 10rpx 0;
		image{
			width: 100%;
					height: 300rpx;
		}
	}
}
</style>
