// pages/tweet/tweet.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    serveUrl: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    var severId = options.sever_id;
    wx.request({
      url: apiRootPath + "getServerInfo.php",
      data: {
        server_id: severId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      datatype: 'json',
      success: function (res) {
        var resData = res.data;
         console.log("url",resData.data[0].sever_url);
        that.setData({
          serveUrl: resData.data[0].sever_url
        });
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '信息请求失败',
          showCancel: false,
        })
      }
    })
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