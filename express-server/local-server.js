"use strict"

import express from "express"
import path from "path"
/**
 * 可以不用
 */
const app = express()
const port = 3000
app.use(express.static(__dirname + '/static'));//静态页面地址

app.get('/index.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../assets/index.html'));
});

app.get('/xiaohongshu', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../apps_apk/com.xingin.xhs_5491036.apk'));
});

let server
const start = () => {
  server = app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}


const stop = () => {
  server.close()
}