const mongoose = require('mongoose')

const schema = new mongoose.Schema({
     categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],  // 多分类
     title: { type: String },
     body: { type: String },
}, {
     timestamps: true
})


module.exports = mongoose.model("Article", schema)