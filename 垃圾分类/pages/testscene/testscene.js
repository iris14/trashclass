// pages/testscene/testscene.js
// 全局变量
const app = getApp();
const apiRootPath = app.globalData.apiRootPath;   //接口根目录
var resList = [];    //此场景的所有测试题(不用改变)，通过请求后台接口获得
var testIndex = 0;    //此场景目前题目的索引(会改变)
var plotTests = []    //本地缓存的用户答题的所有信息（题目id，用户答案）,用于和本地的storage中保持一致，判断或显示等都是用plotTests，而不是storage中的plottest
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // garList: [],    //所有测试题
    // testIndex: 0,   //目前测试题的下标索引
    aTest: {},    //目前测试题的所有相关信息（这个很重要！可以在js中通过aTest判断很多东西！也可以在wxml显示信息！）
    userAnswer: ""
  },


  //返回键
  navBack: function () {
    if(wx.getStorageSync('plottest')){    //若本地有答题记录，就把答题记录存到全局数组plotTests中，若没有记录，全局数组plotTests默认为[]
      plotTests = wx.getStorageSync('plottest');
    }
    if(testIndex == resList.length-1){    //先判断此场景是否到了最后一题
      var that = this;
      var correctNum = 0;   //记录此场景回答正确的题数
      var mistakeNum = 0;   //记录此场景回答错误的题数
      plotTests.forEach((item) => {   //循环获取到的本地缓存的答题信息
        if(item.test_id == this.data.aTest.test_id){    //如果本地中有目前题目（此场景的最后一题）的答题记录，给出最终此场景的总题数、回答正确的题数和回答错误的题数
          // 以下是为了计算此场景中的回答正确和错误的题数，而进行的双重循环！！！！！！！！！！！！
          resList.forEach((items) => {    //循环此场景的所有题目信息
            plotTests.forEach((itemss) =>{    //循环获取到的本地缓存的答题信息
              if(items.test_id == itemss.test_id){   //如果此场景目前循环到的题目在本地缓存中找到了相应的答题信息
                if(items.test_answer == itemss.user_answer){    //对比正确答案和用户答案是否一致
                  correctNum = correctNum + 1;
                }else{
                  mistakeNum = mistakeNum + 1;
                }
              }
            })
          })
          wx.showModal({
            title: "您的成绩",
            content: that.data.aTest.plot_name + "场景中总共有 " + resList.length + " 题，您总共答对了 " + correctNum + " 题，答错了 " + mistakeNum + " 题",
            showCancel: false,
            success(){
              wx.navigateBack({
                // url: "../plottest/plottest"
              })
            }
          })
        }
      })
    }else{
      wx.navigateBack({
        // url: "../plottest/plottest"
      })
    }
    resList = [];
    plotTests = [];
    testIndex = 0;
  },
  // 弹出卡片
  showCard(){
    this.setData({
      isShowCard: true
    })
  },
  // 关闭弹出的卡片（隐藏）
  hideCard() {
    this.setData({
      isShowCard: false
    })
  },
  // 显示垃圾答案（用户答案和正确答案）
  showAnswers(){
    this.setData({
      isShowAnswers: true
    })
  },
  // 隐藏垃圾答案
  hideAnswers(){
    this.setData({
      isShowAnswers: false
    })
  },
  // 点击上一题按钮，返回上一题（让resList的索引-1，若索引为0，则无效，提示这已经是第一题）
  toLastTest(){
    this.hideCard();
    if(wx.getStorageSync('plottest')){    //若本地有答题记录，就把答题记录存到全局数组plotTests中，若没有记录，全局数组plotTests默认为[]
      plotTests = wx.getStorageSync('plottest');
      // console.log("plotTests：" + plotTests);
      // console.log("resList：" + resList);
    }
    if(testIndex==0){
      wx.showModal({
        title: "提示",
        content: '这是已经是第一题了！',
        showCancel: false
      })
    }else{    //正常进入上一题（已做过的题目）
      testIndex = testIndex -1;
      this.setData({
        aTest: resList[testIndex]
      })
      plotTests.forEach((item) => {   //查找本地缓存中和上一题相同的题id，然后取出用户答案
        if(this.data.aTest.test_id == item.test_id){
          this.setData({
            userAnswer: item.user_answer
          })
        }
      })
      this.showAnswers();
    }
    console.log(this.data.aTest);
  },
  // 点击下一题按钮，进入下一题（让索引+1，若索引为最大值，最无效，提示这已经是最后一题了
  toNextTest(){
    this.hideCard();
    // console.log(testIndex);
    if(wx.getStorageSync('plottest')){    //若本地有答题记录，就把答题记录存到全局数组plotTests中，若没有记录，全局数组plotTests默认为[]
      plotTests = wx.getStorageSync('plottest');
    }
    if(testIndex >= resList.length-1){
      wx.showModal({
        title: "提示",
        content: '已经到最后一题咯',
        showCancel: false
      })
    }else{
      var flag = 0;   //用来判断在进入下一题之前，是否此题已做过。如果没做过就不能进入下一题
      this.hideAnswers();   //先隐藏
      plotTests.forEach((item) => {   //循环获取到的本地缓存的答题信息
        if(item.test_id == this.data.aTest.test_id){    //如果本地中有目前题目的答题记录，点击下一题按钮时，就会进入下一题
          flag = 1;   //此题已做过的标志
        }
        if(resList[testIndex + 1].test_id == item.test_id){   //若目前题目的下一题已经做过了，就显示，否则就默认隐藏
          this.setData({
            userAnswer: item.user_answer
          })
          this.showAnswers();
        }
      })
      if(flag == 1){    //进入下一题的操作
        // if(resList[testIndex])
        testIndex = testIndex+1;
        this.setData({
          aTest: resList[testIndex]
        })
      }else{    //没做过，提示此题还没做，不能进入下一题
        wx.showModal({
          title: "提示",
          content: '此题还没做，不能进入下一题',
          showCancel: false
        })
        this.hideAnswers();
      }
      // console.log(testIndex);
    }
  },
  // 选择选项，并将选择的答案放入storage中
  selectOption(e){
    var storagetests = wx.getStorageSync('plottest');    //先将本地缓存的用户答题记录取出
    if(storagetests){    //若本地有答题记录，就把答题记录存到全局数组plotTests中，若没有记录，全局数组plotTests默认为[]
      plotTests = storagetests;
    }
    plotTests.forEach((item) => {   //循环全局数组plotTests（用户所有答题记录）
      if(item.test_id == this.data.aTest.test_id){    //若答题记录中有此题的id号，则证明已经答过了，提示已答此题，退出函数，不执行接下去的操作（即不做题）
        wx.showModal({
          title: "提示",
          content: '此题已经回答过了',
          showCancel: false
        })
        exit;   //退出函数
      }
    })
    // 下面的步骤都是用来做题的
    var option = e.currentTarget.dataset.option;    //取出实参，即选中的垃圾类别名
    // console.log(this.data.aTest);
    // 把你的答案先存在全局数组plotTests中，再把整个数组直接存到storage中
    plotTests.push({"test_id":this.data.aTest.test_id ,"user_answer": option});   //将题目id和用户答案弄成一个对象存到数组中。
    wx.setStorage({
      data: plotTests,
      key: 'plottest',
    })
    if(option == this.data.aTest.test_answer){    //判断当前选项是否和aTest信息中的正确答案相同
      var that = this;
      // 相同就弹出回答正确的提示
      wx.showModal({
        title: "提示",
        content: '回答正确',
        showCancel: false,
        success(){
          if(testIndex != resList.length-1){   //如果不是最后一题，回答正确可以跳转到下一题，最后一题就不用跳转
            that.toNextTest();    //回答正确则自动跳转到下一题
          }else{
            that.showAnswers();
          }
        }
      })
    }else{    //不同（回答错误）就弹出典典科普
      this.showCard();
      this.showAnswers();
    }
    this.setData({
      userAnswer: option
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

    var storagetests = wx.getStorageSync('plottest');    //先将本地缓存的用户答题记录取出
    if(storagetests){    //若本地有答题记录，就把答题记录存到全局数组plotTests中，若没有记录，全局数组plotTests默认为[]
      plotTests = storagetests;
    }
    var plot_id = options.plot_id;    // 取出这个页面地址?后的变量值
    // console.log(options);
    var that = this;
    wx.request({
      url: apiRootPath + "getPlotTest.php",
      data: {
        plotId: plot_id,    //向服务器传参数plotId
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      datatype: 'json',
      success: function(res){
        var resData = res.data;
        // console.log(resData);
        if(resData.status == "ok"){   //判断请求状态是否ok
          if (resData.data == null) {    //判断是否有记录
            wx.showModal({
              title: "提示",
              content: '信息显示出问题',
              showCancel: false
            })
          }else{
            resData.data.forEach((item) => {    //循环获得的接口数据，将此场景的所有题目信息放在resList数组中
              var strArr = item.test_question.split("请问：");
              item.story = strArr[0];
              item.question = "请问" + strArr[1];
              resList.push(item);
            });
            console.log(resList);
            that.setData({
              aTest:resList[testIndex]    //在请求了服务器端的数据，让data中的aTest先默认等于resList索引值为0的记录
            })
            plotTests.forEach((item) => {   //循环获取的本地缓存的记录，使当前题目信息aTest转到未做过的题目那里
              if(that.data.aTest.test_id == item.test_id){    //一直循环到没做过的题目
                testIndex++;
                if(testIndex >= resList.length){
                  testIndex = resList.length-1;
                  that.setData({
                    userAnswer: item.user_answer
                  })
                  that.showAnswers();
                }
                that.setData({
                  aTest:resList[testIndex]
                })
              }
            })
            console.log(that.data.aTest);
          }
        }
      },
      fail: function(){
        wx.showModal({
          title: "提示",
          content: '信息请求失败',
          showCancel: false
        })
      }
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