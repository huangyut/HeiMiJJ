# 公共层

仅放置两个及以上业务模块共同使用的代码，避免把具体业务逻辑放入公共层。

- `constants/`：错误码、请求头等稳定常量
- `exceptions/`：统一业务异常
- `interfaces/`：分页结果等通用接口
- `types/`：当前用户、请求上下文等通用类型
- 后续可增加 `decorators/`、`filters/`、`guards/`、`interceptors/` 和 `pipes/`
