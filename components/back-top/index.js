// components/back-top/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //图标名称
    iconName: {
      type: String,
      value: 'back-top'
    },
    //背景颜色
    backgroundColor: {
      type: String,
      value: '#1890ff'
    },
    //滚动多少之后显示
    scrollTop: {
      type: Number,
      value: 100
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    //定时器
    myTimer: null,
    //是否显示
    show: false,
  },
  /**
   * 组件所在页面的生命周期
   */
  pageLifetimes: {
    show() {
      this.createTimer();
    },
    hide() {
      clearInterval(this.data.myTimer);
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * 创建定时器
     */
    createTimer() {
      let pageQuery = this.createSelectorQuery();
      pageQuery.select('page').boundingClientRect();
      pageQuery.selectViewport().scrollOffset();
      //用于监听页面滚动
      let myTimer = setInterval(() => {
        pageQuery.exec(res => {
          try {
            //当滚动距离小于设置，不处理
            if (this.data.scrollTop > res[1]['scrollTop']) {
              return;
            }
            //当滚动距离大于设置
            //关闭定时器
            clearInterval(myTimer);
            //显示返回顶部
            this.setData({
              show: true
            });
          } catch (e) {
            console.debug('返回顶部back-top自定义组件获取scrollTop出错，可忽略。详情:', e);
          }
        });
      }, 222);
      this.setData({
        myTimer
      });
    },
    /**
     * 处理点击
     */
    handleClick() {
      //滚动到顶部
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      //开启定时器
      this.createTimer();
      //隐藏返回顶部
      this.setData({
        show: false
      });
    }
  }
});