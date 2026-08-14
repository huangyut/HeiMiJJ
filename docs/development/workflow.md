# 开发与联调流程

## 开发分工

- 前端开发者：`frontend/**`
- 后端开发者：`backend/**`
- 共同维护：`docs/api/**`、`docs/database/**`

## 推荐流程

1. 在需求文档中确认业务规则。
2. 在 OpenAPI 中确认请求、响应和错误码。
3. 前后端从各自分支并行实现。
4. 后端提供开发环境或本地服务。
5. 前端联调并补充异常、空状态和加载状态。
6. 合并前分别通过前端和后端 CI。

## 本地端口

| 服务 | 地址 |
| --- | --- |
| Java API | `http://localhost:8080/api` |
| 管理后台 | `http://localhost:5173` |
| MySQL | `localhost:3306` |
| Redis | `localhost:6379` |
