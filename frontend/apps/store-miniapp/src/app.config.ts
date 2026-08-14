export default defineAppConfig({
  pages: ['pages/home/index', 'pages/orders/index', 'pages/verify/index', 'pages/profile/index'],
  window: {
    navigationBarTitleText: '黑米姐姐门店端',
    navigationBarBackgroundColor: '#2f1d14',
    navigationBarTextStyle: 'white',
    backgroundColor: '#f7f3ef',
  },
  tabBar: {
    color: '#6f625b',
    selectedColor: '#5c2d13',
    backgroundColor: '#ffffff',
    list: [
      { pagePath: 'pages/home/index', text: '工作台' },
      { pagePath: 'pages/orders/index', text: '订单' },
      { pagePath: 'pages/verify/index', text: '核销' },
      { pagePath: 'pages/profile/index', text: '我的' },
    ],
  },
})
