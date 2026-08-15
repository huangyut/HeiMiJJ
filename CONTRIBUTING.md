# 协作规范

## 目录职责

- 前端开发者主要维护 `frontend/**`。
- 后端开发者主要维护 `backend/**`。
- API 契约、数据库设计和跨端约定共同维护 `docs/**`。

## 分支命名

- 前端功能：`frontend/<feature>`
- 后端功能：`backend/<feature>`
- 文档变更：`docs/<topic>`
- 缺陷修复：`fix/<issue>`

## 接口协作

1. 后端先更新 `docs/api/openapi.yaml` 或可访问的 `/v3/api-docs`。
2. 前后端共同确认字段、状态码和错误码。
3. 前端更新 `frontend/packages/api-client` 后再开展联调。
4. 订单、库存、支付和退款接口必须记录幂等与状态流转规则。

## 提交前检查

```bash
cd frontend && npm run lint && npm test && npm run build && npm run format:check
cd backend && mvn test
```
