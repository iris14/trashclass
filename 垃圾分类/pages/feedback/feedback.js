// pages/feedback/feedback.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  // 返回键
  navBack: function() {
    wx.navigateBack({
      url: "",
    })
  },
  // 跳转到用户反馈界面
  toUserFeedback(){
    wx.navigateTo({
      url: '../userfeedback/userfeedback',
    })
  },
  // 跳转到软件介绍界面
  toSoftIntroduce(){
    wx.navigateTo({
      url: '../softintroduce/softintroduce',
    })
  },
  // 跳转到开发者信息界面
  toDeveloperInfos(){
    wx.navigateTo({
      url: '../developerinfos/developerinfos',
    })
  },
  // 清除剧情的本地缓存
  clearTestStorage(){
    wx.showModal({
      cancelColor: 'cancelColor',
      title:"提示",
      content:"是否要清除剧情测试缓存？",
      success(res){
        //用户确定清除
        if(res.confirm == true){
          wx.removeStorage({
            key: "plottest",
            success: function(res){
              wx.showModal({
                title: "提示",
                content: "剧情测试缓存成功清除",
                showCancel: false
              })
            },
          })
        }
        
      }
    })
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /*获取导航高度*/
    this.setData({
      navH: app.globalData.navHeight
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})