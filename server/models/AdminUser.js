const mongoose = require('mongoose')

const schema = new mongoose.Schema({
     username: { type: String },
     password: {
          type: String,
          select: false,  // 是否可查询
          set(val) {
               return require("bcrypt").hashSync(val, 10)
          }
     }
})


module.exports = mongoose.model("AdminUser", schema)