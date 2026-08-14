# 黑米姐姐 Java 后端

后端采用 Java 21 + Spring Boot 4.1 的模块化单体架构。

## 目录约定

```text
com.heimijiejie/
├── common/          # 统一响应、异常、常量与工具
├── config/          # 框架配置
├── security/        # 登录认证和权限控制
├── integration/     # 微信、支付、短信和对象存储适配
└── modules/         # 按业务能力划分的模块
```

每个业务模块根据实际复杂度逐步建立 `controller`、`service`、`dto`、`entity` 和 `mapper` 子包。跨模块调用不得直接访问其他模块的 Mapper。

## 本地启动

```bash
docker compose -f ../deploy/docker-compose.yml up -d
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

默认端口为 `8080`，上下文路径为 `/api`。

## 环境变量

| 变量 | 默认值 | 用途 |
| --- | --- | --- |
| `DB_HOST` | `localhost` | MySQL 地址 |
| `DB_PORT` | `3306` | MySQL 端口 |
| `DB_NAME` | `heimijj` | 数据库名 |
| `DB_USERNAME` | `heimijj` | 数据库用户 |
| `DB_PASSWORD` | `heimijj_dev` | 数据库密码 |
| `REDIS_HOST` | `localhost` | Redis 地址 |
| `REDIS_PORT` | `6379` | Redis 端口 |

生产环境不得使用示例密码。
