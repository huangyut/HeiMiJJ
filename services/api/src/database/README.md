# 数据库层

该层预留数据库客户端、事务管理、迁移脚本和仓储实现。正式接入数据库前，需要确定 PostgreSQL/MySQL 以及 ORM 方案。

- `migrations/`：数据库结构变更记录
- `repositories/`：业务仓储接口的数据库实现
- `database.service.ts`：统一的数据库连接入口

当前 `DatabaseService` 仅提供连接状态占位，不会建立真实数据库连接。
