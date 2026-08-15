export class HeiMiApiClient {
  constructor(transport) {
    if (typeof transport !== 'function') {
      throw new TypeError('transport 必须是函数')
    }

    this.transport = transport
  }

  request(path, config = {}) {
    return this.transport(path, config)
  }

  health() {
    return this.request('/health')
  }
}
