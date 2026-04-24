const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// 内存存储（用于测试）
const memoryStore = new Map();

// CORS配置 - 允许前端访问
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5174',
      process.env.FRONTEND_URL
    ].filter(Boolean);

    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// 解析JSON请求体
app.use(express.json());

// 根路径健康检查
app.get('/', (req, res) => {
  res.status(200).send('后端服务运行正常');
});

// 健康检查端点
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// POST /api/data 保存数据
app.post('/api/data', (req, res) => {
  const { key, value } = req.body;

  if (!key || value === undefined) {
    return res.status(400).json({ error: 'Key and value are required' });
  }

  memoryStore.set(key, value);
  res.status(201).json({ key, value, id: Date.now() });
});

// GET /api/data/:key 读取数据
app.get('/api/data/:key', (req, res) => {
  const { key } = req.params;

  if (!memoryStore.has(key)) {
    return res.status(404).json({ error: 'Data not found' });
  }

  const value = memoryStore.get(key);
  res.status(200).json({ key, value });
});

// GET /api/data 获取全部数据
app.get('/api/data', (req, res) => {
  const data = Array.from(memoryStore.entries()).map(([key, value]) => ({
    key,
    value
  }));
  res.status(200).json(data);
});

// DELETE /api/data/:key 删除数据
app.delete('/api/data/:key', (req, res) => {
  const { key } = req.params;

  if (!memoryStore.has(key)) {
    return res.status(404).json({ error: 'Data not found' });
  }

  memoryStore.delete(key);
  res.status(200).json({ message: 'Data deleted successfully' });
});

// 404 处理
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on 0.0.0.0:${PORT}`);
  console.log('Using memory storage for testing');
});