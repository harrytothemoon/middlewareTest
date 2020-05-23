// app.js
const express = require('express')
const app = express()
const port = 3000

function showTime() {
  let dateObject = new Date()
  let year = dateObject.getFullYear()
  let month = dateObject.getMonth() + 1
  let date = dateObject.getDate()
  let hour = dateObject.getHours()
  let minute = dateObject.getMinutes()
  let second = dateObject.getSeconds()
  let time = `${year}-${month}-${date} ${hour}:${minute}:${second}`
  console.log('newDate:', dateObject)
  return time
}

app.use(function (req, res, next) {
  //收到請求會先執行以下動作
  const Q1Date = showTime()
  const Q1Time = Date.now()
  console.log('Q1:', Q1Date, '|', req.method, 'from', req.originalUrl)
  //為了測試請求和回應的差距而增加的運算
  for (let i = 0; i < 3000000000; i++) {
    i = i + 1
  }
  next()

  // 在回應結束時再console.log一次 也可以用res.send或res.on監聽'finish'事件時再console
  res.end(
    console.log('Q2:', Q1Date, '|', req.method, 'from', req.originalUrl, '|', 'tatal time:', Date.now() - Q1Time, 'ms')
  )
})

app.get('/', (req, res) => {
  res.send('列出全部 Todo')
})

app.get('/new', (req, res) => {
  res.send('新增 Todo 頁面')
})

app.get('/:id', (req, res) => {
  res.send('顯示一筆 Todo')
})

app.post('/', (req, res) => {
  res.send('新增一筆  Todo')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})