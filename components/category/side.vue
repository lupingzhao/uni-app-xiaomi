<template>
	<view class="side">
		<scroll-view scroll-y="true" class="scroll" :enhanced='true' :show-scrollbar='false'>
			<view class="scroll-y">
				<view class="name flex jcc " v-for="(item,index) in levelData1" :key='index' @click="swich(item.id,index)">
					<view class="mini" :class="seclectindex===index?'bgc':''">
						{{item.name}}
					</view>
				</view>
			</view>
		</scroll-view>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {},
		data() {
			return {
				levelData1: '',
				seclectindex: 0,
			}
		},
		methods: {
			// 一级分类
			level1() {
				this.$api.Category.askInfo().then(res => {
					// console.log(res)
					this.levelData1 = res.data
				})
			},
			// 切换事件
			swich(id, index) {
				this.seclectindex = index
				this.$emit('leverl2', id)
				
			},
			// 内容触底事件
			bottom(){
				// console.log(++this.seclectindex);
				let page=++this.seclectindex
				if(page>this.levelData1.length-1){
					page=0
					this.seclectindex=0
				}
				console.log(page);
				this.$emit('leverl2',this.levelData1[page].id)
			}
		},
		mounted() {
			this.level1()
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
	.side {
		// height: 100%;
		margin-right: 10rpx;
		position: fixed;
		/* #ifdef MP-WEIXIN */
		top: 120rpx;
		bottom: 0;
		/* #endif */
		overflow: auto;
		/* #ifndef MP-WEIXIN */
		bottom: 90rpx;
		top: 180rpx;
		padding-top: 10px;
		/* #endif */

		// background-color: #007AFF;
		.scroll-y {
			background-color: #FFFFFF;
		}



		.name {
			width: 170rpx;
			height: 90rpx;

			.mini {
				text-align: center;
				padding: 10rpx 0;
				width: 150rpx;
				border-radius: 20rpx;
			}

			.bgc {
				background-color: #DD524D;
				color: #FFFFFF;
			}
		}
	}
</style>
