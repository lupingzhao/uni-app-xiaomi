<template>
	<view class="wrap p-10">
		<!-- 轮播图 -->
		<u-swiper :list="list" @click='click'></u-swiper>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			list:{
				required:true,
				type:Array
			}
		},
		data() {
			return {
			}
		},
		methods: {
			// 点击事件
			click(e){
				console.log(this.list[e])
				// 
				console.log(e)
			}
		},
		mounted() {

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

</style>
