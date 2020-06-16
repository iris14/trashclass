// pages/developerinfos/developerinfos.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailStyle1: false,
    imgIcon1: "/images/caret-down.png",
    detailStyle2: false,
    imgIcon2: "/images/caret-down.png",
    detailStyle3: false,
    imgIcon3: "/images/caret-down.png",
    detailStyle4: false,
    imgIcon4: "/images/caret-down.png"
  },

  //返回键
  navBack: function() {
    wx.navigateBack({
      url: ''
    })
  },
  // 显示开发者详细信息
  showOrHideDetail1(){
    this.setData({
      detailStyle1: !this.data.detailStyle1
    })
    if(this.data.detailStyle1){    //判断详情也是是否显示
      // 显示则让图标变成向上
      this.setData({
        imgIcon1: "/images/caret-up.png"
      })
    }else{
      // 不显示则让图标变成向下
      this.setData({
        imgIcon1: "/images/caret-down.png"
      })
    }
  },
  showOrHideDetail2(){
    this.setData({
      detailStyle2: !this.data.detailStyle2
    })
    if(this.data.detailStyle2){    //判断详情也是是否显示
      // 显示则让图标变成向上
      this.setData({
        imgIcon2: "/images/caret-up.png"
      })
    }else{
      // 不显示则让图标变成向下
      this.setData({
        imgIcon2: "/images/caret-down.png"
      })
    }
  },
  showOrHideDetail3(){
    this.setData({
      detailStyle3: !this.data.detailStyle3
    })
    if(this.data.detailStyle3){    //判断详情也是是否显示
      // 显示则让图标变成向上
      this.setData({
        imgIcon3: "/images/caret-up.png"
      })
    }else{
      // 不显示则让图标变成向下
      this.setData({
        imgIcon3: "/images/caret-down.png"
      })
    }
  },
  showOrHideDetail4(){
    this.setData({
      detailStyle4: !this.data.detailStyle4
    })
    if(this.data.detailStyle4){    //判断详情也是是否显示
      // 显示则让图标变成向上
      this.setData({
        imgIcon4: "/images/caret-up.png"
      })
    }else{
      // 不显示则让图标变成向下
      this.setData({
        imgIcon4: "/images/caret-down.png"
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