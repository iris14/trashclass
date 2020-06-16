// pages/voice/voice.js
const app = getApp();
//引入插件：微信同声传译
var plugin = requirePlugin("WechatSI")
//获取全局唯一的语音识别管理器recordRecoManager
let manager = plugin.getRecordRecognitionManager()
Page({
  data: {
    garList: "",
    garSearchList: "",
    searchGar: "garbageName",
    hotSearchGar: "garbage",
    noGarbage: 'showNone',
    voiceBtn: "voiceWrap",
    inputValue: null,//搜索内容
    recordState: false, //录音状态
    voiceStyle: "voiceStyle" //录音键样式
    // id:""
  },

//获取输入框内容
  getInput: function (e) {
    var inputData = e.detail.value;
    // console.log(inputData);
    if (inputData == "") {
      this.setData({
        searchGar: 'showNone',
        //hotSearchGar: 'garbage',
      });
    }
  },

  // 搜索函数
  formSubmit: function (e) {//e是自带的
    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    // console.log(e);
    var formData = e.detail.value;   //获取当前input的值
    // console.log(formData);
    //搜索值为空的时候，显示热搜
    if (formData == "") {
      that.setData({
        searchGar: 'showNone',
        voiceBtn: 'voiceWrap',
        //hotSearchGar: 'garbage',
        noGarbage: 'showNone',
      });
    } else {
      wx.request({
        url: apiRootPath + 'getGarbageType.php',
        data: {
          garbageName: formData,
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        method: 'POST',
        dataType: 'json',
        responseType: 'text',
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
              //  console.log(resData);
              resData.data.forEach(function (item, index) {   //item指数组中的每个元素值，index表示索引
                //console.log(item);
                resList.push(item);
              });
              that.setData({
                garSearchList: resList,
                searchGar: 'garbageName',
                voiceBtn: 'showNone',
                //hotSearchGar: 'showNone',
                noGarbage: 'showNone',
              });
            }
          } else {
            that.setData({
              garSearchList: resList,
              searchGar: 'showNone',
              voiceBtn: 'showNone',
              //hotSearchGar: 'showNone',
              noGarbage: ' haveNotGarbage',//是请求状态不ok的时候显示没有垃圾，而不是无记录的时候
            });
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
      })//request结束
    }//最外层else结束
  },

  //微信插件同声传译实现语音识别
  //初始化
  initRecord: function() {
    var that = this;
    //有新的识别内容返回时调用
    manager.onRecognize = function (res) {
      console.log("current result", res.result)
    }
    //正常开始录音识别时调用
    manager.onStart = function (res) {
      wx.showToast({
        title: '开始录音',
      })
      console.log("成功开始录音识别", res)
    }
    //识别错误事件
    manager.onError = function (res) {
      console.error("error msg", res.msg)
    }
    //识别结束事件
    manager.onStop = function (res) {
      // console.log("record file path", res.tempFilePath)
      // console.log("result", res.result)
      
      if(res.result == ''){
        //录音内容为空时
        wx.showModal({
          title: '提示',
          content: '不好意思，典典没听清',
          showCancel: false,
          success: function (res) {}
        })
        return;
      }
      else{
        //不为空时提示开始识别
        wx.showToast({
          title: '正在识别',
          icon: 'loading'
        })
        var text = res.result.replace(/，/, ' ').replace(/。/gi, '');//正则去除文本结尾句号
        //将识别结果显示在输入框
        that.setData({
          inputValue: text
        })
        //调用接口，将识别结果传入后台查找对应垃圾
        var apiRootPath = app.globalData.apiRootPath;
        wx.request({
          url: apiRootPath + 'getGarbageType.php',
          data: {
            garbageName: text,
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: 'POST',
          dataType: 'json',
          responseType: 'text',
          //成功调用
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
                //  console.log(resData);
                resData.data.forEach(function (item, index) {   //item指数组中的每个元素值，index表示索引
                  //console.log(item);
                  resList.push(item);
                });
                that.setData({
                  garSearchList: resList,
                  searchGar: 'garbageName',
                  voiceBtn: 'showNone',
                  //hotSearchGar: 'showNone',
                  noGarbage: 'showNone',
                });
              }
            } else {
              that.setData({
                garSearchList: resList,
                searchGar: 'showNone',
                voiceBtn: 'showNone',
                //hotSearchGar: 'showNone',
                noGarbage: ' haveNotGarbage',//是请求状态不ok的时候显示没有垃圾，而不是无记录的时候
              });
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
        })//request结束
      }
      
    }
  },
  //按住说话
  touchStart: function(e){
    this.setData({
      // recordState: true, //录音状态
      voiceStyle: "voiceStyleDown"
    })
    //开始识别
    manager.start({
      lang: 'zh_CN',
    })
  },
  //松开结束
  touchEnd: function(e){
    this.setData({
      // recordState: false
      voiceStyle: "voiceStyle"
    })
    //结束识别
    manager.stop();
  },

  onLoad() {
    /*获取导航高度*/
    this.setData({
      navH: app.globalData.navHeight
    });
    var that = this;
    /*识别语音*/
    that.initRecord();
  },
  //返回键
  navBack: function () {
    wx.navigateBack({
      url: ''
    })
  },
  //取消搜索回到语音状态
  cancelBack: function () {
    this.setData({
      searchGar: 'showNone',
      voiceBtn: 'voiceWrap',
      //hotSearchGar: 'garbage',
      noGarbage: 'showNone',
      inputValue: '',
    });
  },
  //搜索出来的内容点击跳转到搜索结果页面
  tosearchtype: function (e) {
    // console.log(e.target.id);
    wx.navigateTo({
      url: '../searchtype/searchtype?grabageId=' + e.target.id,
    })
  },
  // // 热搜的垃圾类别跳转到指南针页面(即四个分类页)
  // switchToClassify: function (e) {
  //   wx.navigateTo({
  //     url: '../classify/classify?type_id=' + e.target.id,
  //   })
  // },
  // // 热搜的垃圾跳转到搜索结果页面
  // switchToSearchtype: function (e) {
  //   wx.navigateTo({
  //     url: '../searchtype/searchtype?grabageId=' + e.target.id,
  //   })
  // }
})