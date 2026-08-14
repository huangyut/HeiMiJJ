# 业务模块

业务模块按照领域拆分。模块内部后续统一使用以下结构：

```text
module-name/
├── dto/                   # 请求与响应数据结构
├── entities/              # 领域实体或持久化模型
├── repositories/          # 仓储接口
├── module-name.controller.ts
├── module-name.service.ts
└── module-name.module.ts
```

## 模块清单

| 模块      | 主要职责                     | 优先级 |
| --------- | ---------------------------- | ------ |
| auth      | 微信登录、令牌签发与权限校验 | P0     |
| users     | 用户资料、自提人和账号状态   | P0     |
| stores    | 附近门店、营业状态和门店切换 | P0     |
| products  | 分类、商品、规格与详情       | P0     |
| inventory | 门店库存、库存预占与释放     | P0     |
| carts     | 购物车及门店、价格、库存校验 | P0     |
| orders    | 下单、状态流转、取消和查询   | P0     |
| payments  | 微信支付、回调和支付状态     | P0     |
| pickups   | 取货码、核销与取货记录       | P0     |
| refunds   | 退款申请、审核和退款结果     | P1     |
| content   | Banner、技术科普和品牌内容   | P1     |
| marketing | 优惠券、积分与社区拼团       | P1/P2  |
| logistics | 仓储到门店的物流轨迹         | P2     |
