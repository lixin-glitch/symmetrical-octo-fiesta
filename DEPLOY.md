# Railway 部署指南

## 部署步骤

### 方式一：使用 Railway CLI 部署

1. **登录 Railway**
   ```bash
   cd backend
   railway login
   ```

2. **初始化 Railway 项目**
   ```bash
   railway init
   ```
   - 输入项目名称，例如：`backend-service`

3. **设置环境变量**
   在 Railway 仪表盘中设置以下环境变量：
   - `PORT`: 3000
   - `NODE_ENV`: production

4. **部署**
   ```bash
   railway up
   ```

5. **获取部署URL**
   ```bash
   railway domain
   ```

### 方式二：使用 GitHub 部署

1. **推送代码到 GitHub**
   ```bash
   cd backend
   git init
   git add .
   git commit -m "Backend service with Express and SQLite"
   git remote add origin https://github.com/yourusername/backend.git
   git push -u origin main
   ```

2. **在 Railway 中连接 GitHub**
   - 访问 https://railway.app
   - 创建新项目
   - 选择 "Deploy from GitHub repo"
   - 选择您的仓库

3. **配置环境变量**
   在 Railway 项目设置中添加：
   - `PORT`: 3000
   - `NODE_ENV`: production

4. **部署**
   Railway 会自动检测并部署

## 环境变量说明

| 变量名 | 值 | 说明 |
|--------|-----|------|
| PORT | 3000 | 服务器端口 |
| NODE_ENV | production | 运行环境 |

## 重要提示

### SQLite 数据库注意事项
当前实现使用本地 SQLite 数据库 (`data.db`)，在 Railway 部署时需要注意：

1. **数据持久化**：Railway 的文件系统在重新部署时会重置，数据库文件会丢失
2. **建议方案**：
   - 使用 Railway 的 persistent disks 功能
   - 或切换到持久化数据库（如 PostgreSQL、MySQL）

### 更新后的代码使用 persistent disks
如果您想保持 SQLite 但需要数据持久化，可以在 `server.js` 中修改数据库路径：

```javascript
const dbPath = process.env.RAILWAY_VOLUME_MOUNT_PATH || './';
const db = new sqlite3.Database(`${dbPath}/data.db`, (err) => {
  // ...
});
```

## 部署后测试

部署成功后，使用以下命令测试 API：

```bash
# 获取部署的URL
railway domain

# 测试 API（替换 YOUR_DOMAIN 为实际域名）
curl https://YOUR_DOMAIN.up.railway.app/api/data
```

## 常见问题

### 1. 部署失败
- 检查 `package.json` 的 `start` 脚本是否正确
- 确保所有依赖都列在 `dependencies` 中（非 `devDependencies`）

### 2. 数据库连接错误
- 确保 SQLite 数据库文件路径正确
- 检查文件系统权限

### 3. 端口配置错误
- Railway 会自动设置 `PORT` 环境变量
- 确保代码使用 `process.env.PORT` 而非硬编码端口

## 获取帮助

- Railway 文档：https://docs.railway.app
- Railway Discord：https://discord.gg/railway