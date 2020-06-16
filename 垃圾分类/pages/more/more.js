// pages/more/more.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    spType: "1",
    typename: "",
    btn1: "serveclick",
    btn2: "product",
    spList: "",
    containerH: "",   //内容块的高度
    containerTop: "",  //内容块距离顶部距离
    windowHeight: "",  //窗口总高度
    navHeight: "", //导航高度
    imgbtnHeight: "", //图片按钮高度
    typeHeight: "",  //类型名高度
  },
  //跳转到推文
  severUrlBtn: function (e) {
     console.log("id",e.target.id);
    wx.navigateTo({
      url: '../tweet/tweet?sever_id=' + e.target.id,
    })
  },
  //跳转服务页
  servePath: function () {
    wx.reLaunch({
      url: '../more/more?server_type=1',
    })
    console.log(1)
  },
  //跳转产品页
  productPath: function () {
    wx.reLaunch({
      url: '../more/more?server_type=2',
    })
    console.log(2)
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
    /*获取content块和垃圾介绍块高度*/
            //创建节点选择器
            let query = wx.createSelectorQuery();
            //选择id
            query.select('.imgbtn').boundingClientRect()
            query.select('.type').boundingClientRect()
            query.exec(function (res) {
              let imgbtnHeight = res[0].height
              let typeHeight = res[1].height
              let windowHeight = wx.getSystemInfoSync().windowHeight
              let containerH = windowHeight - imgbtnHeight -typeHeight  - 30
              console.log("windowH",windowHeight)
              console.log("containerH",containerH)
              that.setData({
                containerH: containerH
              })
            });
    var apiRootPath = app.globalData.apiRootPath;

    //给server_type赋值
    if(options.server_type == null){
      var spType = 1;
    }
    else{
      var spType = options.server_type;
    }
        //调用改变图片按钮样式函数
    this.changeBtnStyle(spType);

    //调用改变类型名称函数
    this.changeTypename(spType);
    wx.request({
      url: apiRootPath + "getServerType.php",
      data: {
        server_type: spType
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      datatype: 'json',
      success: function (res) {
        var resData = res.data;
        var resList = [];
        resData.data.forEach(function (item, index) {
          //console.log(item);
          resList.push(item);
        });
         console.log(res.data);
         
        that.setData({
          spList: resList,
        });

      },
      fail: function () {
        wx.showModal({
          title: '提示',
          content: '信息请求失败',
          showCancel: false,
        })
      }
    })
  },

  /*改变图片按钮样式*/
  changeBtnStyle: function (spType) {
    var that = this;
    if (spType == 1) {
      this.setData({
        btn1: "serveclick"
      })
    }
    if (spType ==2) {
      this.setData({
        btn2: "productclick",
        btn1: "serve"
      })
    }
  },

  /*改变类型名称*/
  changeTypename: function (spType){
    var that = this;
    if(spType==1)
    {
      that.setData({
        typename: "服务"
      })
    }
    if(spType == 2){
      that.setData({
        typename: "产品"
      })
    }
  }
})