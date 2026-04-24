const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 8080

app.use(cors())
app.use(express.json())

let items = [
  { id: 1, name: '示例数据1' },
  { id: 2, name: '示例数据2' }
]

app.get('/', (req, res) => {
  res.send('后端服务运行正常！')
})

app.get('/api/items', (req, res) => {
  res.json(items)
})

app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id))
  if (!item) return res.status(404).json({ error: '未找到' })
  res.json(item)
})

app.post('/api/items', (req, res) => {
  const newItem = {
    id: items.length + 1,
    name: req.body.name || '未命名'
  }
  items.push(newItem)
  res.status(201).json(newItem)
})

app.listen(PORT, '0.0.0.0', () => {
  console.log(`服务器运行在${PORT}端口上`)
  console.log('使用内存存储进行测试')
})