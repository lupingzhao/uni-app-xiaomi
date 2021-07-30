import http from './index'

// 接口文件
export default {
	// 搜索
	searchView: {
		// 搜索
		search(query) {
			return http.get(`/Search/suggest?query=${query}`)
		},
		//搜索框占位符
		placeHolder() {
			return http.get('/Search/placeHolder')
		},
		// 搜索热词
		hotWord() {
			return http.get('/Search/hotWords')
		},
		// 获取优惠券
		couponCount() {
			return http.get('/User/couponCount')
		},
		// 更新
		// data.type 0新增 1优化 2修复 传数字
		update(arrt) {
			return http.get(`/User/updateHistory?type=${arrt}`)
		},
		// 获取用户优惠券 类型 0可用 1不可用 传字符串的数字
		user(type) {
			return http.get(`/User/coupon?type=${type}`)
		}
	},
	// 生活板块
	life: {
		// 推荐文章
		// uuid	string	是	当前文章ID	42963
		// page	string	是	页数	1
		// pageSize	string	是	数据条数	10
		recomArticle(uuid, page, pageSize) {
			return http.get(`/Life/getSimilarFeed?uuid=${uuid}&page=${page}&pageSize=${pageSize}`)
		},
		// 文章详情
		articleDetails(uuid, page, pageSize) {
			return http.get(`/Life/detail?uuid=${uuid}`)
		},
		// 生活板块
		// tab	string	是	tabID	10000
		// page	string	是	页数	1
		// pageSize	string	是	数据条数	10
		LifePlate(tab, page, pageSize) {
			return http.get(`/Life/getHomeTab?tab=${tab}&page=${page}&pageSize=${pageSize}`)
		},
		// 生活板块首页
		LifeIndex() {
			return http.get(`/Life/bktrSimple`)
		},

	},
	// 商品
	goods: {
		// 商品详情图片
		// gid	string	是		
		// title	string	是		
		// type	string	是
		detailImg(gid, title, type) {
			return http.get(`/Goods/detailImg?gid=${gid}&title=${title}&type=${type}`)
		},
		// 分类获取商品列表
		// sortBy: 综合排序传0 销量排序传8  新品传7 价格降序传2 价格升序传1 信用排序传6 
		// [{
		// 	queryName: this.value,
		// 	queryType: 0,
		// 	rule: []
		// }],
		ClassificationLst(query, sortBy) {
			return http.post('/Goods/queryIdSearch', {
				filter: {
					attr: [],
					brands: [],
					category1: [],
					category2: [],
					category3: [],
					maxPrice: null,
					minPrice: null,
					services: [],
					special: [],
					specialCoupon: [],
					tags: []
				},
				query: query,
				sortBy: sortBy,
				source: 'searchPage',
				queryid: ''
			})
		},
		//搜索获取商品列表
		doSearch(query, sortBy) {
			return http.post('/Goods/doSearch', {
				filter: {
					attr: [],
					brands: [],
					category1: [],
					category2: [],
					category3: [],
					maxPrice: null,
					minPrice: null,
					services: [],
					special: [],
					specialCoupon: [],
					tags: []
				},
				query: query,
				sortBy: sortBy,
				source: 'searchPage',
				queryid: ''
			})
		},
		// 视频时长	
		getTime() {
			return http.get(`/Common/getTime`)
		},
		// 获取更多问答列表
		askInfo(gid) {
			return http.get(`/Goods/askInfo?gid=${gid}`)
		},
		// gid	string	是		
		// page	string	是		
		// pageSize	string	是		
		// tagId
		// 通过评价标签获取评价列表
		commentContent(gid, page, pageSize, tagId) {
			return http.get(`/Goods/commentContent?gid=${gid}&page=${page}&pageSize=${pageSize}&tagId=${tagId}`)
		},
		// 获取更多评价标签
		commentTag(gid) {
			return http.get(`/Goods/commentTag?gid=${gid}`)
		},
		// 详情页推荐商品-排行榜-问答
		composeTwo(gid) {
			return http.get(`/Goods/composeTwo?gid=${gid}`)
		},

		// 商品详情
		detail(gid) {
			return http.get(`/Goods/detail?gid=${gid}`)
		},
		// 按商品ID查询商品		
		goodsId(gid) {
			return http.post(`/Goods/queryByGids,{
					gid:gid
				}`)
		},
		// 推荐商品
		// type	string	是		
		// offset	string	是		
		// limit	string	是		
		// gid_list
		recommend(type, offset, limit) {
			return http.get(
				`/Goods/recommend?type=${type}&offset=${offset}&limit=${limit}`)
		},
	},
	// 分类
	Category: {
		// 通过一级分类获取二级分类
		askInfo1(catId) {
			return http.get(`/Category/detail?catId=${catId}`)
		},
		// 一级分类
		askInfo() {
			return http.get(`/Category/list`)
		},
	},
	// 首页
	index: {
		// BEST商品列表
		bestGoods() {
			return http.post('/HomePage/bestGoods')
		},
		// 首页
		home(Agent) {
			return http.get(`/HomePage/appHomeData?User-Agent=${Agent}`)
		},
		// BEST
		homeBest() {
			return http.get('/HomePage/best')
		},
		// 总榜商品列表
		topGoodsList(offset, limit) {
			return http.get(`/HomePage/topGoodsList?offset=${offset}&limit=${limit}`)
		},
		// 总榜
		topList() {
			return http.get('/HomePage/topList')
		},
		// 直播列表
		live() {
			return http.get('/HomePage/live')
		},
		// 秒杀
		seckill(type, offset, limit, planid) {
			return http.get(
				`/HomePage/seckill?type=${type}&offset=${offset}&limit=${limit}&plan_id=${planid}`)
		},
		// 众筹	
		crowdfunding() {
			return http.get('/HomePage/crowdfunding')
		},
		// 每日上新
		dayNew() {
			return http.get('/HomePage/new')
		},
		// 按分类获取首页底部商品列表
		list(index, queryid) {
			return http.get(`/HomePage/feeds?index=${index}&query_id=${queryid}`)
		},
		// 	首页数据
		homeData() {
			return http.get('/HomePage/homeData')
		},
		// 测试
		text() {
			return http.get('/HomePage/yiyan')

		}

	}

}
