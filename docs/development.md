# 开发指南

## 环境要求

- Node.js 20 或更高版本
- npm 10 或更高版本
- 微信开发者工具（运行消费者小程序时需要）

## 初始化

```bash
npm install
cp .env.example .env
```

## 启动 API

```bash
npm run dev:api
```

健康检查地址：`http://localhost:3000/api/v1/health`

## 启动消费者小程序

```bash
npm run dev:miniapp
```

构建完成后，在微信开发者工具中导入 `apps/customer-miniapp`。正式开发前，应将 `project.config.json` 中的测试 AppID 替换为项目真实 AppID。

## 提交前检查

```bash
npm run format:check
npm run typecheck
npm run build
```

## 分支与提交建议

- 功能分支：`feature/功能名称`
- 修复分支：`fix/问题名称`
- 文档分支：`docs/内容名称`
- 提交信息采用 `类型: 简短说明`，例如 `feat: 新增附近门店查询`

每次发布或完成较大功能后，应同步维护根目录的 `CHANGELOG.md`。
