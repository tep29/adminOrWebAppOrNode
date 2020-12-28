module.exports = options => {
     return async (req, res, next) => { // 中间件 处理函数
          // 处理通用路径复数名转换为大写
          const modelName = require('inflection').classify(req.params.resource)
          // 动态获取 Model   （req.Model 挂载）
          req.Model = require(`../models/${modelName}`)
  
          next()
      }
}