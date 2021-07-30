<template>
	<view class="specifications">
		<!-- 规格 -->
		<u-cell-item :arrow="true" arrow-direction="right" @click='click' v-if='list.length>0'>
			<template slot="title">
				选中：
				<text class="font-s-12 mr-5 font-c-red">
					<text class="" v-for="(item,index) in sleData" :key='index'>{{item}}</text>
					<text v-if="sleData[0]">X{{value}}</text>
				</text>

			</template>
		</u-cell-item>
		<!-- 弹出层 -->
		<u-popup mode="bottom" v-model="show">
			<view class="content p-10">
				<scroll-view scroll-y="true" class="srcoll" style="height: 700rpx;">
					<!-- 头部 -->
					<view class="flex a-i-fs">
						<image :src="goodsInfo.picUrl" mode="" class="img"></image>
						<view class="m-l-10 slected ">
							<view class="m-tb-10 font-s-16 font-c-red">
								￥{{goodsInfo.priceMin/100}}
							</view>
							<view class="font-s-12 mr-5 " v-if="list.length>0">
								已选中：
								<text class="font-c-red" v-for="(item,index) in sleData" :key='index'>
									{{item}}
									<text v-if="item&&index!==sleData.length-1">+</text>
								</text>
								<text v-if="sleData[0]" class="font-c-red">X{{value}}</text>
							</view>
						</view>
					</view>
					<!-- 选项 -->
					<view class="">
						<view class="" :key='index' v-for="(item,index) in list" @click='click(item,index)'>
							<view class="m-t-10 font-s-16 font-w-7">
								{{item.name}}
							</view>
							<view class="flex flex-wrap m-tb-10 ">
								<view class="name" v-for="(item1,index1) in item.tags"
									:class="selectedindex[index]===index1?'border':''"
									@click="selected(index,index1,item1.name)" :key='index1'>
									{{item1.name}}
								</view>
							</view>
						</view>
					</view>
					<view class="m-tb-10 flex jcsb p-10">
						<view class="">
							数量
						</view>
						<u-number-box :min="1" v-model="value" @change="valChange"></u-number-box>
					</view>
				</scroll-view>
				<view class="confrim-btn">
					<u-button @click='colse' type="success">确定</u-button>
				</view>
			</view>
		</u-popup>

		<!-- 底部导航栏 -->
		<view class="bottom flex p-5 ">
			<view class="icon " @click="goto">
				<view class="flex jcc">
					<image src="../../static/img3.png" mode="" class="bottom-img"></image>
				</view>
				<view class="">
					首页
				</view>
			</view>
			<view class="icon">
				<view class="flex jcc">
					<image src="../../static/img2.png" mode="" class="bottom-img"></image>
				</view>
				<view class="">
					客服
				</view>
			</view>
			<view class="icon pos-rel" @click="goCar">
				<text class="bage" v-if="carSum"> {{carSum}}</text>
				<view class="flex jcc">
					<image src="../../static/img1.png" mode="" class="bottom-img"></image>
				</view>
				<view class="">
					购物车
				</view>
			</view>
			<view class="flex box-btn jcc font-c-w">
				<view class="car flex-1" @click="click">
					加入购物车
				</view>
				<view class="buy flex-1" @click="tobuy">
					立即购买
				</view>
			</view>

		</view>
		<u-toast ref="uToast" />
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			list: {
				type: Array
			},
			goodsInfo: {
				type: Object
			}

		},
		data() {
			return {
				//选中数据
				sleData: [],
				show: false,
				// 选项选中的下标
				selectedindex: [],
				// 选项选中的规格
				sleData1: [],
				sleData: [],
				// 选中数量
				value: 1,
				// 加入购物车 还是立即购买 默认时购物车
				type: 0

			}
		},
		methods: {
			// 弹出层 加入购物车
			click(e, index) {
				// console.log(e)			
				this.show = true
				this.type = 0
			},
			// 选规格 点击规格时
			selected(index, index1, e) {
				// 中间 选中数据 变量
				this.sleData.splice(index, 1, e)
				this.selectedindex.splice(index, 1, index1)
			},
			// 立即购买的方法
			fnToBuy() {
				// 存订单信息
				let total = (this.goodsInfo.priceMin / 100 * this.value).toFixed(2)
				this.$refs.uToast.show({
					title: `结算成功共计￥${total}`,
					type: 'success',

				})
				let order = {
					data: [{
						goods: this.goodsInfo,
						gid: this.goodsInfo.gid,
						order: this.sleData,
						sum: this.value,
					}],
					total: total,
					crateTime:new Date()
				}
				// 本地存储完成订单	 且不管重复与否				
				this.$utils.saveHistory({
					key: 'ALLOrder',
					data: order,
				})

			},
			// 加入购物车的方法
			fnAddCar() {
				// 提示
				this.$refs.uToast.show({
					title: '加入购物车成功',
					type: 'success'
					// url: '/pages/user/index'
				})
				// 要储存的数据
				let saveData={
						goods: this.goodsInfo,
						gid: this.goodsInfo.gid,
						order: this.sleData,
						sum: this.value,
						checked: false
					}
					let arrt=''
				// 获取购物车的数据
				let car=this.$utils.getHistory('car') 
				if(car){
					// 返回一个布尔值
					let boo=car.some(a=>{
						return JSON.stringify(a)===JSON.stringify(saveData)
					})
					if(boo){
						arrt='gid'
					}
				}
				//存购物车数据
				this.$utils.saveHistory({
					key: 'car',
					data: saveData,
					attr: arrt
				})
				// 修改角标
				this.$store.commit('setCarSum', uni.getStorageSync('carHistory'))

			},
			// 点击确定 加入购物车
			colse() {
				this.show = false
				let userInfo = this.$store.state.user
				// #ifdef MP-WEIXIN
				if (!userInfo) {
					this.$refs.uToast.show({
						title: '未登录',
						type: 'info',
					})
					wx.getUserProfile({
						desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: (res) => {
							let user = [res.userInfo.nickName, res.userInfo.avatarUrl]
							uni.setStorageSync('user', user)
							this.$store.commit('setUser', user)
							if(this.type===0){
								this.fnAddCar()
							}else{
								this.fnToBuy()
							}
							
						}
					})
				} else {
					if(this.type===0){
						this.fnAddCar()
					}else{
						this.fnToBuy()
					}

				}
				// #endif

				// console.log(this.sleData)

				// #ifndef MP-WEIXIN
				// 提示
				if(this.type===0){
					this.fnAddCar()
				}else{
					this.fnToBuy()
				}
				// #endif
			},
			// 立即购买
			tobuy() {
				this.show = true
				this.type = 1
				
			},
			// 步进器
			valChange(e) {
				// console.log('当前值为: ' + e.value)
				this.value = e.value
			},
			// 去首页
			goto() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			goCar() {
				uni.switchTab({
					url: '/pages/car'
				})
			},
			// 判断数据是否在购物车存在 是数量的改变还是  规格的改变
			
		},
		mounted() {
			// console.log(this.list)
			// console.log(this.goodsInfo)
			// 添加占位符控制选中的数据
			this.list.map(a => {
				this.sleData.push(a.tags[0].name)
				this.selectedindex.push(0)
			})
			// let a=[{a:'1',b:2},'b','c']
			// let b={a:'1',b:2}
			// console.log(JSON.stringify(a)===JSON.stringify(b));
			
		},
		onLoad() {},
		onShow() {},
		filters: {},
		computed: {
			// 购物车数量角标
			carSum() {
				let sum
				if (this.$store.state.carSum) {
					return sum = this.$store.state.carSum.length
				} else {
					return sum = ''
				}
				return sum

			}
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.specifications {
		.bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			width: 100vw;
			background-color: #FFFFFF;
			z-index: 22;

			.bottom-img {
				width: 40rpx;
				height: 40rpx;
				margin-bottom: 10rpx;

			}

			.bage {
				background-color: #DD524D;
				width: 40rpx;
				height: 40rpx;
				padding: 3rpx;
				border-radius: 100%;
				color: #FFFFFF;
				position: absolute;
				z-index: 2;
				right: -5rpx;
				top: -20rpx;
			}

			.icon {
				width: 13%;
				text-align: center;
				// padding: 20rpx;
			}

			.box-btn {
				width: 60%;
				border-radius: 35rpx;
				overflow: hidden;
			}

			.car {
				width: 50%;
				text-align: center;
				padding: 20rpx;
				background-image: linear-gradient(to right, #FFD916, #FF940E);
			}

			.buy {
				width: 50%;
				text-align: center;
				padding: 20rpx;
				background-image: linear-gradient(to right, #FF532B, #FF0A1C);
			}

			// background-image: linear-gradient(to right, yellow , red);	
		}

		.content {
			.img {
				width: 200rpx;
				height: 200rpx;
				border: 1rpx solid;
			}

			.name {
				padding: 15rpx;
				border-radius: 20rpx;
				border: 2rpx solid #F1F1F1;
				margin-right: 10rpx;
				margin-bottom: 10rpx;
			}

			.border {
				border: 2rpx solid rgb(254, 125, 123);
				color: rgb(254, 125, 123);
			}

			.slected {
				width: 80%;
			}

		}
	}
</style>
