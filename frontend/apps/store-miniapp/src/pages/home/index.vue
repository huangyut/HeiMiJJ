<template>
  <view class="store-home">
    <view class="store-card">
      <view>
        <text class="store-card__eyebrow">今日门店</text>
        <text class="store-card__name">黑米姐姐 · 湖岸社区店</text>
        <text class="store-card__address">湖岸社区生活广场 1 层</text>
      </view>
      <view class="store-card__status">
        <view class="store-card__dot" />
        <text>营业中</text>
      </view>
    </view>

    <view class="section-heading">
      <text class="section-heading__title">订单工作台</text>
      <text class="section-heading__date">今日实时数据</text>
    </view>

    <view class="metrics">
      <view v-for="metric in metrics" :key="metric.label" class="metric-card">
        <text class="metric-card__value">{{ metric.value }}</text>
        <text class="metric-card__label">{{ metric.label }}</text>
      </view>
    </view>

    <view class="action-grid">
      <view
        v-for="action in actions"
        :key="action.title"
        class="action-card"
        @click="openAction(action)"
      >
        <view class="action-card__icon">{{ action.icon }}</view>
        <view class="action-card__content">
          <text class="action-card__title">{{ action.title }}</text>
          <text class="action-card__description">{{ action.description }}</text>
        </view>
        <text class="action-card__arrow">›</text>
      </view>
    </view>

    <view class="notice-card">
      <text class="notice-card__label">联营提醒</text>
      <text class="notice-card__title">保持库存准确，让附近顾客放心下单</text>
      <text class="notice-card__description"
        >商品、订单和库存接口完成后，此处将展示待处理事项。</text
      >
    </view>
  </view>
</template>

<script setup>
const metrics = [
  { label: '待接单', value: 0 },
  { label: '备货中', value: 0 },
  { label: '待核销', value: 0 },
]

const actions = [
  { title: '门店订单', description: '查看接单和备货进度', icon: '单', url: '/pages/orders/index' },
  {
    title: '取货核销',
    description: '扫描或输入顾客取货码',
    icon: '核',
    url: '/pages/verify/index',
  },
  { title: '库存管理', description: '库存功能将在下一阶段接入', icon: '库' },
  { title: '发起拼团', description: '创建社区团购活动', icon: '团' },
]

function openAction(action) {
  if (action.url) {
    uni.switchTab({ url: action.url })
    return
  }
  uni.showToast({ title: `${action.title}功能建设中`, icon: 'none' })
}
</script>

<style lang="scss">
.store-home {
  min-height: 100vh;
  padding: 28rpx 26rpx 70rpx;
  background: #f3f5f7;
}

.store-card {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 34rpx 30rpx;
  border-radius: 28rpx;
  background: linear-gradient(145deg, #1e2933, #354553);
  color: #fff;
  box-shadow: 0 18rpx 42rpx rgb(23 34 43 / 18%);
}

.store-card__eyebrow,
.store-card__name,
.store-card__address {
  display: block;
}

.store-card__eyebrow {
  color: #d7b58c;
  font-size: 23rpx;
  font-weight: 700;
}

.store-card__name {
  margin-top: 10rpx;
  font-size: 34rpx;
  font-weight: 800;
}

.store-card__address {
  margin-top: 10rpx;
  color: #bcc6cd;
  font-size: 24rpx;
}

.store-card__status {
  display: flex;
  align-items: center;
  padding: 9rpx 14rpx;
  border-radius: 999rpx;
  background: rgb(76 188 120 / 14%);
  color: #92e3b3;
  font-size: 22rpx;
  font-weight: 700;
}

.store-card__dot {
  width: 12rpx;
  height: 12rpx;
  margin-right: 8rpx;
  border-radius: 50%;
  background: #78d99d;
}

.section-heading {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 42rpx;
}

.section-heading__title {
  color: #26313a;
  font-size: 34rpx;
  font-weight: 800;
}

.section-heading__date {
  color: #84909a;
  font-size: 23rpx;
}

.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16rpx;
  margin-top: 20rpx;
}

.metric-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 28rpx 10rpx;
  border: 1rpx solid #e5e9ec;
  border-radius: 22rpx;
  background: #fff;
}

.metric-card__value {
  color: #8a542f;
  font-size: 44rpx;
  font-weight: 900;
}

.metric-card__label {
  margin-top: 8rpx;
  color: #65717b;
  font-size: 24rpx;
  font-weight: 600;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18rpx;
  margin-top: 28rpx;
}

.action-card {
  display: flex;
  min-width: 0;
  align-items: center;
  padding: 24rpx 20rpx;
  border: 1rpx solid #e4e8eb;
  border-radius: 24rpx;
  background: #fff;
}

.action-card__icon {
  display: flex;
  width: 62rpx;
  height: 62rpx;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 18rpx;
  background: #f1e9e1;
  color: #84512f;
  font-size: 28rpx;
  font-weight: 900;
}

.action-card__content {
  display: flex;
  min-width: 0;
  flex: 1;
  flex-direction: column;
  margin-left: 14rpx;
}

.action-card__title {
  color: #303a42;
  font-size: 27rpx;
  font-weight: 800;
}

.action-card__description {
  overflow: hidden;
  margin-top: 6rpx;
  color: #87919a;
  font-size: 21rpx;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-card__arrow {
  margin-left: 8rpx;
  color: #a2abb2;
  font-size: 32rpx;
}

.notice-card {
  display: flex;
  flex-direction: column;
  margin-top: 30rpx;
  padding: 28rpx;
  border-radius: 24rpx;
  background: #ece2d7;
}

.notice-card__label {
  color: #8c5935;
  font-size: 22rpx;
  font-weight: 800;
}

.notice-card__title {
  margin-top: 10rpx;
  color: #4b382b;
  font-size: 29rpx;
  font-weight: 800;
}

.notice-card__description {
  margin-top: 10rpx;
  color: #7b695c;
  font-size: 23rpx;
  line-height: 1.6;
}
</style>
