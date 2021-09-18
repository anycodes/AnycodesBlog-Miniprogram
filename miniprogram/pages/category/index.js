// pages/category/index.js
// 获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_nav: 'category',
    nav_list: [
      {"name": "分类"},
      {"name": "标签"}
    ],
    index: 0,
  },

  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    })
  },
  hideModal(e) {
    this.setData({
      modalName: null
    })
  },
  tabSelect(e) {
    console.log(e);
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  onLoad: function (options) {
    const that = this
    app.doPost(`tags`, {}, option = {
      method: "GET"
    }).then(function (result) {
      wx.hideLoading()
      console.log(result)
      try {
        that.setData({
          tags: result.data
        })
      } catch (e) {
        wx.showToast({
          title: '除了点意外哇',
        })
      }
    })
  },
  toList(data){
  wx.navigateTo({
    url: `/pages/blog_list/index?type=${data.currentTarget.dataset.type}&name=${data.currentTarget.dataset.title}`,
  })
  },
  NavChange(data){
    wx.redirectTo({
      url: `/pages/${data.currentTarget.dataset.cur}/index`,
    })
  },
  onShareAppMessage: function () {
    return {
      title: "分类标签 - Anycodes博客",
    }
  },
  onShareTimeline(){
    return {
      title: "分类标签 - Anycodes博客",
    }
  },
})