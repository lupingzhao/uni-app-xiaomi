<template>
	<view>
		<u-modal  v-model="show" content="当前为未登录状态" :mask-close-able="true" :show-cancel-button='true'
			confirm-color='#DD524D' confirm-text='去登陆' title='登陆' @confirm='toLogin'></u-modal>

		<u-toast ref="uToast" />
	</view>

</template>

<script>
	export default {
		components: {},
		props: {

		},
		data() {
			return {
				show: false
			}
		},
		methods: {

			toLogin() {
				// #ifdef MP-WEIXIN		
				wx.getUserProfile({
					desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success: (res) => {
						let user = [res.userInfo.nickName, res.userInfo.avatarUrl]
						uni.setStorageSync('user', user)
						this.$store.commit('setUser',user)
						// 提示
						this.$refs.uToast.show({
							title: '登陆成功',
							type: 'success'
						})
					}
				})
				// #endif

			},
			// 取消
			// cancel() {
			// 	this.$emit('colse')

			// }

		},
		mounted() {

		},
		onLoad() {
			// this.show1=this.show
			// console.log(this.show);
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
