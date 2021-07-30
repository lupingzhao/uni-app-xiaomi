<template>
	<view>
		<u-cell-item :arrow="true" arrow-direction="right" v-for="(item,index) in list" :key='index'
			@click='click(item,index)'>
	<!-- 		<template slot="title">
				{{item.name}} <text class="font-s-12 m-l-5 font-c-red">{{sleData[index]}}</text>
			</template> -->
		</u-cell-item>

		<!-- 弹出层 -->
		<u-popup mode="bottom" v-model="show">
			<view class="content p-10">
				<scroll-view scroll-y="true" class="srcoll"  style="height: 700rpx;">
					<view>
						<view class="title font-s-16 font-w-7 mb-10">
							{{popupData.name}}
						</view>
						<!-- 选项 -->
						<view class="flex flex-wrap">
							<!-- 选中数据不为空 -->
							<view class="flex flex-wrap" v-if="sleData[popupindex]">
								<view class="mr-10 mb-10 name"  :class="selectedindex===index || item.name===sleDataSilce[popupindex]?'border':''" v-for="(item,index) in popupData.tags" @click="selected(item.name,index)">
									{{item.name}}
								</view>
							</view>
							<view v-else class="mr-10 mb-10 name"  :class="selectedindex===index?'border':''" v-for="(item,index) in popupData.tags" @click="selected(item.name,index)">
								{{item.name}}
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="confrim-btn" >
					<u-button @click='colse' type="success">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	export default {
		components: {},
		props: {
			list: {
				type: Array
			}
		},
		data() {
			return {
				show: false,
				popupData: '',
				// 选中的数据
				selectedindex:'',
				sleData:[],
				//第几个弹出层
				popupindex:'',
				 sleData1:[],
				 //截取数据
				 sleDataSilce:[]
			}
		},
		methods: {
			// 弹出层
			click(e,index) {
				// console.log(e)
				this.popupData = e
				this.popupindex=index
				this.show = true
				this.selectedindex=''
			},
			// 选中的规格
			selected(e,index){
				// console.log(e)
				this.selectedindex=index
				this.sleData1.splice(this.popupindex,1,`已选中：${e}` )	
			},
			// 点击确定
			colse(){
				this.show=false
				this.sleData=this.sleData1
				this.sleData.map(a=>{
					this.sleDataSilce.unshift(a.slice(4))
				})
				
			}
			
		},
		mounted() {
			// shopTags
			// console.log(this.list)
			this.list.map(a=>{
				this.sleData1.push('')
			})
			
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
	.content {
	.name {
			padding: 15rpx;
			border-radius: 20rpx;
			border: 2rpx solid transparent;
		}
		.border{
				border: 2rpx solid rgb(254, 125, 123);
		}
		
	}
</style>
