// pages/guide/guide.js
//获取应用实例
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //判断小程序的api是否能够在当前版本使用
    userInfo: {},
  },

//点击按钮调用bindgetuserinfobindgetuserinfo钩子，引导用户授权
  onAuth() {
    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    var db = "no"; //声明一个变量作为判断授权是否成功，'no'不成功,'yes'成功
    wx.getSetting({ //获取当前用户设置
      success: (res) => { //成功授权
        console.log(res);
        if (res.authSetting['scope.userInfo']) { //判断用户授权结果
          wx.getUserInfo({ //获取用户信息
            lang: "zh_CN",
            success: function(res) {
              //打印用户信息
              console.log("用户信息", res.userInfo);
              // that.setData({
                db = "ok";
              // });
              if (db = "ok") { //用户同意授权，进行登录
                wx.login({
                  success: function(loginRes) { //登录成功
                    console.log(loginRes);
                    console.log("===================================================");
                    var gender;
                    if(res.userInfo.gender == 1){
                      gender = '男';
                    }
                    else{
                      gender = '女';
                    }
                    console.log(gender);
                    wx.request({ //用login接口返回的code去 请求 得到openid和session_key(因为不用密码，因此此时session_key暂无用)
                      url: apiRootPath + "saveUserInfo.php?code=" + loginRes.code, //用户登录产生code码传入后台，获取openid（用户的‘身份证’）
                      data: { //将用户信息插入数据库
                        nickName: res.userInfo.nickName,
                        avatarUrl: res.userInfo.avatarUrl,
                        gender: gender,
                        province: res.userInfo.province,
                        city: res.userInfo.city,
                        country: res.userInfo.country
                      },
                      header: {
                        'content-type': 'application/x-www-form-urlencoded'
                      },
                      method: "POST",
                      datatype: 'json',
                      success: function(res) {
                        console.log(res.data.data);
                        wx.setStorage({ //将数据缓存到本地
                          key: 'userInfo', //用户缓存指定的key
                          data: res.data.data,  //缓存的内容
                          success: function(e) {
                            wx.showModal({
                              title: '提示',
                              content: '授权成功',
                              showCancel: false
                            })
                          }
                        })
                      },
                      fail: function() { //请求失败
                        wx.showModal({
                          title: '提示',
                          content: '授权失败，请重试',
                          showCancel: false
                        })
                      }
                    })
                  }
                });
              }
              /*ifend*/
            }
          })
          //授权成功跳转首页
          wx.reLaunch({
            url: '../index/index',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})