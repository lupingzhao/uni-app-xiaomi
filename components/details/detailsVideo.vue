<template>

	<view class="previewImage" @touchmove.stop.prevent>
		<!-- 返回 -->
		<view class="back flex jcc">
			<image class="img1 mr-10" src="../../static/xy.png" mode="" @click="goback"></image>
			<image src="../../static/mulu.png" mode=""></image>
		</view>
		<!-- 轮播 -->
		<swiper class="swiper" :current="index" @change="swiperChange" :disable-touch="swiper" :circular="true"
			:autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(img, i) in imgs" :key="i">
				<view class="marea">
					<view class="mview" @click="previewImages(index,img.url)">
						<video id="myVideo" v-if="img.type===1" :src='img.url' class="swiper-item"></video>
						<image v-else :src="img.url" mode="" class="swiper-item"></image>
					</view>
				</view>
			</swiper-item>
		</swiper>
		<view class="page flex jcc" v-if="imgs.length > 0">
			<view class="index">
				{{ index + 1 }} / {{ imgs.length }}
			</view>
		</view>

		<!--  图片预览-->
		<u-mask @click="show = false" :show="show">

			<view class="warp">
				<view class="rect" @tap.stop>
					<swiper class="swiper" :current="index1" :disable-touch="swiper" :circular="true">
						<swiper-item v-for="(img, i) in imgs" :key="i">
							<view class="marea">
								<view class="mview" @click="previewImages(index,img.url)">
									<video v-if="img.type===1" :src='img.url' class="swiper-item"></video>
									<image v-else :src="img.url" mode="" class="swiper-item"></image>
								</view>
							</view>
						</swiper-item>
					</swiper>


					<view class="page flex jcc" v-if="imgs.length > 0">
						<view class="index">
							{{ index + 1 }} / {{ imgs.length }}
						</view>
					</view>
				</view>
			</view>
		</u-mask>


	</view>


</template>

<script>
	export default {
		components: {},
		props: {
			imgs: {
				//图片列表
				type: Array,
				required: true,
				// 预览


			},

		},
		data() {
			return {
				swiper: false, //是否禁用
				index: 0, //当前页
				index1: 0, //当前页
				time: 0, //定时器
				show: false,
				// scale: 1 //缩放比例
				// 是否播放
				autoplay: false

			}
		},
		methods: {
			// 实现轮播和预览轮播
			previewImages(index, url) {
				let that = this
				if (index !== 0) {
					this.show = true
					this.index1 = index
				} else {
					this.autoplay = !this.autoplay
					// 当前是暂停的时候
					if (!this.autoplay) {
						// console.log(222)
						// 点击播放
						that.videoContext.play();
						that.autoplay = false
					} else {
						// console.log(222222222)
						that.autoplay = true
						that.videoContext.pause();
					} /*  */

				}

			},
			//图片切换
			swiperChange(e) {
				// console.log(111)				
				this.index = e.target.current; //更新当前图片index

			},
			// 返回
			goback() {
				uni.navigateBack()
			}

		},
		mounted() {
			// console.log(this.imgs)
			this.videoContext = uni.createVideoContext('myVideo')
			// console.log(this.videoContext)
			// this.videoContext.pause();
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
	.previewImage {
		// background-color: #007AFF;
		height: 450rpx;

		.back {
			width: 150rpx;
			position: fixed;
			top: 10rpx;
			/* #ifdef MP-WEIXIN */
			margin-top: 55rpx;
			/* #endif */
			left: 10rpx;
			z-index: 9;
			background-color: rgba(0, 0, 0, 0.5);
			padding: 5rpx 10rpx;
			border-radius: 20rpx;

			image {
				width: 50rpx;
				height: 50rpx;
			}

			.img1 {
				width: 30rpx !important;
				height: 30rpx !important;
			}
		}

		.swiper {
			width: 100%;
			height: 450rpx;

			.swiper-item {
				width: 100%;
				height: 450rpx;
			}
		}

		.page {
			position: absolute;
			left: 50%;
			right: 0;
			width: fit-content;
			transform: translateY(-120%);

			.index {
				transform: translateX(-50%);
				padding: 10rpx 15rpx;
				background-color: rgba(241, 241, 241, 0.5);
				border-radius: 10rpx;

			}


		}

		.warp {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 100%;
		}

		.rect {
			width: 100%;
			height: 450rpx;
			// background-color: #fff;
		}
	}
</style>
