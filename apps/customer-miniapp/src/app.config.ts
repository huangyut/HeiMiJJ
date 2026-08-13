export default defineAppConfig({
  pages: [
    'pages/home/index',
    'pages/stores/index',
    'pages/cart/index',
    'pages/orders/index',
    'pages/profile/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#28180f',
    navigationBarTitleText: '黑米姐姐',
    navigationBarTextStyle: 'white',
    backgroundColor: '#f8f5ef',
  },
  tabBar: {
    color: '#7a716a',
    selectedColor: '#6c3d20',
    backgroundColor: '#ffffff',
    list: [
      { pagePath: 'pages/home/index', text: '首页' },
      { pagePath: 'pages/stores/index', text: '附近门店' },
      { pagePath: 'pages/cart/index', text: '购物车' },
      { pagePath: 'pages/orders/index', text: '订单' },
      { pagePath: 'pages/profile/index', text: '我的' },
    ],
  },
  permission: {
    'scope.userLocation': {
      desc: '用于查找附近可自提的联营门店',
    },
  },
})
