// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    cur_nav: 'index',
    cur_page: 0,
    total_page: 100,
    blog_list: []
  },
  onLoad() {
    wx.showLoading({
      icon: "loading",
      title: '数据加载中 ...',
    })
    this.setData({
      title: "Anycodes博客"
    })
    const that = this
    app.doPost(`index/${this.data.cur_page + 1}`, {}, {
      method: "GET"
    }).then(function (result) {
      wx.hideLoading()
      console.log(result)
      try {
        that.setData({
          blog_list: that.data.blog_list.concat(result.data),
          cur_page: Number(result.page[0]),
          total_page: Number(result.page[1])
        })
      } catch (e) {
        wx.showToast({
          title: '我是有底线的',
        })
      }

    })
  },
  onReachBottom: function () {
    this.onLoad()
  },
  toContent: function(data){
    const url = data.currentTarget.dataset.url
    wx.navigateTo({
      url: `/pages/content/index?target=index&url=${url}`,
    })
  },
  onShareAppMessage: function () {
    return {
      title: "Anycodes博客",
    }
  },
  onShareTimeline(){
    return {
      title: "Anycodes博客",
    }
  },
  NavChange(data){
    wx.redirectTo({
      url: `/pages/${data.currentTarget.dataset.cur}/index`,
    })
  }
})