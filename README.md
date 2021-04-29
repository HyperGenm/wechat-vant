# 微信小程序
* tips:文档持续更新中。。。

### UI框架  
*   [Vant Weapp](https://vant-contrib.gitee.io/vant-weapp/#/intro) 
*   默认已经引入，变更版本请在 *package.json* 文件中变更

### 使用
1. 微信小程序开发工具导入项目  项目跟路径运行 `npm install`
2. 开发工具 *工具* -> *构建 npm*
3. 开发工具 *右边*    *详情* -> *本地设置* -> *使用npm模块*、*不检验合法域名*

### 说明
*   *utils/config.js*: 存放全局配置
*   *utils/util.js*: 封装的方法

### 扩展
* less插件
1.  下载 [Easy less插件](http://82.156.70.219/upload/wechat/mrcrowl.easy-less-1.7.2.zip)
2.  微信开发者工具 
    *   设置 > 扩展 > 编译器自定义扩展
    *   打开扩展文件夹把解压后的文件复制到文件夹内
3.  微信开发者工具
    *   设置 > 编辑器 > 更多及工作区的编辑器设置
    *   搜索 *Easy LESS* 
    *   点击  在 *settings.json* 编辑,保存即可
        ```
            "less.compile": {
                "outExt":".wxss"
            }
        ```
4.  新建 *less*文件 (例如: *index.less* ) 保存后自动生成/更新 *wxss* 文件
5.  后期只需编写 *less* 文件 ！！！