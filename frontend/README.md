# 黑米姐姐前端

前端工作区包含消费者小程序、门店小程序和平台管理后台，统一使用 React + TypeScript。

## 启动命令

```bash
npm install
npm run dev:customer
npm run dev:store
npm run dev:admin
```

两个小程序使用 Taro 构建，管理后台使用 Vite。Java API 默认地址为 `http://localhost:8080/api/v1`。

## 公共包

- `api-client`：与传输方式无关的 API 客户端定义。
- `shared-types`：前端应用共用的业务类型。
- `shared-constants`：状态、缓存键等公共常量。
- `shared-utils`：金额、日期等无平台依赖的工具。

小程序组件与管理后台组件运行环境不同，不强制共用 UI 组件；业务类型和纯函数可以共用。
