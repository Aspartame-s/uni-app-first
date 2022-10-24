Component({
  data: {
    selected: 0,
    color: "#333",
    selectedColor: "#FDBA12",
    list: [{
				pagePath: "/pages/index/index",
				iconPath: "../static/icon/shouyeweixuanzhong@2x.png",
				selectedIconPath: "../static/icon/shouyexuanzhong@2x.png",
				text: "首页"
			}, {
				pagePath: "/pages/course/course",
				iconPath: "../static/icon/kechengweixuanzhong@2x.png",
				selectedIconPath: "../static/icon/kechengxuanzhong@2x.png",
				text: "课程"
			},
			{
				pagePath: "/pages/playground/playground",
				iconPath: "../static/icon/guangchangweixuanzhong@2x.png",
				selectedIconPath: "../static/icon/guangchangxuanzhong@2x.png",
				text: "广场"
			}, {
				pagePath: "/pages/mine/mine",
				iconPath: "../static/icon/mine@2x.png",
				selectedIconPath: "../static/icon/minesl@2x.png",
				text: "我的"
			}
		]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
	  console.log(url)
      wx.reLaunch({url})
      // this.setData({
      //   selected: data.index
      // })
    }
  }
})