<template>
	<view class="myCollect">
		<!-- #ifndef MP-WEIXIN -->
		<u-navbar title="我的收藏"></u-navbar>
		<!-- #endif -->
		<goods :data='data' ></goods>
		
		
		
	</view>




</template>

<script>
	import goods from '../../components/my/goods.vue'
	export default {
		components: {
			goods
		},
		props: {},
		data() {
			return {
				data:'collect',
	
			}
		},
		methods: {
		
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
	.myCollect {
		
	}
</style>
