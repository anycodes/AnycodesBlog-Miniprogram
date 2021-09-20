// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    cur_nav: 'category',
    cur_page: 0,
    total_page: 100,
    blog_list: [],

  },
  onLoad(options) {
    wx.showLoading({
      icon: "loading",
      title: '数据加载中 ...',
    })
    this.setData({
      title: `${options.type == 'tags' ? "标签" : "分类"} ${options.name}`,
      optionType: options.type,
      optionName: options.name
    })
    const that = this
    app.doPost(`blog/list/${options.type}`, {'name': options.name}, {
      method: "POST"
    }).then(function (result) {
      wx.hideLoading()
      console.log(result)
      try {
        that.setData({
          blog_list: that.data.blog_list.concat(result.data),
          cur_page: Number(result.page ? result.page[0] : 1),
          total_page: Number(result.page ? result.page[1] : 1)
        })
      } catch (e) {
        console.log(e)
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
      url: `/pages/content/index?target=category&url=${url}`,
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
    wx.navigateTo({
      url: `/pages/${data.currentTarget.dataset.cur}/index`,
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.title,
      path: `/pages/blog_list/index?type=${this.data.optionType}&name=${this.data.optionName}`
    }
  },
  onShareTimeline(){
    return {
      title: this.data.title,
      path: `/pages/blog_list/index?type=${this.data.optionType}&name=${this.data.optionName}`
    }
  },
})