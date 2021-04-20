
const express = require('express');
const path = require('path');
const app = express();

// 压缩静态文件大小
const compression = require('compression');


// 开放静态资源
app.use('/public/', express.static(path.join(__dirname, 'public')))

app.use(compression())
app.use(express.static('./dist'))

// 启动
app.listen(3000,()=>{
  console.log('服务器运行中');
})
