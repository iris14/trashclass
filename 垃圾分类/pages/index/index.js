//index.js
//获取应用实例
const app = getApp();

Page({
  data: {
    garbageName1: "",
    garbageName2: "",
    garbageName3: "",
    garbageName4: "",
    garTypeId1: "",
    garTypeId2: "",
    garTypeId3: "",
    garTypeId4: "",
    time: "早上好",
    noteAto: "",
    noteSentc: "",
    noteImg: "",
  },

  //跳转到指南针页
  dispath1: function () {
    wx.navigateTo({
      url: '../classify/classify?type_id=' + this.data.garTypeId1,
    })
  },
  dispath2: function () {
    wx.navigateTo({
      url: '../classify/classify?type_id=' + this.data.garTypeId2,
    })
  },
  dispath3: function () {
    wx.navigateTo({
      url: '../classify/classify?type_id=' + this.data.garTypeId3,
    })
  },
  dispath4: function () {
    wx.navigateTo({
      url: '../classify/classify?type_id=' + this.data.garTypeId4,
    })
  },
  //显示操作菜单跳转到拍照识别/语音识别/文本搜索页面
  cameraBtn: function () {
    //调用操作菜单
    wx.showActionSheet({
      itemList: ['拍照识别', '语音识别', '文本搜索'],
      success(res) {
        //成功回调
        //console.log(res.tapIndex);
        switch(res.tapIndex){
          case 0: wx.navigateTo({
            url: '../photo/photo', //跳转到拍照识别
          });break;
          case 1: wx.navigateTo({
            url: '../voice/voice', //跳转到语音识别
          });break;
          case 2: wx.navigateTo({
            url: '../search/search', //跳转到文本搜索
          });break;
        }
      },
      fail(res) {
        //请求失败
        console.log(res.errMsg)
        // wx.showModal({
        //   title: '提示',
        //   content: '跳转失败，请重试！',
        //   showCancel: false,
        //   success: function(res){
        //     if(res.confirm){
        //       //返回
        //       wx.navigateBack();
        //     }
        //   }
        // })
      }

    })
  },
  //跳转到搜索页
  dispath5: function () {
    wx.navigateTo({
      url: '../search/search',
    })
  },
  // 跳转到用户反馈页
  dispath6: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  },

  /*问候语时间判断显示*/
  getCurrentTime: function () {
    var that = this;
    //获取当前时间戳  
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    //获取当前时间  
    var n = timestamp * 1000;
    var date = new Date(n);
    //年  
    var Y = date.getFullYear();
    //月  
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    //日  
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    //时  
    var h = date.getHours();
    if (h >= 0 && h <= 6) {
      this.setData({
        time: "凌晨了，早点睡吧！"
      })
    } else if (h > 6 && h <= 12) {
      this.setData({
        time: "上午好！"
      })
    } else if (h > 12 && h <= 18) {
      this.setData({
        time: "下午好！"
      })
    } else if (h > 18 && h <= 24) {
      this.setData({
        time: "晚上好！"
      })
    }
  },

  /*卡片页打开*/
  showNote: function () {
    this.setData({
      isNoteTrue: true
    })
  },
  /*卡片页关闭*/
  hideNote: function () {
    this.setData({
      isNoteTrue: false
    })
  },

  // /* 每日一句随机生成图片地址 */
  dailyImage: function () {
    this.setData({
      isNoteTrue: true
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
    /*获取时间*/
    this.getCurrentTime();
    /*调用卡片数据加载函数*/
    // this.noteLoad();

    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    //显示垃圾类别
    wx.request({
      url: apiRootPath + "showGarbageType.php",
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
        that.setData({
          garbageName1: resData.data[0].type_name,
          garbageName2: resData.data[1].type_name,
          garbageName3: resData.data[2].type_name,
          garbageName4: resData.data[3].type_name,
        });
        that.data.garTypeId1 = resData.data[0].type_id;
          that.data.garTypeId2 = resData.data[1].type_id;
          that.data.garTypeId3 = resData.data[2].type_id;
          that.data.garTypeId4 = resData.data[3].type_id;
      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '信息请求失败',
          showCancel: false,
        })
      },

    });
    

    /* 每日一句随机生成图片地址 */
    var that = this;
    that.setData({
      noteImg: "",
    });
    var apiRootPath = app.globalData.apiRootPath;
    wx.request({
      url: apiRootPath + 'getDailyImageUrl.php',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      dataType: 'json',
      responseType: 'text',
      success: function (res) {
        var resData = res.data;
        // console.log(resData.data[0].imageUrl);
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
            that.setData({
              noteImg: resData.data[0].imageUrl, //卡片图片
            });
          }
        } else {
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
    });
    // wx.downloadFile({
    //   url: that.data.noteImg,
    //   success: function (res) {
    //     if (res.statusCode === 200) {
    //       console.log('图片下载成功' + res.tempFilePath)
    //       const fs = wx.getFileSystemManager()
    //       fs.saveFile({
    //         tempFilePath: res.tempFilePath, // 传入一个临时文件路径
    //         success(res) {
    //           console.log('图片缓存成功', res.savedFilePath) // res.savedFilePath 为一个本地缓存文件路径  
    //           wx.setStorageSync('image_cache', res.savedFilePath)
    //         }
    //       })
    //     } else {
    //       console.log('响应失败', res.statusCode)
    //     }
    //   }
    // });
  },
})