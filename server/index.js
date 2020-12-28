const express = require('express')

const app = express()

app.set("secret", "webYingNodeServer")

app.use(require('cors')())
app.use(express.json())
app.use('/', express.static(__dirname + '/web'))  // 静态托管admin文件
app.use('/admin', express.static(__dirname + '/admin'))  // 静态托管admin文件
app.use('/uploads', express.static(__dirname + '/uploads'))  // 静态托管文件

require('./plugins/db')(app)
require('./routes/admin')(app)
require('./routes/web')(app)

app.listen(3000, () => {
    console.log('http://localhost:3000')
})  