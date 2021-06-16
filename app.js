//引入配置文件
const {
  config
} = require('./utils/config');

// app.js
App({
  /**
   * 小程序初始化加载，只加载一次
   */
  onLaunch() {
    //根据运行环境设置全局常量
    this['globalData']['config'] = config;
    //监听版本更新
    this.getUpdateManager();
  },
  globalData: {
    //存放全局配置
    config: {},
    //请求锁,禁止操作
    requestLock: {}
  },
  /**
   * 小程序版本更新
   */
  getUpdateManager() {
    //没有版本更新方法
    if (!wx.canIUse('getUpdateManager')) {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false,
      });
      return;
    }
    const updateManager = wx.getUpdateManager();
    updateManager.onCheckForUpdate(function (res) {
      //没有新版本
      if (!res.hasUpdate) {
        return;
      }
      //提示用户更新
      updateManager.onUpdateReady(function () {
        wx.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            //用户点击更新
            if (res.confirm) {
              updateManager.applyUpdate();
            }
          }
        });
      })
      //更新失败
      updateManager.onUpdateFailed(function () {
        wx.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
          showCancel: false,
        })
      });
    });
  }
});