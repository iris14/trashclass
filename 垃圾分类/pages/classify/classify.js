// pages/classify/classify.js
const app = getApp();
var indexArr = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
Page({
  data: {
    arrIdArr: indexArr,
    indexShow: false,
    indexEnglish: '',
    toViewId: '', //scroll-view 跳转id
    typeName: "",
    typeIntroduce: "",
    throwRequirement: "",
    imgUrl: "",
    garList: "",
    btn1: "btnputerscible",
    btn2: "btnother",
    btn3: "btnrecoverable",
    btn4: "btnharmful",
    viewHeight: "",  //垃圾介绍块高度
    contentH: "",    //content容器高度
    fuev:"",
  },
  //跳转分类页
  dispath1: function() {
    wx.redirectTo({
      url: '../classify/classify?type_id=1',
    })
  },

  dispath2: function() {
    wx.redirectTo({
      url: '../classify/classify?type_id=2',
    })
  },
  dispath3: function() {
    wx.redirectTo({
      url: '../classify/classify?type_id=3',
    })
  },
  dispath4: function() {
    wx.redirectTo({
      url: '../classify/classify?type_id=4',
    })
  },
  /*改变按钮背景颜色*/
  getBackgroundColor: function(typeid) {
    var that = this;
    var rubTypeId1 = "1",rubTypeId2 = "2",rubTypeId3 = "3",rubTypeId4 = "4";
    if(typeid == rubTypeId1){
      this.setData({
        btn1: "btnclick"
      })
    }
    if(typeid == rubTypeId2){
      this.setData({
        btn2: "btnclick"
      })
    }
    if(typeid == rubTypeId3){
      this.setData({
        btn3: "btnclick"
      })
    }
    if(typeid == rubTypeId4){
      this.setData({
        btn4: "btnclick"
      })
    }
  },
    /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    /*获取导航高度*/
    this.setData({
      navH: app.globalData.navHeight
    });
    
    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    var type_id = options.type_id;
    this.getBackgroundColor(type_id);
    // console.log(type_id);
    wx.request({
      url: apiRootPath + 'showTypeAndGarbage.php',
      data: {
        typeId: type_id,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      datatype: 'json',
      success: function(res) {
        var resData = res.data;
        console.log(resData);
        if (resData.status == "ok") { //判断请求状态是否ok
          if (resData.data == null) { //判断是否有记录
            wx.showModal({
              title: '提示',
              content: '信息显示出问题1',
              showCancel: false,
              success: function(res) {
                if (res.confirm) {
                  //返回“首页”页面
                  wx.navigateBack();
                }
              }
            })
          } else {
            
            var resList = [];
            //console.log(resData.data.garbage[0]);
            // resData.data[1].forEach(function(item, index) {
            //   //console.log(item);
            //   resList.push(item);
            // });
            resList = resData.data.garbage[0];
            console.log(resList);
            // console.log(resData.data.type);
            that.setData({
              typeName: resData.data.type[0][0].type_name,
              typeIntroduce: resData.data.type[0][0].type_introduce,
              throwRequirement: resData.data.type[0][0].throw_requirement,
              imgUrl: "../../images/" + resData.data.type[0][0].img_url,
              garList: resList,
            });
            // console.log(garList);
            /*获取content块和垃圾介绍块高度*/
            //创建节点选择器
            var query1 = wx.createSelectorQuery();
            //选择id
            query1.select('#contentH').boundingClientRect();
            query1.select('#viewHeight').boundingClientRect();
            query1.exec(function (res) {
              console.log(res);
              console.log(res[0].height);
              console.log(res[1].height);
              that.setData({
                viewHeight:res[1].height,
                contentH:res[0].height
              })
            });
            /*获取垃圾介绍块高度
            //创建节点选择器
            var query = wx.createSelectorQuery();
            //选择id
            query.select('#viewHeight').boundingClientRect();
            query.exec(function (res) {
              console.log(res);
              console.log(res[0].height);
              that.setData({
                viewHeight: res[0].height
              })
            });*/
          }
        } else {
          wx.showModal({
            title: '提示',
            content: '信息显示出问题2',
            showCancel: false,
            success: function(res) {
              if (res.confirm) {
                //返回“我的”页面
                wx.navigateBack();
              }
            }
          })
        }
      },
      fail: function() {
        wx.showModal({
          title: '提示',
          content: '信息显示出问题3',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              //返回“我的”页面
              wx.navigateBack();
            }
          }
        })
      }
    })
  },
  //处理字母//点击右侧字母导航定位触发
  handleTouchstart(e){
    // console.log(e);
    var that = this; var _id = e.target.id;
    // console.log(_id);
    // console.log(e.target.id);
    that.setData({
      indexShow: true,//让提示框显示
      indexEnglish: _id,//提示框显示的英文字母
      toViewId: _id,
    })
  },
  handleTouchend(e) {
    // console.log('移出', e);
    this.setData({
      indexShow: false
    })
  },
  
  //返回键
  navBack: function () {
    wx.navigateBack({

    })
  }
  

})