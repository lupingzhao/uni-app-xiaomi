<template>
	<view class="qa">
		<!-- #ifndef MP-WEIXIN -->
		<u-sticky>
			<u-navbar :title="title"></u-navbar>
		</u-sticky>
		<!-- #endif -->

		<view class="p-lr-10 mb-10 p-b-10">
			<view class="qa-one p-10 " v-for="(item,index) in list" :key='index'>
				<view class="flex   width-100">
					<image src="../../static/icon/ask_question.png" mode="" class="portrait"></image>
					<view class="p-lr-10  font-w-7 font-s-16">
						{{item.ask}}？ 
					</view>

				</view>
				<view class=" m-t-5 flex a-i-fs">
					<view class="">
						<image src="../../static/icon/answer.png" mode="" class="portrait "></image>
					</view>
					<view class="" v-if="item.reply_total">
						<view class="m-t-5 width-fit text  " v-for="(item1,index1) in item.top_reply" :Key='index1'>
							<text class="m-l-5 font-s-16 E-word-wrap">{{item1}}</text>
						</view>
						<view class="m-t-5 font-c-gray flex jcsb">
							<view class="">
								共{{item.top_reply.length}}个回答
							</view>
							<view class="">
								{{item.utime}}
							</view>
						</view>
					</view>

					<view class="m-t-5 m-l-5" v-else>
						暂无问答
					</view>

				</view>


			</view>

		</view>
	</view>

</template>

<script>
	import dayjs from 'dayjs'
	export default {
		components: {},
		props: {},
		data() {
			return {
				list: '',
				title: ""
			}
		},
		methods: {},
		mounted() {
			this.list = uni.getStorageSync('qa')
			this.title = `问大家（${this.list.length}）`
			uni.setNavigationBarTitle({
				title: `问大家（${this.list.length}）`
			})			
			this.list.map(a=>{
				a.utime= dayjs(a.utime).format('YYYY-MM-DD')
			})
			console.log(this.list)
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
	.qa {
		.portrait {
			width: 60rpx;
			height: 60rpx;
		}

		.qa-one {
			background-color: #F1F1F1;

			border-radius: 15rpx;
			margin: 10rpx 15rpx;
			// height: 200rpx;

			.portrait {
				width: 40rpx;
				height: 40rpx;
			}

			.text {
				width: 100%;
			}


		}
	}
</style>
