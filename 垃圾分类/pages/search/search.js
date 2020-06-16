// pages/search/search.js
const app = getApp();
Page({
  data: {
    garList: "",
    garSearchList: "",
    searchGar: "garbageName",
    hotSearchGar: "garbage",
    noGarbage: 'showNone',
    inputValue: null,
    // id:""
  },

  
  getInput: function(e){
    var inputData = e.detail.value;
    // console.log(inputData);
    if (inputData == ""){
      this.setData({
        searchGar: 'showNone',
        hotSearchGar: 'garbage',
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
    if (formData == ""){
      that.setData({
        searchGar: 'showNone',
        hotSearchGar: 'garbage',
        noGarbage: 'showNone',
      });
    }else{
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
                hotSearchGar: 'showNone',
                noGarbage: 'showNone',
              });
            }
          } else {
            that.setData({
              garSearchList: resList,
              searchGar: 'showNone',
              hotSearchGar: 'showNone',
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

  onLoad() {
    /*获取导航高度*/
    this.setData({
      navH: app.globalData.navHeight
    });
    /* 热搜 */
    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    wx.request({
      url: apiRootPath + 'getHotSearch.php',
      data: {},
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      dataType: 'json',
      success: function(res) {
        var resData = res.data;
        // console.log(resData);
        console.log(resData.data);
        if (resData.status == "ok") {   //判断请求状态是否ok
          if (resData.data == null) {    //判断是否有记录
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
          that.setData({
             garList: resData.data,
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
    })

  },
  //返回键
  navBack: function() {
    wx.navigateBack({
      url: ''
    })
  },
  //取消搜索回到热搜状态
  cancelBack: function () {
    this.setData({
      searchGar: 'showNone',
      hotSearchGar: 'garbage',
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
  // 热搜的垃圾类别跳转到指南针页面(即四个分类页)
  switchToClassify: function (e) {
    wx.navigateTo({
      url: '../classify/classify?type_id=' + e.target.id,
    })
  },
  // 热搜的垃圾跳转到搜索结果页面
  switchToSearchtype: function (e) {
    wx.navigateTo({
      url: '../searchtype/searchtype?grabageId=' + e.target.id,
    })
  },
  //跳转到语音识别页面
  switchToVoice: function (e){
    wx.navigateTo({
      url: '../voice/voice',
    })
  }
})