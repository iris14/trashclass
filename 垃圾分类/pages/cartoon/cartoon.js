// pages/cartoon/cartoon.js
const app = getApp();
var maxTopicId;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cartoonList:""
  },
  //跳转到各个板块
  chapterPath: function (e) {
    // console.log(e);
    var topicId = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../chapter/chapter?topicId=' + topicId + '&maxTopicId=' + maxTopicId,
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

    /* 调用漫画模块数据得到id */
    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    wx.request({
      url: apiRootPath + "getAllCartoonTopic.php",
      data: {

      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      datatype: 'json',
      success: function (res) {
        var resData = res.data;
        // console.log(resData);
        maxTopicId = resData.data[0].topic_id;
        resData.data.forEach(function (item, index) {
          // console.log(item); //这里的item就是从数组里拿出来的每一个每一组
          var nowId = item.topic_id;
          if (maxTopicId < nowId){
            maxTopicId = nowId;
          }
        })
        // console.log(maxTopicId);
        that.setData({
          cartoonList: resData.data,
        });
        
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '信息请求失败',
          showCancel: false,
        })
      },
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