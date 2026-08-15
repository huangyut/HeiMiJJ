# 更新日志

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/1.1.0/) 的记录方式。

## Unreleased

### 变更

- 优化消费者小程序首页清晰度，使用本地高清商品素材，并强化“一刻钟生活圈”与锁鲜技术展示
- 重构消费者小程序首页，补充 LBS 附近门店、活动 Banner、快捷分类、今日特惠、新品与个性化推荐
- 将仓库重构为 `frontend` 与 `backend` 两个独立工程，支持两名开发者并行工作
- 将消费者小程序迁移至前端工作区并保留现有页面成果
- 将两个小程序改为 uni-app + Vue 3 + JavaScript，管理后台改为 Vue 3 + Vite + Element Plus
- 使用 OpenAPI 契约替代前后端直接共享语言模型

### 新增

- 新增 uni-app + Vue 3 门店端微信小程序骨架
- 新增 Vue 3 + Vite + Element Plus 平台管理后台骨架
- 新增 Java 21 + Spring Boot 4.1 模块化单体后端
- 新增认证、用户、门店、商品、库存、购物车、订单、支付、自提、退款、营销、内容与统计模块
- 新增统一响应、全局异常处理、Spring Security、MyBatis-Plus、Redis、Flyway 和 OpenAPI 配置
- 新增 MySQL、Redis 本地 Docker Compose 环境
- 新增独立的前端、后端 GitHub Actions 工作流
- 新增前后端协作、接口契约和数据库约定文档

### 删除

- 删除 NestJS 后端工程
- 删除旧的根级 npm Workspaces 配置
- 删除旧的前后端 TypeScript 共享模型包
- 删除前端 Taro、React、TypeScript、Ant Design 代码与旧构建配置

## 0.1.0 - 2026-08-13

### 新增

- 初始化 npm Workspaces Monorepo
- 搭建 Taro + React + TypeScript 消费者微信小程序骨架
- 搭建 NestJS API 服务并提供健康检查、附近门店示例接口
- 新增前后端共享类型与业务常量包
- 新增项目架构、开发指南、环境变量示例与 CI 工作流
