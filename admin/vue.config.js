module.exports = {
     outputDir: __dirname + '/../server/admin',   // __dirname表示vue.config.js同级文件夹 加上 上级 server admin 里面的静态文件夹
     publicPath: process.env.NODE_ENV === "production" ? '/admin' : '/'
}