// pages/login/login.js
const weiUtils = require('../../utils/util');

Page({
  /**
   * 页面进入触发
   */
  onLoad(option) {
    weiUtils.login({
      success(code) {
        console.log('wx.login获取的code: ', code);
      }
    });
  },
  /**
   * 获取手机号码
   */
  getPhoneNumber(e) {
    let {
      errMsg,
      encryptedData,
      iv
    } = e.detail;
    if ('getPhoneNumber:ok' !== errMsg) {
      weiUtils.showToastNone(`拒绝授权将无法识别您的身份`);
      return;
    }
    weiUtils.login({
      success(code) {
        //获取code
        console.table({
          code,
          encryptedData,
          iv
        });
      }
    });
  },
  /**
   * 获取头像昵称
   */
  getUserInfo() {
    weiUtils.getUserProfile({
      success(res) {
        console.log('头像昵称：', res);
      }
    });
  }
});