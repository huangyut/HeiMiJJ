# 数据库约定

- 表名、字段名使用小写下划线命名。
- 主键统一使用 `BIGINT`，由应用生成雪花 ID。
- 金额统一使用“分”为单位的 `BIGINT`，避免浮点误差。
- 时间字段统一使用 `DATETIME(3)`，应用层使用 `Instant` 或明确时区的类型。
- 业务表默认包含 `created_at`、`updated_at` 和 `deleted`。
- 订单号、支付单号、退款单号建立唯一索引。
- 库存扣减必须包含并发控制和操作流水。
- 数据库变更只通过 `backend/src/main/resources/db/migration` 中的 Flyway 脚本提交。
