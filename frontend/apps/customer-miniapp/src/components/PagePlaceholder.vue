<template>
  <view class="placeholder">
    <view class="placeholder__mark">{{ mark }}</view>
    <text class="placeholder__title">{{ title }}</text>
    <text class="placeholder__description">{{ description }}</text>
  </view>
</template>

<script setup>
defineProps({
  mark: {
    type: String,
    default: '黑',
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss">
.placeholder {
  display: flex;
  min-height: 72vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60rpx;
  text-align: center;
}

.placeholder__mark {
  display: flex;
  width: 112rpx;
  height: 112rpx;
  align-items: center;
  justify-content: center;
  border-radius: 36rpx 12rpx 36rpx 12rpx;
  background: #382119;
  color: #f3c88e;
  font-size: 48rpx;
  font-weight: 800;
}

.placeholder__title {
  margin-top: 30rpx;
  color: #30221c;
  font-size: 36rpx;
  font-weight: 800;
}

.placeholder__description {
  max-width: 560rpx;
  margin-top: 16rpx;
  color: #81756d;
  font-size: 27rpx;
  line-height: 1.7;
}
</style>
