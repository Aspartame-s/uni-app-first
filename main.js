// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.global_url = "https://sezb-1301658904.cos.ap-nanjing.myqcloud.com/view"

App.mpType = 'app'

const app = new Vue({
	...App
})


Vue.prototype.$onLaunched = new Promise(resolve => {
    Vue.prototype.$isResolve = resolve
})

Vue.mixin({
	methods: {
		setTabBarIndex(index) {
			if (typeof this.$mp.page.getTabBar === 'function' &&
				this.$mp.page.getTabBar()) {
				this.$mp.page.getTabBar().setData({
					selected: index
				})
			}
		}
	},
	onShareAppMessage(res) {
		console.log(res, 'res')
		if(res.from == 'menu') {
			return {
				title: '微信小程序测试分享',
				path: `/pages/index/index`
			}
		}
	}
})

app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
