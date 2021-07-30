<template>
	<view class="look">
		<!-- #ifndef MP-WEIXIN -->
		<u-navbar title="我的足迹"></u-navbar>
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
				data: 'look',
				show: true
			}
		},
		methods: {},
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
	.look {
	
	}
</style>
