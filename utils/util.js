//获取App
let App = getApp();

/**
 * 网络请求
 */
const request = ({
  //多少ms之后显示加载中动画
  showLoadingDelay = 666,
  //加载中显示的文字
  showLoadingTitle = '加载中...',
  //错误提示时间
  showToastDuration = 3000,
  //是否下拉刷新
  isPullDownRefresh = false,
  //返回所有状态码为200的响应
  allSuccess = false,
  //开发者服务器接口地址
  url = '',
  //请求的参数
  data = {},
  //content-type 默认为 application/json
  contentType = '',
  //超时时间，单位为毫秒
  timeout = 20000,
  //HTTP 请求方法
  method = 'get',
  //返回的数据格式	
  dataType = 'json',
  //成功回调
  success = () => {

  },
  //失败回调
  fail = () => {

  },
  //成功失败都触发
  complete = () => {

  },
} = {}) => {
  ////多少ms之后显示加载中动画
  let loadingTimer = setTimeout(() => {
    wx.showLoading({
      title: showLoadingTitle,
      mask: true,
    });
  }, showLoadingDelay);
  //请求参数加上时间戳
  data['__t'] = (new Date()).getTime();
  let that = this;
  //发送网络请求
  wx.request({
    url: App.globalData.config.requestUrl + url,
    data,
    header: {
      'content-type': contentType,
      //每个请求都携带的请求头
      'token': wx.getStorageSync('token'),
    },
    timeout,
    method,
    dataType,
    //成功触发
    success(res) {
      //响应状态码不是200
      if (200 !== res['statusCode']) {
        //请求出错
        console.warn(`${url}:请求失败,statusCode:${res['statusCode']},详情:`, res);
        setTimeout(() => {
          wx.showModal({
            title: '系统错误',
            content: (null != res['data'] ? JSON.stringify(res['data']) : `url:${url} \r\n statusCode:${res['statusCode']} `),
            showCancel: false,
          })
        }, 100);
        return;
      }
      //如果返回所有响应
      if (allSuccess) {
        try {
          success(res['data']);
        } catch (e) {
          console.error(e);
        }
        return;
      }
      //不是 200 代表请求失败
      if (200 !== res['data']['code']) {
        //请求出错
        console.warn(`网络请求失败 url:${url}`);
        res['data']['url'] = url;
        console.table(res['data']);
        setTimeout(() => {
          wx.showToast({
            title: res['data']['msg'],
            icon: 'none',
            duration: showToastDuration
          });
        }, 100);
        return;
      }
      try {
        success(res['data']['data']);
      } catch (e) {
        console.error(e);
      }
    },
    //失败触发
    fail(error) {
      //请求出错
      console.warn(`${url}:请求失败,详情:`, error);
      setTimeout(() => {
        wx.showModal({
          title: '系统错误',
          content: error['errMsg'],
          showCancel: false,
        })
      }, 100);
      //对外抛出
      fail(error);
    },
    //成功失败都触发
    complete(res) {
      //如果是下拉刷新
      if (isPullDownRefresh) {
        //停止下拉刷新
        wx.stopPullDownRefresh();
      }
      //关闭加载中动画
      wx.hideLoading({});
      clearTimeout(loadingTimer);
    }
  });
}

/**
 * 登录
 */
const login = ({
  //成功回调，返回code
  success = () => {

  },
  //失败回调
  fail = () => {

  }
} = {}) => {
  wx.login({
    success(res) {
      //如果获取成功
      if (res['code']) {
        try {
          success(res['code']);
        } catch (error) {
          console.error(error);
        }
        return;
      }
      setTimeout(() => {
        wx.showModal({
          title: '获取code失败',
          content: res['errMsg'],
          showCancel: false,
        })
      }, 100);
      fail({
        res
      });
    },
    error(error) {
      setTimeout(() => {
        wx.showModal({
          title: '获取code失败',
          content: JSON.stringify(error),
          showCancel: false,
        })
      }, 100);
      fail({
        error
      });
    }
  });
}

/**
 * 是否为空
 */
const isBlank = (value) => {
  if (null == value) {
    return true;
  }
  return '' === ('' + value);
}

/**
 * 展示提示
 */
const showToastNone = (title = '提示', duration = 3000) => {
  setTimeout(() => {
    wx.showToast({
      title,
      icon: 'none',
      duration
    });
  }, 100);
}

/**
 * 显示弹出框
 */
const showModalAlert = ({
  //提示的标题	
  title = '',
  //提示的内容，editable 为 true 时，会输入框默认文本
  content = '',
  //确认按钮文字
  confirmText = '确认',
  //确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
  confirmColor = '#576B95',
  //确认按钮回调
  confirm = () => {

  }
} = {}) => {
  setTimeout(() => {
    wx.showModal({
      title,
      content,
      confirmText,
      confirmColor,
      editable: false,
      showCancel: false,
      success(res) {
        if (!res.confirm) {
          return;
        }
        try {
          confirm();
        } catch (e) {
          console.error(e);
        }
      },
      fail(error) {
        console.warn(`提示框弹出失败,详情:`, error);
        setTimeout(() => {
          wx.showModal({
            title: '对话框弹出失败',
            content: JSON.stringify(error),
            showCancel: false,
            editable: false,
          });
        }, 100);
      }
    });
  }, 100);
}

/**
 * 显示对话框
 */
const showModalConfirm = ({
  //提示的标题	
  title = '',
  //提示的内容，editable 为 true 时，会输入框默认文本
  content = '',
  //确认按钮文字
  confirmText = '确认',
  //确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
  confirmColor = '#576B95',
  //取消按钮文字
  cancelText = '取消',
  //取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
  cancelColor = '#000000',
  //确认按钮回调
  confirm = () => {

  },
  //取消回调
  cancel = () => {

  }
} = {}) => {
  setTimeout(() => {
    wx.showModal({
      title,
      content,
      confirmText,
      confirmColor,
      cancelText,
      cancelColor,
      showCancel: true,
      editable: false,
      success(res) {
        try {
          res.confirm ? confirm() : cancel();
        } catch (e) {
          console.error(e);
        }
      },
      fail(error) {
        console.warn(`对话框弹出失败,详情:`, error);
        setTimeout(() => {
          wx.showModal({
            title: '对话框弹出失败',
            content: JSON.stringify(error),
            showCancel: false,
            editable: false,
          });
        }, 100);
      }
    });
  }, 100);
}

/**
 * 显示输入框
 */
const showModalPrompt = ({
  //提示的标题	
  title = '',
  //提示的内容，editable 为 true 时，会输入框默认文本
  content = '',
  //输入框提示文本	
  placeholderText = '',
  //确认按钮文字
  confirmText = '确认',
  //确认按钮的文字颜色，必须是 16 进制格式的颜色字符串
  confirmColor = '#576B95',
  //取消按钮文字
  cancelText = '取消',
  //取消按钮的文字颜色，必须是 16 进制格式的颜色字符串
  cancelColor = '#000000',
  //确认按钮回调
  confirm = () => {

  },
  //取消回调
  cancel = () => {

  }
} = {}) => {
  //版本低
  if (!wx.canIUse('showModal.object.editable')) {
    console.warn('方法: showModal 参数: editable 最低需要 2.15.0 版本。');
    setTimeout(() => {
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
        showCancel: false,
      });
    }, 100);
    return;
  }
  setTimeout(() => {
    wx.showModal({
      title,
      content,
      placeholderText,
      confirmText,
      confirmColor,
      cancelText,
      cancelColor,
      showCancel: true,
      editable: true,
      success(res) {
        try {
          res.confirm ? confirm(res['content']) : cancel();
        } catch (e) {
          console.error(e);
        }
      },
      fail(error) {
        console.warn(`输入框弹出失败,详情:`, error);
        setTimeout(() => {
          wx.showModal({
            title: '输入框弹出失败',
            content: JSON.stringify(error),
            showCancel: false,
            editable: false,
          });
        }, 100);
      }
    });
  }, 100);
}

/**
 * 获取用户信息
 */
const getUserProfile = ({
  //显示用户信息的语言
  lang = 'en',
  //声明获取用户个人信息后的用途，不超过30个字符
  desc = '',
  //成功回调
  success = () => {

  },
  //失败回调
  fail = () => {

  },
  //失败的描述
  faildesc = '拒绝授权，您将无法使用更多专属功能。',
} = {}) => {
  wx.getUserProfile({
    lang,
    desc,
    success(res) {
      console.warn('用户信息授权失败,详情:', res);
      //如果授权失败
      if ("getUserProfile:ok" !== res['errMsg']) {
        setTimeout(() => {
          wx.showModal({
            title: '授权失败',
            content: faildesc,
            showCancel: false,
            editable: false,
          });
        }, 100);
        try {
          fail();
        } catch (e) {
          console.error(e);
        }
        return;
      }
      try {
        success(res['userInfo']);
      } catch (e) {
        console.error(e);
      }
    },
    fail(error) {
      console.warn('用户信息授权失败,详情:', error);
      setTimeout(() => {
        wx.showModal({
          title: '授权失败',
          content: faildesc,
          showCancel: false,
          editable: false,
        });
      }, 100);
      try {
        fail();
      } catch (e) {
        console.error(e);
      }
    }
  });
}

/**
 * 不是手机号码
 */
const notPhone = (phone) => {
  if (null == phone) {
    return true;
  }
  return !(/^1([3456789])\d{9}$/.test(phone));
}

/**
 * 创建uuid
 */
const createUUID = () => {
  let s = [];
  let hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  // bits 12-15 of the time_hi_and_version field to 0010
  s[14] = "4";
  // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = s[13] = s[18] = s[23] = "";
  return s.join("").toUpperCase();
}

/**
 * 字符串反转
 */
const reverse = (value) => {
  return value.split('').reverse().join('');
}

/**
 * 格式化时间戳
 */
const timestampFormat = (timestamp, format = 'yyyy-MM-dd') => {
  if (null == timestamp || 0 > timestamp) {
    return '';
  }
  let date = new Date(timestamp);
  let o = {
    "M+": date.getMonth() + 1, // 月份
    "d+": date.getDate(), // 日
    "H+": date.getHours(), // 小时
    "m+": date.getMinutes(), // 分
    "s+": date.getSeconds(), // 秒
    "q+": Math.floor((date.getMonth() + 3) / 3), // 季度
    "S": date.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + ""));
  }
  for (let k in o) {
    if (o.hasOwnProperty(k)) {
      if (new RegExp("(" + k + ")").test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
  }
  return format;
}

/**
 * 获取今天日期
 */
const getNowDate = () => {
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month > 9 ? month : '0' + month;
  let day = date.getDate();
  day = day > 9 ? day : '0' + day;
  return `${year}-${month}-${day}`;
}

/**
 * 授权
 */
const scope = ({
  //授权的scope
  scope = '',
  //描述信息
  desc = '请您同意授权，以便我们为您更好的提供服务',
  //成功回调
  success = () => {

  },
  //失败回调
  fail = () => {

  }
} = {}) => {
  // 可以通过 wx.getSetting 先查询一下用户是否授权了 "scope.record" 这个 scope
  wx.getSetting({
    success(res) {
      //如果授权成功
      if (res['authSetting'][scope]) {
        try {
          success();
        } catch (e) {
          console.error(e);
        }
        return;
      }
      //授权失败，进行授权
      wx.authorize({
        scope,
        success() {
          //成功授权
          try {
            success();
          } catch (e) {
            console.error(e);
          }
        },
        fail(error) {
          wx.showModal({
            title: '获取授权',
            confirmText: '同意',
            cancelText: '拒绝',
            content: desc,
            success(res) {
              //点击取消
              if (!res.confirm) {
                setTimeout(() => {
                  wx.showToast({
                    title: `拒绝授权，您将无法使用更多专属功能。`,
                    icon: 'none',
                    duration: 3000
                  });
                }, 100);
                return
              }
              console.warn('警告:模拟器调试下授权页面可能无法打开,可能会提示:openSetting:fail can only be invoked by user TAP gesture.错误,请手动清除授权记录缓存或使用真机调试');
              //点击确认
              wx.openSetting({
                fail(error) {
                  console.warn('wx.openSetting:', error);
                  setTimeout(() => {
                    wx.showModal({
                      title: '授权页面打开失败',
                      content: JSON.stringify(error),
                      showCancel: false,
                      editable: false,
                    });
                  }, 100);
                }
              });
            }
          })
        }
      })
    },
    fail(error) {
      console.warn('wx.getSetting，获取授权失败，详情:', error);
      setTimeout(() => {
        wx.showModal({
          title: '授权失败',
          content: JSON.stringify(error),
          showCancel: false,
          editable: false,
        });
      }, 100);
      try {
        fail();
      } catch (e) {
        console.error(e);
      }
    }
  });
}

module.exports = {
  request,
  login,
  isBlank,
  showToastNone,
  showModalAlert,
  showModalConfirm,
  showModalPrompt,
  getUserProfile,
  notPhone,
  createUUID,
  reverse,
  timestampFormat,
  getNowDate,
  scope,
}