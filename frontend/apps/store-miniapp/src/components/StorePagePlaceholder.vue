<template>
  <view class="placeholder">
    <text class="placeholder__eyebrow">黑米姐姐门店端</text>
    <text class="placeholder__title">{{ title }}</text>
    <text class="placeholder__description">{{ description }}</text>
  </view>
</template>

<script setup>
defineProps({
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
  padding: 64rpx;
  text-align: center;
}

.placeholder__eyebrow {
  color: #9a6a44;
  font-size: 23rpx;
  font-weight: 800;
  letter-spacing: 3rpx;
}

.placeholder__title {
  margin-top: 18rpx;
  color: #26313a;
  font-size: 38rpx;
  font-weight: 800;
}

.placeholder__description {
  max-width: 560rpx;
  margin-top: 16rpx;
  color: #77818a;
  font-size: 27rpx;
  line-height: 1.7;
}
</style>
