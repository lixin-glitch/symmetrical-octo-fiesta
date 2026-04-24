# Railway 手动部署指南

## 部署前准备

### 1. 项目结构检查
确保您的 `backend` 目录包含以下文件：
- `package.json` - 依赖配置
- `server.js` - 服务器代码
- `railway.json` - Railway配置文件

### 2. 依赖检查
确保所有依赖都在 `dependencies` 中（非 `devDependencies`）：
- express
- sqlite3
- cors

## 方法一：通过 GitHub 部署（推荐）

### 步骤1：创建 GitHub 仓库
1. 访问 https://github.com/new
2. 创建一个新的仓库，例如 `backend-service`
3. 复制仓库的 HTTPS 或 SSH 地址

### 步骤2：推送代码到 GitHub
```bash
# 在 backend 目录中执行
cd c:\Users\86151\Documents\trae_projects\.vscode\dikuofgs\backend

git init
git add .
git commit -m "Initial commit: Backend service"
git remote add origin https://github.com/your-username/backend-service.git
git push -u origin main
```

### 步骤3：在 Railway 中部署
1. 访问 https://railway.app
2. 点击 "New Project"
3. 选择 "Deploy from GitHub repo"
4. 搜索并选择您的仓库
5. 点击 "Deploy Now"

### 步骤4：配置环境变量
1. 在 Railway 项目中，点击 "Variables"
2. 添加以下环境变量：
   - `FRONTEND_URL` - 您的前端生产环境URL（例如：https://your-frontend.vercel.app）

### 步骤5：获取部署 URL
1. 部署完成后，点击 "Settings"
2. 找到 "Domain" 部分
3. 复制生成的 URL（例如：https://backend-service.up.railway.app）

## 方法二：通过 Railway 仪表盘直接部署

### 步骤1：创建新 Railway 项目
1. 访问 https://railway.app
2. 点击 "New Project"
3. 选择 "Empty Project"

### 步骤2：添加代码
1. 点击 "Add Service"
2. 选择 "Empty Service"
3. 点击 "Edit Code"
4. 删除默认文件
5. 上传您的 `package.json`、`server.js` 和 `railway.json` 文件

### 步骤3：部署
1. 点击 "Deploy Now"
2. 配置环境变量
3. 获取部署 URL

## 方法三：使用 Railway CLI（备选）

如果之前的 CLI 安装问题解决了，可以尝试：

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 初始化项目
railway init

# 部署
railway up

# 获取 URL
railway domain
```

## 部署后验证

部署成功后，测试 API 是否正常：

```bash
# 测试健康检查
curl https://your-backend.up.railway.app/health

# 测试数据存储
curl -X POST https://your-backend.up.railway.app/api/data \
  -H "Content-Type: application/json" \
  -d '{"key": "test", "value": "Hello Railway"}'

# 测试数据读取
curl https://your-backend.up.railway.app/api/data/test
```

## 数据库注意事项

- **SQLite 数据持久化**：Railway 的文件系统在重新部署时会重置，导致数据库丢失
- **解决方案**：在 Railway 中添加 "Persistent Volume" 或使用 PostgreSQL 等持久化数据库

## 前端配置更新

部署成功后，更新前端 `preload.js` 中的 API 地址：

```javascript
// 修改为您的 Railway 部署 URL
const API_BASE_URL = 'https://your-backend.up.railway.app/api';
```

## 常见问题

### 1. 部署失败
- 检查 `package.json` 中的 `start` 脚本是否正确
- 确保所有依赖都在 `dependencies` 中

### 2. 端口错误
- Railway 会自动设置 `PORT` 环境变量
- 确保代码使用 `process.env.PORT || 3000`

### 3. CORS 错误
- 确保 `FRONTEND_URL` 环境变量已正确设置
- 或在 `server.js` 中调整 CORS 配置

## 技术支持

- Railway 文档：https://docs.railway.app
- Railway Discord：https://discord.gg/railway