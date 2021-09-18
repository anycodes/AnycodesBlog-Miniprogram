// pages/content/index.js
// 获取应用实例
const app = getApp()
// var WxParse = require('../../wxParse/wxParse.js');
Page({

  data: {
  },

  onLoad: function (options) {
    this.setData({
      cur_nav: options.target,
      url: options.url
    })
    wx.showShareMenu({
      menus: ['shareAppMessage', 'shareTimeline']
    })

    wx.showLoading({
      icon: "loading",
      title: '数据加载中 ...',
    })
    const that = this
    app.doPost(`content`, {url: options.url}, {
      method: "POST"
    }).then(function (result) {
      wx.hideLoading()
      console.log(result)
      try {
        // WxParse.wxParse('article', 'html', result.content, that,5);
        that.setData({
          blog: result
        })
      } catch (e) {
        wx.showToast({
          title: '除了点意外哇',
        })
      }

    })
  },
  toContent: function(data){
    const url = data.currentTarget.dataset.url
    wx.navigateTo({
      url: `/pages/content/index?target=${this.data.cur_nav}&url=${url}`,
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.blog.real_title,
    }
  },
  onShareTimeline(){
    return {
      title: this.data.blog.real_title,
    }
  },
  NavChange(data){
    wx.redirectTo({
      url: `/pages/${data.currentTarget.dataset.cur}/index`,
    })
  },
  onShareAppMessage: function () {
    return {
      title: this.data.blog.real_title,
      path: `/pages/content/index?target=${this.data.cur_nav}&url=${this.data.url}`
    }
  },
  onShareTimeline(){
    return {
      title: this.data.blog.real_title,
      path: `/pages/content/index?target=${this.data.cur_nav}&url=${this.data.url}`
    }
  },
})