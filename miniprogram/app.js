// app.js
App({
  url: 'https://anycodes-blog.devsapp.net/',
  onLaunch() {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })
  },
  globalData: {
    userInfo: null
  },
  // 统一请求接口
  doPost: function (uri, data, option) {
    const that = this
    return new Promise((resolve, reject) => {
      wx.request({
        url: that.url + uri,
        data: data,
        header: {
          "Content-Type": "text/plain"
        },
        method: option && option.method ? option.method : "POST",
        success: function (res) {
          console.log(res)
          resolve(res.data)
        },
        fail: function (res) {
          console.log(res)
          reject(null)
        }
      })
    })
  }
})