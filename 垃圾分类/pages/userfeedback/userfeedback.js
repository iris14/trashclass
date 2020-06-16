// pages/userfeedback/userfeedback.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",    //标题
    contact: "",    //联系方式
    content: "",   //内容
  },

  //返回键
  navBack: function() {
    wx.navigateBack({
      url: ''
    })
  },
  // 输入反馈标题，将输入内容赋给title
  inputTitle(e){
    this.setData({
      title: e.detail.value
    })
  },
  // 输入联系方式，将输入内容赋给contact
  inputContact(e){
    this.setData({
      contact: e.detail.value
    })
  },
  // 输入反馈内容，将输入内容赋给content
  inputContent(e){
    this.setData({
      content: e.detail.value
    })
  },
  // 点击提交按钮，提交反馈信息
  submitFeedback: function(){
    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    if(that.data.title=="" || that.data.contact=="" || that.data.content==""){
      wx.showModal({
        title: '提示',
        content: '请全部填完，才可提交反馈',
        showCancel: false,
      })
    }else{
      if((/^1[34578]\d{9}$/.test(that.data.contact)) || (/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(that.data.contact))){   //正则表达式判断邮箱或电话的格式是否正确（其中一个对就可调用接口，即只用填写其中一个）
        // 同步获取本地缓存指定key的对应内容
        var open_id = wx.getStorageSync('userInfo')[0].open_id;
        // 请求服务器接口
        wx.request({
          url: apiRootPath + 'insertUserFeedback.php',
          data: {
            openId: open_id,
            title: that.data.title,
            contactWay: that.data.contact,
            content: that.data.content
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          success: function (res) {
            var resData = res.data;
            console.log(resData);
            if (resData.status == "ok") { //判断请求状态是否ok
              wx.showModal({
                title: '提示',
                content: '提交成功！感谢您的反馈',
                showCancel: false,
              })
              that.setData({    //反馈成功后，清除所有文本框内容
                title: "",
                contact: "",
                content: ""
              })
            }else if(resData.status == "over"){   //判断请求状态是否over（over表示今日反馈超过三次）
              wx.showModal({
                title: '提示',
                content: '每日最多可提交三次反馈，您已提交了三次，请明日再反馈！',
                showCancel: false,
              })
            }else{
              wx.showModal({
                title: '提示',
                content: '反馈提交失败！请重试！',
                showCancel: false,
              })
            }
          },
          fail: function(){
            wx.showModal({
              title: '提示',
              content: '请求失败！',
              showCancel: false,
            })
          }
        })
      }else{   //正则表达式判断邮箱的格式是否正确
        wx.showModal({
          title: '提示',
          content: '联系方式不正确！请重新填写！',
          showCancel: false,
        })
      }
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