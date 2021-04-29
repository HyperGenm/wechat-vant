// pages/demo/index.js

//引入封装的方法
const bwUtils = require('../../utils/util')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cellList: [{
        title: '获取免登code',
        type: 'login'
      },
      {
        title: '获取用户信息',
        type: 'userInfo'
      },
      {
        title: '网络请求',
        type: 'request'
      },
      {
        title: '获取全局配置',
        type: 'config'
      },
      {
        title: '消息提示',
        type: 'showToastNone'
      },
      {
        title: 'alert',
        type: 'alert'
      },
      {
        title: 'confirm',
        type: 'confirm'
      },
      {
        title: 'prompt',
        type: 'prompt'
      },
      {
        title: '跳转登录页面',
        type: 'loginPage'
      },
      {
        title: 'uuid',
        type: 'uuid'
      },
      {
        title: '时间格式化',
        type: 'timestampFormat'
      },
      {
        title: '小程序授权',
        type: 'scope'
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 处理点击事件
   * @param {} event 点击事件内置参数
   */
  handleBindTap(event) {
    switch (event.target.dataset.type) {
      //获取用户信息
      case 'userInfo': {
        this.handleUserInfo();
      }
      break;
      //发送网络请求
    case 'request': {
      this.handleReuqest();
    }
    break;
    //获取全局配置
    case 'config': {
      let App = getApp();
      console.log(`全局配置: `, App.globalData);
    }
    break;
    //获取免登code
    case 'login': {
      bwUtils.login({
        success(code) {
          console.log(`免登code: ${code}`)
        }
      })
    }
    break;
    //消息提示
    case 'showToastNone': {
      bwUtils.showToastNone('hello world')
    }
    break;
    //alert
    case 'alert': {
      bwUtils.showModalAlert({
        title: '标题',
        content: '内容'
      })
    }
    break;
    //confirm
    case 'confirm': {
      bwUtils.showModalConfirm({
        title: '标题',
        content: '内容',
        confirm() {
          console.log('点击了确认按钮')
        }
      })
    }
    break;
    //prompt
    case 'prompt': {
      bwUtils.showModalPrompt({
        title: '标题',
        content: '内容',
        placeholderText: '请输入',
        confirm(value) {
          console.log('输入的内容: ', value)
        }
      })
    }
    break;
    //跳转到登录页面
    case 'loginPage': {
      wx.navigateTo({
        url: '/pages/login/index'
      });
    }
    break;
    //uuid
    case 'uuid': {
      console.log(bwUtils.createUUID())
    }
    break;
    //uuid
    case 'timestampFormat': {
      let timestamp = new Date().getTime();
      console.log(bwUtils.timestampFormat(timestamp))
      console.log(bwUtils.timestampFormat(timestamp, 'yyyy-MM-dd HH:mm:ss'))
    }
    break;
    //授权
    case 'scope': {
      bwUtils.scope({
        scope: 'scope.werun',
        success() {
          wx.getWeRunData({
            success(res) {
              console.log('授权成功获取到的数据:', res)
            }
          })
        }
      });
    }
    break;
    default: {

    }
    }
  },
  //获取用户信息
  handleUserInfo() {
    bwUtils.getUserProfile({
      desc: '声明获取用户个人信息后的',
      success(userInfo) {
        console.log(userInfo)
      }
    });
  },
  //模拟发送网络请求  
  handleReuqest() {
    bwUtils.request({
      url: '/api/test/getPageList',
      data: {
        pageNum: 1,
        pageSize: 10,
      },
      success(data) {
        console.log(`request获取的数据: `, data)
      }
    });
  },
});