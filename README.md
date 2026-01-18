# CreativeHub - 创意社区平台

让创意不再停留在想法！CreativeHub 是一个帮助创意落地的社区平台。在这里，你可以记录灵感、寻找协作者、获得反馈，让想法变成现实。

## ✨ 核心理念

很多人的创意都停留在"想"的阶段，最终无疾而终。CreativeHub 旨在：

- 📝 **记录灵感** - 永久保存创意想法，一句话快速创建
- 🤝 **社区协作** - 找到志同道合的伙伴，共同实现创意
- 💰 **积分激励** - 通过分享、讨论获得积分，实现价值流通
- 🚀 **推动落地** - 从想法到原型，从原型到产品

## 🎯 主要功能

### 已实现（MVP 版本）

- ✅ 用户注册/登录系统
- ✅ 灵感创建与发布
- ✅ 灵感浏览与探索
- ✅ 社区讨论（评论系统）
- ✅ 点赞功能
- ✅ 标签系统
- ✅ 积分系统（发布、点赞、评论自动获得积分）
- ✅ 工作区（个人灵感管理）
- ✅ 灵感状态管理（草稿/发布/进行中/完成/归档）

### 规划中

- 🔲 智能体交易市场
- 🔲 工作流市场
- 🔲 产品众筹功能
- 🔲 区块链积分系统
- 🔲 一键创建功能（AI辅助）
- 🔲 协作工具集成
- 🔲 营销报告生成工具

## 🛠 技术栈

- **前端**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **后端**: Next.js API Routes, Node.js
- **数据库**: PostgreSQL + Prisma ORM
- **认证**: NextAuth.js (Auth.js)
- **部署**: Vercel (推荐)

## 📦 安装与运行

### 前置要求

- Node.js 18+
- PostgreSQL 数据库
- npm/yarn/pnpm

### 1. 克隆项目

```bash
git clone <repository-url>
cd hello-word
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 到 `.env` 并配置：

```bash
cp .env.example .env
```

编辑 `.env` 文件：

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/creative_hub?schema=public"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# App Config
NEXT_PUBLIC_APP_NAME="CreativeHub"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

### 4. 初始化数据库

```bash
# 生成 Prisma Client
npx prisma generate

# 运行数据库迁移
npx prisma migrate dev --name init

# (可选) 查看数据库
npx prisma studio
```

### 5. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

## 📁 项目结构

```
├── prisma/
│   └── schema.prisma          # 数据库模型定义
├── src/
│   ├── app/                   # Next.js App Router 页面
│   │   ├── api/              # API 路由
│   │   ├── explore/          # 探索页面
│   │   ├── workspace/        # 工作区
│   │   ├── ideas/[id]/       # 灵感详情
│   │   ├── login/            # 登录页
│   │   └── register/         # 注册页
│   ├── components/           # React 组件
│   ├── lib/                  # 工具库
│   │   ├── auth.ts          # 认证配置
│   │   └── prisma.ts        # Prisma Client
│   └── types/               # TypeScript 类型定义
├── .env.example             # 环境变量示例
└── README.md               # 项目文档
```

## 🎨 数据模型

### 核心模型

- **User** - 用户（邮箱、用户名、积分等）
- **Idea** - 灵感（标题、描述、内容、状态等）
- **Comment** - 评论（支持嵌套回复）
- **Tag** - 标签
- **PointHistory** - 积分历史记录
- **IdeaLike** - 点赞关系

### 积分规则

- 注册奖励：100 积分
- 发布灵感：10 积分
- 收到点赞：2 积分
- 收到评论：1 积分

## 🚀 部署

### Vercel 部署（推荐）

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 配置环境变量
4. 部署

### 数据库

推荐使用以下服务：

- [Vercel Postgres](https://vercel.com/storage/postgres)
- [Supabase](https://supabase.com/)
- [Neon](https://neon.tech/)
- [Railway](https://railway.app/)

## 🤝 贡献

欢迎贡献！请随时提交 Issue 或 Pull Request。

## 📄 许可证

MIT License

## 🎯 未来愿景

CreativeHub 不仅是一个灵感记录平台，更是一个：

1. **去中心化协作网络** - 通过区块链技术实现真正的价值流通
2. **创意众筹平台** - 帮助优秀创意获得资源支持
3. **工具与智能体市场** - 统一的工具/智能体发布和交易平台
4. **一人公司协作平台** - 适应现代分工模式的快速协作机制

让我们一起，让更多创意从想法变为现实！🚀

---

**Made with ❤️ by CreativeHub Team**
