# 黑米姐姐

面向社区家庭消费者与社区联营门店的本地生活零售平台，以“社区联营 + 线上下单 + 线下提货”为核心模式。

## 项目组成

本仓库采用前后端分离的单仓库结构，两名开发者可以分别维护各自工程：

| 工程 | 主要技术 | 负责内容 |
| --- | --- | --- |
| `frontend` | Taro、React、TypeScript、Vite、Ant Design | 消费者小程序、门店小程序、管理后台 |
| `backend` | Java 21、Spring Boot、MyBatis-Plus、MySQL、Redis | 业务 API、认证授权、数据与第三方集成 |

前后端通过 OpenAPI 接口契约协作，不共享构建工具和运行依赖。

## 目录结构

```text
HeiMiJJ/
├── frontend/
│   ├── apps/
│   │   ├── customer-miniapp/   # 消费者微信小程序
│   │   ├── store-miniapp/      # 门店端微信小程序
│   │   └── admin-web/          # 平台管理后台
│   └── packages/
│       ├── api-client/         # API 客户端抽象
│       ├── shared-types/       # 前端公共类型
│       ├── shared-constants/   # 前端公共常量
│       └── shared-utils/       # 前端公共工具
├── backend/                    # Java Spring Boot 后端
├── docs/                       # 需求、架构、接口和数据库文档
├── deploy/                     # 本地依赖与部署配置
├── .github/workflows/          # 前后端独立 CI
├── CHANGELOG.md
└── CONTRIBUTING.md
```

## 快速开始

### 环境要求

- Node.js 20+
- npm 10+
- 微信开发者工具
- JDK 21
- Maven 3.9+
- Docker Desktop（推荐，用于启动 MySQL 和 Redis）

### 启动本地依赖

```bash
docker compose -f deploy/docker-compose.yml up -d
```

### 启动前端

```bash
cd frontend
npm install

# 消费者小程序
npm run dev:customer

# 门店端小程序
npm run dev:store

# 管理后台
npm run dev:admin
```

消费者端和门店端构建后，分别使用微信开发者工具打开对应应用目录。

### 启动后端

```bash
cd backend
mvn spring-boot:run -Dspring-boot.run.profiles=dev
```

- API 健康检查：`http://localhost:8080/api/v1/health`
- Swagger UI：`http://localhost:8080/api/swagger-ui.html`
- Actuator 健康检查：`http://localhost:8080/api/actuator/health`

## MVP 模块

- 微信登录与用户身份
- LBS 附近门店与门店切换
- 商品、分类和门店库存
- 购物车、订单和微信支付
- 门店备货、取货码和核销
- 基础退款、营销内容和经营统计

## 开发原则

- 先完成“用户下单—门店备货—到店核销”的交易闭环。
- 采用模块化单体，不在 MVP 阶段拆分微服务。
- 订单、库存、支付和退款使用明确的状态机与幂等规则。
- 后端接口变化必须同步更新 OpenAPI 契约。
- 配置和密钥只通过环境变量或私有配置提供，不提交到仓库。

详细说明见 [系统架构](docs/architecture/overview.md)、[开发协作](docs/development/workflow.md) 和 [API 契约](docs/api/openapi.yaml)。
