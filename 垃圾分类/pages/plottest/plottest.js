// pages/plottest/plottest.js
const app = getApp();
const apiRootPath = app.globalData.apiRootPath;   //接口根目录
Page({

  /**
   * 页面的初始数据
   */
  data: {
    garList: []
  },

  /* 点击字体进入相应场景 */
  totestpath: function(plotIdObj) {
    console.log(plotIdObj);
    var plotId = plotIdObj.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../testscene/testscene?plot_id=' + plotId
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

    var that = this;
    wx.request({
      url: apiRootPath + 'getPlotNames.php',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      dataType: 'json',
      success: function(res) {
        var resData = res.data;
        // console.log(resData);
        if(resData.status == "ok"){    //判断请求状态是否ok
          if (resData.data == null) {    //判断是否有记录
            wx.showModal({
              title: "提示",
              content: '信息显示出问题',
              showCancel: false
            })
          } else {
            that.setData({
              garList: resData.data
            });
            console.log(that.data.garList);
          }
        }
      },
      fail: function(){
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