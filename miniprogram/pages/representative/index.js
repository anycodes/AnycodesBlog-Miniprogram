// pages/representative/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cur_nav: 'representative',
    TabCur: 0,
    nav_list: [
      {"name": "出版物"},
      {"name": "大项目"},
      {"name": "小程序"},
      {"name": "视频堂"}
    ]
  },
  onLoad: function (options) {
    this.setData({
      TabCur: options.TabCur
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id-1)*60
    })
  },
  NavChange(data){
    wx.redirectTo({
      url: `/pages/${data.currentTarget.dataset.cur}/index`,
    })
  },
  toJingdong(data){
    wx.navigateToMiniProgram({
      appId: 'wx91d27dbf599dff74',
      path: `/pages/item/detail/detail?sku=${data.currentTarget.dataset.sid}`,
      envVersion: 'release',
      success(res) {
          // 打开成功
        console.log(res);
      }
    })
  },
  toMiniP(data){
    wx.navigateToMiniProgram({
      appId: `${data.currentTarget.dataset.mnp}`,
      path: `/pages/index/index`,
      envVersion: 'release',
      success(res) {
          // 打开成功
        console.log(res);
      }
    })
  },
  toBro(data){
    wx.setClipboardData({data: data.currentTarget.dataset.url})
  },
  onShareAppMessage: function () {
    return {
      title: "代表作品 - Anycodes博客",
      path: `/pages/representative/index?TabCur=${this.data.TabCur}`
    }
  },
  onShareTimeline(){
    return {
      title: "代表作品",
      path: `/pages/representative/index?TabCur=${this.data.TabCur}`
    }
  },
})