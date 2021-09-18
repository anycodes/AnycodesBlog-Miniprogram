// pages/about/index.js

Page({

  data: {
    cur_nav: 'about',
  },

  onLoad: function (options) {

  },
  NavChange(data){
    wx.redirectTo({
      url: `/pages/${data.currentTarget.dataset.cur}/index`,
    })
  },
  toBro(data){
    wx.setClipboardData({data: data.currentTarget.dataset.content})
  },
  onShareAppMessage: function () {
    return {
      title: "关于博主 - Anycodes博客",
    }
  },
  onShareTimeline(){
    return {
      title: "关于博主 - Anycodes博客",
    }
  }
})