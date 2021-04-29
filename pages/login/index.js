// pages/login/login.js
const bwUtils = require('../../utils/util');

Page({
  /**
   * 页面进入触发
   */
  onLoad(option) {
    bwUtils.login({
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
      bwUtils.showToastNone(`拒绝授权将无法识别您的身份`);
      return;
    }
    bwUtils.login({
      success(code) {
        //获取code
        console.table({
          code,
          encryptedData,
          iv
        });
      }
    });
  }
});