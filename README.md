### lazyTai && afeng open source

### 效果图
<img src="https://github.com/00feng00/payOrder/blob/master/placeOrderBg.jpg">
### 目录说明

~~~
+-- build       
|   +-- build.js                     // 引入webpack
|   +-- constants.js                 // nodejs环境下的命令行参数解析工具
|   +-- server.dev.js                // 服务器相关配置
|   +-- webpack.base.js              // 开发、测试、生产环境的公共基础配置文件，配置输出环境，配置模块resolve和插件等
|   +-- webpack.build.js             // webpack打包配置文件(生产环境)
|   +-- webpack.dev.js               // webpack配置开发环境中的入口
+--dist                              // react-ui 打包后位置
|  +--index.html                     // index.html
+--mock                              // 模拟数据
+-- src                              // 开发目录
|   +-- component                    // 组件开发目录(重点)
|   +-- model                        // dva的model
|   |   +-- app.js              
|   +-- page                         // demo展示界面
|   +-- route                        // demo展示路由
|   +-- style                        // 全局样式
|   |   +-- index.less               // 全局样式具体内容
|   +-- util                         // 帮助类
|   +-- app.js                       // demo入口文件
|   +-- constants.js                 // 常量定义
|   +-- index.html                   // 模板html
+-- .babelrc               
+-- .gitignore              
+-- LICENSE                 
+-- package.json             
+-- README.md                      
~~~

### 展示界面的安装
~~~
cnpm/npm i
cnpm/npm run dev //开发环境
~~~

### 运行
运行后，可以看到在浏览器运行http://localhost:8889/，就可以看到页面的效果啦


