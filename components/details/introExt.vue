<template>
	<view class="introExt">
		<!-- 详情 -->
		<!-- #ifndef MP-WEIXIN -->
		<u-sticky :offset-top="top" class='stick'>
		<!-- #endif -->
			<view class="bgc-gray title">
				<u-tabs name="title" :list="introExt" :is-scroll="false" :current="current" @change="change"></u-tabs>
			</view>
		<!-- #ifndef MP-WEIXIN -->
		</u-sticky>
		<!-- #endif -->


		<!-- 内容 -->
		<view class="l-h-0 p-10">
			<image :src="item" mode="" class="img" v-for="(item,index) in introExt[current].imagesArray" :key='index'></image>
		</view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			introExt: {
				type: Array
			}
		},
		data() {
			return {
				// #ifndef MP-WEIXIN
				top: -80,
				// #endif
				// #ifdef MP-WEIXIN
				top: 40,
				// top:'',
				// #endif
				current: 0
			}
		},
		methods: {
			change(index) {
				this.current = index;
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
	.introExt {
		.img {
			width: 100%;
			line-height: 0;
			margin: 0;
		}

		.title {
			z-index: 55;
		}
		.stick{
			/* #ifdef MP-WEIXINN */
			background-color: #007AFF;
			/* #endif */
			
		}
	}
</style>
