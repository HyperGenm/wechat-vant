/**
 * 全局配置
 */
const config = {
  //开发版
  'develop': {
    //请求的地址
    requestUrl: 'http://82.156.70.219/muteki'
  },
  //体验版
  'trial': {
    //请求的地址
    requestUrl: 'http://82.156.70.219/muteki'
  },
  //正式版
  'release': {
    //请求的地址
    requestUrl: 'http://82.156.70.219/muteki'
  }
}[wx.getAccountInfoSync().miniProgram.envVersion];

/**
 * 全局配置
 */
module.exports = {
  config
}