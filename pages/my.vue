<template>
	<view class="my">
		<!-- 头 -->
		<image src="../static/top-bg.png" mode="" class="img"></image>

		<view class="head flex">
			<!-- 用户头像 -->
			<view class="flex">
				<image v-if="!user" src="../static/avatar_default.png" mode="" @click="login" class="user"></image>
				<image v-else :src="user[1]" mode="" class="user" @click="logout"></image>
				<text v-if='user' class="m-l-5"> {{user[0]}}</text>
				<!-- #ifdef MP-WEIXIN -->
					<text v-if='!user' class="m-l-5" @click="login"> 登陆</text>
				<!-- #endif -->
			
			</view>
			<!-- 退出提示 -->
			<u-modal v-model="show" :zoom="true" :mask-close-able='true' confirm-color='#DD524D' :show-title='false' content="退出登陆"  @confirm='out'></u-modal>
		</view>
		<view class="flex jcc">
			<view class="font-w-7 title ">
				我 的
			</view>
		</view>

		<!-- 功能区 -->
		<view class="p-10 width-90 m-c bgc-white b-radius-10">
			<order></order>

			<myfunction></myfunction>

			<more></more>
		</view>

<recommended></recommended>
	</view>

</template>

<script>
	import order from '../components/my/order.vue';
	import myfunction from '../components/my/myfunction.vue';
	import more from '../components/my/more.vue';
	import recommended from '../components/details/recommended.vue'
	export default {
		components: {
			order,
			myfunction,
			more,
			recommended
		},
		props: {},
		data() {
			return {
				title: '我的',
				user: '',
				show:false
			}
		},
		methods: {
			// 退出
			logout(){
				this.show=true
				
			},
			// 点击确定退出
			out(){
				uni.removeStorageSync('user')
				this.user=''
				this.$store.commit('setUser',this.user)
				uni.removeTabBarBadge({
					index: 3
				})
			},
			// 登陆
			login(){
				// #ifdef MP-WEIXIN
			
				wx.getUserProfile({
					desc: '登陆', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
				         this.user = [res.userInfo.nickName, res.userInfo.avatarUrl]
						uni.setStorageSync('user',  this.user)
						this.$store.commit('setUser',this.user)
						// 提示
						this.$refs.uToast.show({
							title: '登陆成功',
							type: 'success'
						})
					}
				})
			
				// #endif
			}
		},
		mounted() {		

		},
		onLoad() {

		},
		onShow() {
                 this.user1
                  // console.log(this.$store.state.user)
				  // #ifdef MP-WEIXIN
				  if(this.$store.state.user){		
				  	if(this.$store.state.carSum){
				  		uni.setTabBarBadge({
				  				text: String(this.$store.state.carSum.length),
				  			// 需要添加角标的导航下标
				  			index: 3
				  		})
				  	}
				  	
				  }else{
				  	uni.removeTabBarBadge({
				  		index: 3
				  	})
				  }					
				  // #endif
		},
		filters: {},
		computed: {
			user1(){
				// 获取用户信息  页面有操作时数据可同步刷新
                  return  this.user= this.$store.state.user
			}
		},
		watch: {},
	}
</script>

<style scoped lang="scss">
	.my {
		.img {
			width: 100vw;
			height: 300rpx;
			position: absolute;
			z-index: -1;
		}

		.head {
			padding: 30rpx;
			padding-top: 60rpx;

			.user {
				width: 100rpx;
				height: 100rpx;
				border-radius: 100%;
				
			}			
		}
		.title {
			margin-top: -80rpx;
		}

	}
</style>
