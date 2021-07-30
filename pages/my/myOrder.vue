<template>
	<view class="myOrder">
		<!-- #ifndef MP-WEIXIN -->
		<u-navbar title="我的订单"></u-navbar>
		<!-- #endif -->

		<allOrderNav :index='index'></allOrderNav>

		<recommended></recommended>


	</view>

</template>


<script>
	import allOrderNav from '../../components/my/allOrderNav.vue';
	import recommended from '../../components/details/recommended.vue'
	export default {
		components: {
			allOrderNav,
			recommended
		},
		props: {},
		data() {
			return {
				index: 0
			}
		},
		methods: {},
		mounted() {

		},
		onLoad(option) {
			// 页面跳转传递的下标
			this.index = Number(option.index)

		},
		onShow() {

		},
		filters: {},
		computed: {},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.myOrder {}
</style>
