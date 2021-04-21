

###### vant+postcss-pxtorem 适配方案：

1. **安装**： npm install postcss-pxtorem --save

2. **.postcssrc.js  写入以下代码**：

   module.exports = {
     "plugins": {
       "postcss-import": {},
       "postcss-url": {},
       // to edit target browsers: use "browserslist" field in package.json
       "autoprefixer": {
         browsers: ['Android >= 4.0', 'iOS >= 7']
       },
       "postcss-pxtorem": { 
         "rootValue": 32,
         "propList": ["*"]
       }
     }
   }

3. **新建rem.js 并在main.js中引入**

   const baseSize = 32
   // 设置 rem 函数
   function setRem () {
   // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
   const scale = document.documentElement.clientWidth / 750
   // 设置页面根节点字体大小
   document.documentElement.style.fontSize = (baseSize * Math.min(scale, 2)) + 'px'
   }
   // 初始化
   setRem()
   // 改变窗口大小时重新设置 rem
   window.onresize = function () {
       setRem()
   }

   如果出现 vant 报错，修改 **webpack.dev.conf.js** 中的  **usePostCSS** 属性为  **false**