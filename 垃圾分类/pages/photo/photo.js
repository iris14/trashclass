// pages/photo/photo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    btnDown: 'showNone', //拍照预览图样式
    showCamera: '#', //camera组件样式
    regResult: "",
    isNull: 1,
    device:'back'
  },

  /*卡片页关闭*/
  hideNote: function () {
    var that = this;
    that.setData({
      isNoteTrue: false,
      showCamera: '#',
      btnDown: 'showNone'
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
//切换摄像头
devicePosition(){
  this.setData({
    device:!this.data.device,
  })
  console.log("当前相机摄像头为:",this.data.device?"后置":"前置");
},
//从相册选择照片
albumSelected(){
  var that = this;
  var apiRootPath = app.globalData.apiRootPath;
  wx.chooseImage({
      count: 1, //可选取数量
      sizeType: ['original', 'compressed'], //指定原图还是压缩图
      success: function(res){
        console.log("res:", res)
        let base64 = wx.getFileSystemManager().readFileSync(res.tempFilePaths[0], 'base64')
        //console.log(base64)
        //识别中提示
        that.setData({
          src: res.tempFilePaths[0],
          btnDown: '#',
          showCamera: 'showNone'
        })
        wx.showLoading({
          title: '识别中...',
        });
        //上传照片
        wx.request({
          url: apiRootPath + 'AipImageClassify.php',
          data: {
            img: base64
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          dataType: 'json',
          success: function (res) {
            console.log(res.data)
            var resData = res.data;
            if (resData.status = "ok") { //判断请求状态
              if (resData.data == null) {
                //判断是否有记录
                wx.showModal({
                  title: '提示',
                  content: '无法识别',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      that.setData({
                        showCamera: "#",
                        btnDown: 'showNone'
                      })
                    }
                  }
                })
              } else {
                var resList = []; //识别结果数组
                //循环获取识别结果
                resData.data.forEach(function (item, index) {
                  // console.log(item.typename);
                  //判断垃圾类别是否为空
                  if (item.typename != null) {
                    //不为空push进reslist数组
                    resList.push(item);
                  }
                });
                // resList = resData.data;
                //判断识别结果数组是否为空
                  console.log("resList:",resList);
                  console.log("长度：",resList.length);
                  if(resList.length != 0){
                    that.setData({
                      isNull: 0
                    })
                  }
                  else{
                    that.setData({
                      isNull: 1
                    })
                  }
                  that.setData({
                    regResult: resList,
                    isNoteTrue: true
                  })
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '无法识别',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    that.setData({
                      showCamera: "#",
                      btnDown: 'showNone'
                    })
                  }
                }
              })
            }
          },
          fail: function () {
            wx.hideLoading();
            wx.showToast({
              title: '请求超时',
              icon: 'loading',
              duration: 2000
            })
          },
          //结束隐藏识别提示
          complete: function () {
            wx.hideLoading();
          }
        })
      }
  })
},
  //拍照识别
  takePhoto() {
    var that = this;
    var apiRootPath = app.globalData.apiRootPath;
    that.ctx.takePhoto({
      quality: 'high', //图片质量
      success: (res) => { //成功回调
        console.log("res:", res)
        // wx.getFileSystemManager().readFile({
        //   filePath: res.tempImagePath, //选择图片返回的相对路径
        //   encoding: 'base64', //编码格式
        //   success: (res1) => {
        //     console.log("res1:",res1)


        //   }
        // })
        let base64 = wx.getFileSystemManager().readFileSync(res.tempImagePath, 'base64')
        //console.log(base64)
        //识别中提示
        that.setData({
          src: res.tempImagePath,
          btnDown: '#',
          showCamera: 'showNone'
        })
        wx.showLoading({
          title: '识别中...',
        });
        //上传照片
        wx.request({
          url: apiRootPath + 'AipImageClassify.php',
          data: {
            img: base64
          },
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          method: "POST",
          dataType: 'json',
          success: function (res) {
            //console.log(res.data)
            var resData = res.data;
            if (resData.status = "ok") { //判断请求状态
              if (resData.data == null) {
                //判断是否有记录
                wx.showModal({
                  title: '提示',
                  content: '无法识别',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      that.setData({
                        showCamera: "#",
                        btnDown: 'showNone'
                      })
                    }
                  }
                })
              } else {
                var resList = []; //识别结果数组
                //循环获取识别结果
                resData.data.forEach(function (item, index) {
                  // console.log(item.typename);
                  //判断垃圾类别是否为空
                  if (item.typename != null) {
                    //不为空push进reslist数组
                    resList.push(item);
                  }
                });
                // resList = resData.data;
                //判断识别结果数组是否为空
                  console.log("resList:",resList);
                  console.log("长度：",resList.length);
                  if(resList.length != 0){
                    that.setData({
                      isNull: 0
                    })
                  }
                  else{
                    that.setData({
                      isNull: 1
                    })
                  }
                  that.setData({
                    regResult: resList,
                    isNoteTrue: true
                  })
              }
            } else {
              wx.showModal({
                title: '提示',
                content: '无法识别',
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    that.setData({
                      showCamera: "#",
                      btnDown: 'showNone'
                    })
                  }
                }
              })
            }
          },
          fail: function () {
            wx.hideLoading();
            wx.showToast({
              title: '请求超时',
              icon: 'loading',
              duration: 2000
            })
          },
          //结束隐藏识别提示
          complete: function () {
            wx.hideLoading();
          }
        })
        // wx.uploadFile({
        //   url: apiRootPath + 'AipImageClassify.php',
        //   filePath: res.tempImagePath,
        //   name: encodeURI('img'),
        //   formData: {
        //     img: JSON.stringify(encodeURI(res1.data))
        //   },
        //   success(res2){
        //     console.log("res2:",res2);
        //     var dataarr = JSON.parse(res2.data);
        //     console.log(dataarr)
        //   },
        //   fail:function(error){
        //     wx.hideLoading();
        //     wx.showToast({
        //       title: '请求超时',
        //       icon: 'loading',
        //       duration:2000
        //     });
        //     console.log(error)
        //   },
        //   complete:function(){
        //     wx.hideLoading();
        //   }
        // });
      }
    })
  },
  //用户不允许使用摄像头
  error(e) {
    console.log(e.detail)
  },
  //返回键
  navBack: function () {
    wx.navigateBack({})
  },
  onLoad: function (options) {
    this.ctx = wx.createCameraContext()
    /*获取导航高度*/
    this.setData({
      navH: app.globalData.navHeight
    });
  },
  //识别出来的结果点击跳转到分类页
  switchToClassify: function (e) {
    console.log(e.target.id)
    wx.navigateTo({
      url: '../classify/classify?type_id=' + e.target.id,
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