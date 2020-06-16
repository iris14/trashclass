// pages/chapter/chapter.js
const app = getApp();
var id;
var maxTopicId;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList:"",
    topicName:"",
  },

  /*放大预览漫画*/
  topic_preview: function(e){
    var that = this;
    var id = e.target.id;
    var url = e.url;
    var previewImgArr = [];
    //循环在数据链里面找到和这个id相同的这一组数据，取出这一组数据当中的图片
    var data = that.data.imgList;
    for(var i in data){
      //console.log("id:",id)
      if(id == data[i].cartoon_id){
        console.log("id:",data[i].cartoon_id)
        previewImgArr = data[i].cartoon_img;
      }
    }
    wx.previewImage({
      current: url, //需要预览的图片的http链接
      urls: [previewImgArr], //需要预览的图片http链接列表
    })
  },
  /* 跳转到下一板块 */
  toNextChapter:function(){
    var nextId = parseInt(id) + 1;
    if (id == maxTopicId) {
      wx.showModal({
        title: '提示',
        content: '已到最后一个板块',
        showCancel: false,
      })
    }else{
      wx.navigateTo({
        url: '../chapter/chapter?topicId=' + nextId + '&maxTopicId=' + maxTopicId,
      })
    }
    
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
    var apiRootPath = app.globalData.apiRootPath;
    var topicId = options.topicId;
    maxTopicId = options.maxTopicId;
    // console.log(options.maxTopicId);
    wx.request({
      url: apiRootPath + 'getCartoon.php',
      data: {
        topicId: topicId,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      datatype: 'json',
      success: function (res) {
        var resData = res.data;
        // console.log(resData);
        if (resData.status == "ok") { //判断请求状态是否ok
          if (resData.data == null) { //判断是否有记录
            wx.showModal({
              title: '提示',
              content: '信息显示出问题1',
              showCancel: false,
              success: function (res) {
                if (res.confirm) {
                  //返回“首页”页面
                  wx.navigateBack();
                }
              }
            })
          } else {

            var resList = [];
            resList = resData.data;
            console.log(resData);
            id = topicId;
            that.setData({
              imgList: resList,
              topicName: resList[0].topic_name,
            });
            // console.log(imgList);
          }
        } 
        else {
          wx.showModal({
            title: '提示',
            content: '信息显示出问题2',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                //返回“我的”页面
                wx.navigateBack();
              }
            }
          })
        }
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '信息显示出问题3',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              //返回“我的”页面
              wx.navigateBack();
            }
          }
        })
      }
    })

  },
  //返回键
  navBack: function() {
    wx.switchTab({
      url: '../cartoon/cartoon',
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