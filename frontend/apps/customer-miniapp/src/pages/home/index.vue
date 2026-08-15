<template>
  <view class="home">
    <view class="hero-header">
      <view class="brand-row">
        <view class="brand-mark">黑</view>
        <view class="brand-copy">
          <text class="brand-copy__name">黑米姐姐</text>
          <text class="brand-copy__slogan">社区好食材 · 新鲜看得见</text>
        </view>
        <view class="brand-service" @click="showComingSoon('客服')">
          <text class="brand-service__icon">•••</text>
          <text class="brand-service__text">客服</text>
        </view>
      </view>

      <view class="search-bar">
        <text class="search-bar__icon">⌕</text>
        <input
          class="search-bar__input"
          placeholder="搜索牛排、海鲜、冰淇淋"
          placeholder-class="search-bar__placeholder"
          confirm-type="search"
        />
        <text class="search-bar__action">搜索</text>
      </view>

      <view class="pickup-card">
        <view class="pickup-card__pin">
          <view class="pickup-card__pin-dot" />
        </view>
        <view class="pickup-card__content" @click="locateNearbyStores()">
          <view class="pickup-card__eyebrow-row">
            <text class="pickup-card__eyebrow">一刻钟生活圈</text>
            <text
              class="pickup-card__status"
              :class="
                storeStatus === '营业中'
                  ? 'pickup-card__status--open'
                  : 'pickup-card__status--waiting'
              "
            >
              {{ storeStatus }}
            </text>
          </view>
          <view class="pickup-card__store-row">
            <text class="pickup-card__store">{{ storeName }}</text>
            <text class="pickup-card__arrow">›</text>
          </view>
          <text class="pickup-card__distance">{{ storeDistance }} · 支持到店自提</text>
        </view>
        <view class="pickup-card__time" @click.stop="openStores">
          <text class="pickup-card__number">15</text>
          <view class="pickup-card__unit">
            <text>分钟</text>
            <text>可取</text>
          </view>
        </view>
      </view>
    </view>

    <view class="announcement">
      <text class="announcement__badge">今日公告</text>
      <text class="announcement__text">新用户首单立减 20 元，附近门店快速自提</text>
      <text class="announcement__arrow">›</text>
    </view>

    <swiper
      class="banner-swiper"
      indicator-dots
      indicator-color="rgba(255, 255, 255, 0.45)"
      indicator-active-color="#ffffff"
      autoplay
      circular
      :interval="4500"
    >
      <swiper-item v-for="banner in banners" :key="banner.title">
        <view class="banner" :class="`banner--${banner.tone}`">
          <view class="banner__content">
            <text class="banner__badge">{{ banner.badge }}</text>
            <text class="banner__title">{{ banner.title }}</text>
            <text class="banner__description">{{ banner.description }}</text>
            <text class="banner__action">{{ banner.action }} →</text>
          </view>
          <view class="banner__visual">
            <view class="banner__image-frame">
              <image class="banner__image" :src="banner.image" mode="aspectFill" />
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>

    <view class="shortcut-panel">
      <view
        v-for="shortcut in shortcuts"
        :key="shortcut.label"
        class="shortcut"
        @click="handleShortcut(shortcut.label)"
      >
        <view class="shortcut__icon" :class="`shortcut__icon--${shortcut.tone}`">
          <text>{{ shortcut.icon }}</text>
        </view>
        <text class="shortcut__label">{{ shortcut.label }}</text>
      </view>
    </view>

    <view class="technology-card" @click="openTechnology">
      <view class="technology-card__topline">
        <view>
          <text class="technology-card__eyebrow">黑米姐姐技术展示</text>
          <text class="technology-card__title">锁住新鲜，也把原理讲清楚</text>
        </view>
        <view class="technology-card__play">
          <view class="technology-card__play-icon" />
        </view>
      </view>
      <text class="technology-card__description">
        从急速锁鲜、全程冷链到门店自提，每一步都有依据
      </text>
      <view class="technology-metrics">
        <view class="technology-metric">
          <text class="technology-metric__value">-35℃</text>
          <text class="technology-metric__label">急速锁鲜</text>
        </view>
        <view class="technology-metrics__line" />
        <view class="technology-metric">
          <text class="technology-metric__value">全程</text>
          <text class="technology-metric__label">冷链温控</text>
        </view>
        <view class="technology-metrics__line" />
        <view class="technology-metric">
          <text class="technology-metric__value">可追溯</text>
          <text class="technology-metric__label">商品批次</text>
        </view>
      </view>
      <view class="technology-card__footer">
        <text class="technology-card__watch">2 分钟看懂锁鲜技术</text>
        <text class="technology-card__link">查看原理 →</text>
      </view>
    </view>

    <view class="content-section content-section--special">
      <view class="section-heading">
        <view class="section-heading__main">
          <view class="section-heading__bar" />
          <view>
            <text class="section-heading__title">今日特惠</text>
            <text class="section-heading__subtitle">门店每日 10:00 更新</text>
          </view>
        </view>
        <view class="countdown">
          <text class="countdown__label">距结束</text>
          <view
            v-for="(time, index) in countdown"
            :key="`${time}-${index}`"
            class="countdown__group"
          >
            <text class="countdown__number">{{ time }}</text>
            <text v-if="index < countdown.length - 1" class="countdown__colon">:</text>
          </view>
        </view>
      </view>

      <scroll-view class="product-scroll" scroll-x enhanced :show-scrollbar="false">
        <view class="product-scroll__content">
          <view
            v-for="product in specialProducts"
            :key="product.id"
            class="special-card"
            @click="handleProduct(product)"
          >
            <view class="product-image-wrap">
              <image class="product-image" :src="product.image" mode="aspectFill" />
              <text class="product-image__tag">{{ product.tag }}</text>
            </view>
            <view class="special-card__body">
              <text class="special-card__name">{{ product.name }}</text>
              <text class="special-card__description">{{ product.description }}</text>
              <view class="price-row">
                <text class="price-row__currency">¥</text>
                <text class="price-row__price">{{ product.price }}</text>
                <text class="price-row__original">¥{{ product.originalPrice }}</text>
              </view>
            </view>
          </view>
        </view>
      </scroll-view>
    </view>

    <view class="content-section">
      <view class="section-heading">
        <view class="section-heading__main">
          <view class="section-heading__bar section-heading__bar--gold" />
          <view>
            <text class="section-heading__title">新品推荐</text>
            <text class="section-heading__subtitle">严选本周新鲜好味</text>
          </view>
        </view>
        <text class="section-heading__more">查看更多 ›</text>
      </view>

      <view class="new-product-grid">
        <view
          v-for="product in newProducts"
          :key="product.id"
          class="new-product-card"
          @click="handleProduct(product)"
        >
          <view class="new-product-card__visual">
            <image class="new-product-card__image" :src="product.image" mode="aspectFill" />
            <text class="new-product-card__tag">{{ product.tag }}</text>
          </view>
          <view class="new-product-card__body">
            <text class="new-product-card__name">{{ product.name }}</text>
            <text class="new-product-card__description">{{ product.description }}</text>
            <view class="new-product-card__footer">
              <view class="price-row">
                <text class="price-row__currency">¥</text>
                <text class="price-row__price">{{ product.price }}</text>
              </view>
              <view class="add-button">＋</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="quality-promise">
      <text class="quality-promise__eyebrow">HEIMI QUALITY</text>
      <text class="quality-promise__title">每一份食材，都经得起了解</text>
      <view class="quality-promise__items">
        <text>严选产地</text>
        <view class="quality-promise__dot" />
        <text>冷链到店</text>
        <view class="quality-promise__dot" />
        <text>社区自提</text>
      </view>
    </view>

    <text class="home-footer">黑米姐姐 · 社区联营，让好食材离家更近</text>
  </view>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'

import crabImage from '../../assets/home/crab.png'
import dumplingImage from '../../assets/home/dumpling.png'
import icecreamImage from '../../assets/home/icecream.png'
import pastaImage from '../../assets/home/pasta.png'
import salmonImage from '../../assets/home/salmon.png'
import sausageImage from '../../assets/home/sausage.png'
import shrimpImage from '../../assets/home/shrimp.png'
import steakImage from '../../assets/home/steak.png'

const banners = [
  {
    badge: '黑米姐姐严选',
    title: '好食材，离家更近',
    description: '线上下单，附近门店约 15 分钟可取',
    action: '立即选购',
    image: steakImage,
    tone: 'warm',
  },
  {
    badge: '全程冷链',
    title: '鲜味从产地到社区',
    description: '温控运输，到店储存，全链路守护新鲜',
    action: '查看品质保障',
    image: shrimpImage,
    tone: 'fresh',
  },
  {
    badge: '夏日新品',
    title: '清凉好味限时上新',
    description: '牛乳冰淇淋第二件半价，附近门店可取',
    action: '抢先尝鲜',
    image: icecreamImage,
    tone: 'sweet',
  },
]

const shortcuts = [
  { label: '肉类', icon: '肉', tone: 'rose' },
  { label: '海鲜', icon: '鲜', tone: 'blue' },
  { label: '速食', icon: '速', tone: 'yellow' },
  { label: '冰淇淋', icon: '冰', tone: 'pink' },
  { label: '火锅食材', icon: '锅', tone: 'orange' },
  { label: '今日特价', icon: '惠', tone: 'red' },
  { label: '新品', icon: '新', tone: 'purple' },
  { label: '附近门店', icon: '店', tone: 'green' },
  { label: '优惠券', icon: '券', tone: 'gold' },
  { label: '全部分类', icon: '全', tone: 'slate' },
]

const specialProducts = [
  {
    id: 1,
    name: '谷饲雪花牛排 180g',
    description: '原切整肉 · 鲜嫩多汁',
    price: '39.9',
    originalPrice: '59.9',
    image: steakImage,
    tag: '限量 80 份',
  },
  {
    id: 2,
    name: '北极甜虾 500g',
    description: '解冻即食 · 鲜甜饱满',
    price: '29.9',
    originalPrice: '45.9',
    image: shrimpImage,
    tag: '已抢 62%',
  },
  {
    id: 3,
    name: '手工鲜虾水饺',
    description: '皮薄馅足 · 早餐优选',
    price: '25.9',
    originalPrice: '39.9',
    image: dumplingImage,
    tag: '门店热销',
  },
  {
    id: 4,
    name: '爆汁烤肠 10 根',
    description: '肉香浓郁 · 快手加餐',
    price: '19.9',
    originalPrice: '29.9',
    image: sausageImage,
    tag: '今日特惠',
  },
]

const newProducts = [
  {
    id: 11,
    name: '挪威三文鱼切片',
    description: '低温锁鲜，口感细腻',
    price: '49.9',
    image: salmonImage,
    tag: '本周新品',
  },
  {
    id: 12,
    name: '黑松露奶油意面',
    description: '8 分钟完成精致一餐',
    price: '26.9',
    image: pastaImage,
    tag: '主厨推荐',
  },
  {
    id: 13,
    name: '帝王蟹腿拼盘',
    description: '大块蟹肉，家庭分享',
    price: '89.0',
    image: crabImage,
    tag: '限时上新',
  },
  {
    id: 14,
    name: '牛乳芝士冰淇淋',
    description: '浓郁奶香，清爽不腻',
    price: '16.9',
    image: icecreamImage,
    tag: '第二件半价',
  },
]

const storeName = ref('正在匹配附近门店')
const storeDistance = ref('开启定位后显示距离')
const storeStatus = ref('定位中')
const locating = ref(false)
const remainingSeconds = ref(2 * 60 * 60 + 18 * 60 + 6)
let countdownTimer

const countdown = computed(() => {
  const hours = Math.floor(remainingSeconds.value / 3600)
  const minutes = Math.floor((remainingSeconds.value % 3600) / 60)
  const seconds = remainingSeconds.value % 60
  return [hours, minutes, seconds].map((value) => String(value).padStart(2, '0'))
})

async function locateNearbyStores(silent = false) {
  if (locating.value) return

  locating.value = true
  if (!silent) {
    storeName.value = '正在重新定位…'
    storeDistance.value = '正在匹配最近的营业门店'
    storeStatus.value = '定位中'
  }

  try {
    await uni.getLocation({ type: 'gcj02' })
    storeName.value = '黑米姐姐 · 湖岸社区店'
    storeDistance.value = '距你 1.2km'
    storeStatus.value = '营业中'
  } catch {
    storeName.value = '请选择附近自提门店'
    storeDistance.value = '定位未开启，可手动选择'
    storeStatus.value = '待选择'
  } finally {
    locating.value = false
  }
}

function openStores() {
  uni.switchTab({ url: '/pages/stores/index' })
}

function showComingSoon(name) {
  uni.showToast({ title: `${name}功能建设中`, icon: 'none' })
}

function handleShortcut(label) {
  if (label === '附近门店') {
    openStores()
    return
  }
  showComingSoon(label)
}

function handleProduct(product) {
  uni.showToast({ title: product.name, icon: 'none' })
}

function openTechnology() {
  uni.showToast({ title: '技术科普详情页建设中', icon: 'none' })
}

onMounted(() => {
  locateNearbyStores(true)
  countdownTimer = setInterval(() => {
    remainingSeconds.value = remainingSeconds.value > 0 ? remainingSeconds.value - 1 : 2 * 60 * 60
  }, 1000)
})

onUnmounted(() => {
  clearInterval(countdownTimer)
})
</script>

<style lang="scss" src="./index.scss"></style>
