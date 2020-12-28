

module.exports = app => {
    const express = require('express')
    const jwt = require('jsonwebtoken')
    const AdminUser = require('../../models/AdminUser')
    const assert = require('http-assert')
    const router = express.Router({
        mergeParams: true   // 合并参数
    })

    // 通用 - 创建资源
    router.post('/', async (req, res) => {
        const model = await req.Model.create(req.body)
        res.send(model)
    })

    // 通用 - 更新资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send(model)
    })

    // 通用 - 删除资源
    router.delete('/:id', async (req, res) => {
        console.log(req.params, req.body)
        await req.Model.findByIdAndDelete(req.params.id, req.body)
        res.send({
            success: true
        })
    })

    // 通用 - 资源列表
    router.get('/', async (req, res) => {
        const queryOptions = {}
        if (req.Model.modelName == 'Category') {
            queryOptions.populate = 'parent'
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100)

        res.send(items)
    })

    // 通用 id 查询
    router.get('/:id', async (req, res) => {
        const model = await req.Model.findById(req.params.id)
        res.send(model)
    })
    // 登录校验中间件
    const authMiddleware = require('../../middleware/auth')
    // 自动获取模型中间件
    const resourceMiddleware = require('../../middleware/resource')
    app.use('/admin/api/rest/:resource',
        authMiddleware(),
        resourceMiddleware()
        , router)

    // express无法获取上传文件 需中间件操作
    const multer = require('multer')
    const upload = multer({ dest: __dirname + '/../../uploads' })
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
        const file = req.file
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    // 登录
    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body
        // 1. 根据用户名找用户

        // 查询数据库   .select('+ ')   查询
        const user = await AdminUser.findOne({ username }).select('+password')
        assert(user, 422, "用户不存在")

        // 2. 校验密码                             // compareSync 明文
        const isValid = require('bcrypt').compareSync(password, user.password)
        assert(isValid, 422, "密码错误")

        // 3. 返回token
        const token = jwt.sign({ id: user._id }, app.get("secret"))
        res.status(200).send({ message: `欢迎您, 尊贵的用户 ${username} `, token })
    })

    // 错误处理函数
    app.use(async (err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        })
    })
}