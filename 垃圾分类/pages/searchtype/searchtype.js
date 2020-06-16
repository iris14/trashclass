// pages/searchtype/searchtype.js
const app = getApp();
Page({
  data: {
    typeImg: "",
    grabageName: "",
    grabageType:"",
    typeIntroduce:"",
    typeThrow:"",
    typeId:"",
  },
  onLoad: function (options) {
    /*获取导航高度*/
    this.setData({
      navH: app.globalData.navHeight
    });
    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    var grabageId = options.grabageId;
    wx.request({
      url: apiRootPath + 'updateSearchNum.php',
      data: {
        grabageId: grabageId,
      },
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      dataType: 'json',
      success: function(res){
        var resData = res.data;
        // console.log(resData);
        if(resData.status == "ok") {
          if(resData.data == null) {
              wx.showModal({
                title: '提示',
                content: '信息显示出问题1',
                showCancel:false,
                success: function (res) {
                  if (res.confirm) {
                    //返回“首页”页面
                    wx.navigateBack();
                  }
                }
              })
          }else{
            console.log(resData.data);
            that.setData({
              typeImg: "/images/" + resData.data.img_url,
              grabageName: resData.data.gar_name,
              grabageType: resData.data.type_name,
              typeIntroduce: resData.data.type_introduce,
              typeThrow: resData.data.throw_requirement,
              
            });
            that.data.typeId = resData.data.type_id
          }
        }else{
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
      }
    })
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
  },
  //返回键
  navBack: function() {
    wx.navigateBack({
    })
  },
  switchClassify: function(){
    wx.navigateTo({
      url:'../classify/classify?type_id=' + this.data.typeId,
    })
  }
})