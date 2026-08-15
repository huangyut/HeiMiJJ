# 黑米姐姐前端

前端工作区包含消费者小程序、门店小程序和平台管理后台，统一使用 Vue 3 + JavaScript，便于使用 HTML、CSS、JavaScript 和 Vue 直接开发。

## 启动命令

```bash
npm install
npm run dev:customer
npm run dev:store
npm run dev:admin
```

两个小程序使用 uni-app 构建，管理后台使用 Vite + Element Plus。Java API 默认地址为 `http://localhost:8080/api/v1`。

运行小程序开发命令后，在微信开发者工具中分别导入：

- 消费者端：`apps/customer-miniapp/dist/dev/mp-weixin`
- 门店端：`apps/store-miniapp/dist/dev/mp-weixin`

如需修改接口地址，可在前端环境变量中设置 `VITE_API_BASE_URL`。

## 公共包

- `api-client`：与传输方式无关的 API 客户端定义。
- `shared-constants`：状态、缓存键等公共常量。
- `shared-utils`：金额、日期等无平台依赖的工具。

小程序组件与管理后台组件运行环境不同，不强制共用 UI 组件；API 调用、常量和纯函数可以共用。前后端字段定义以 `docs/api/openapi.yaml` 为准。
