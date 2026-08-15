import { Input, ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useMemo, useState } from 'react'

import './index.scss'

type Product = {
  id: number
  name: string
  description: string
  price: string
  originalPrice?: string
  emoji: string
  tone: string
  tag?: string
}

const banners = [
  {
    badge: '新人专享',
    title: '首单立减 20 元',
    description: '社区好物线上选，附近门店 15 分钟可取',
    action: '立即逛逛',
    emoji: '🥩',
    tone: 'berry',
  },
  {
    badge: '产地直达',
    title: '海鲜尝鲜季',
    description: '严选鲜虾与鱼类，到店自提更新鲜',
    action: '去尝鲜',
    emoji: '🦐',
    tone: 'ocean',
  },
  {
    badge: '夏日新品',
    title: '冰爽囤货节',
    description: '冰淇淋第二件半价，数量有限',
    action: '抢先购',
    emoji: '🍦',
    tone: 'cream',
  },
]

const shortcuts = [
  { label: '肉类', emoji: '🥩', tone: 'rose' },
  { label: '海鲜', emoji: '🦐', tone: 'blue' },
  { label: '速食', emoji: '🥟', tone: 'yellow' },
  { label: '冰淇淋', emoji: '🍦', tone: 'pink' },
  { label: '火锅食材', emoji: '🍲', tone: 'orange' },
  { label: '今日特价', emoji: '⚡', tone: 'red' },
  { label: '新品', emoji: '✨', tone: 'purple' },
  { label: '附近门店', emoji: '📍', tone: 'green' },
  { label: '优惠券', emoji: '🎫', tone: 'gold' },
  { label: '全部分类', emoji: '▦', tone: 'slate' },
]

const specialProducts: Product[] = [
  {
    id: 1,
    name: '谷饲雪花牛排 180g',
    description: '鲜嫩多汁 · 原切整肉',
    price: '39.9',
    originalPrice: '59.9',
    emoji: '🥩',
    tone: 'steak',
    tag: '限量 80 份',
  },
  {
    id: 2,
    name: '北极甜虾 500g',
    description: '解冻即食 · 鲜甜饱满',
    price: '29.9',
    originalPrice: '45.9',
    emoji: '🦐',
    tone: 'shrimp',
    tag: '已抢 62%',
  },
  {
    id: 3,
    name: '手工鲜虾水饺',
    description: '皮薄馅足 · 早餐优选',
    price: '25.9',
    originalPrice: '39.9',
    emoji: '🥟',
    tone: 'dumpling',
    tag: '门店热销',
  },
  {
    id: 4,
    name: '爆汁烤肠 10 根',
    description: '肉香浓郁 · 快手加餐',
    price: '19.9',
    originalPrice: '29.9',
    emoji: '🌭',
    tone: 'sausage',
    tag: '今日特惠',
  },
]

const newProducts: Product[] = [
  {
    id: 11,
    name: '挪威三文鱼切片',
    description: '低温锁鲜，口感细腻',
    price: '49.9',
    emoji: '🍣',
    tone: 'salmon',
    tag: '新品',
  },
  {
    id: 12,
    name: '黑松露奶油意面',
    description: '8 分钟轻松完成一餐',
    price: '26.9',
    emoji: '🍝',
    tone: 'pasta',
    tag: '主厨推荐',
  },
  {
    id: 13,
    name: '帝王蟹腿拼盘',
    description: '大块蟹肉，家庭聚餐',
    price: '89.0',
    emoji: '🦀',
    tone: 'crab',
    tag: '限时上新',
  },
  {
    id: 14,
    name: '牛乳芝士冰淇淋',
    description: '浓郁奶香，清爽不腻',
    price: '16.9',
    emoji: '🍨',
    tone: 'icecream',
    tag: '第二件半价',
  },
]

const personalizedProducts: Product[] = [
  {
    id: 21,
    name: '潮汕手打牛肉丸',
    description: '根据你常买的火锅食材推荐',
    price: '32.9',
    emoji: '🍢',
    tone: 'meatball',
  },
  {
    id: 22,
    name: '香辣小龙虾尾',
    description: '根据你最近浏览的海鲜推荐',
    price: '36.9',
    emoji: '🦞',
    tone: 'lobster',
  },
]

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return [hours, minutes, secs].map((value) => String(value).padStart(2, '0'))
}

export default function HomePage() {
  const [storeName, setStoreName] = useState('正在匹配附近门店')
  const [storeMeta, setStoreMeta] = useState('开启定位，优先展示可快速自提门店')
  const [locating, setLocating] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(2 * 60 * 60 + 18 * 60 + 6)

  const countdown = useMemo(() => formatTime(remainingSeconds), [remainingSeconds])

  const locateNearbyStores = async (silent = false) => {
    if (locating) return

    setLocating(true)
    if (!silent) {
      setStoreName('正在重新定位…')
      setStoreMeta('请稍候，正在匹配最近的营业门店')
    }

    try {
      await Taro.getLocation({ type: 'gcj02' })
      setStoreName('黑米姐姐 · 湖岸社区店')
      setStoreMeta('距你 1.2km · 营业中 · 约 15 分钟可取')
    } catch {
      setStoreName('请选择附近自提门店')
      setStoreMeta('定位未开启，也可以手动选择门店')
    } finally {
      setLocating(false)
    }
  }

  useEffect(() => {
    void locateNearbyStores(true)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingSeconds((current) => (current > 0 ? current - 1 : 2 * 60 * 60))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleShortcut = (label: string) => {
    if (label === '附近门店') {
      void Taro.switchTab({ url: '/pages/stores/index' })
      return
    }

    Taro.showToast({ title: `正在打开${label}`, icon: 'none' })
  }

  const handleProduct = (product: Product) => {
    Taro.showToast({ title: product.name, icon: 'none' })
  }

  return (
    <View className="home">
      <View className="home-header">
        <View className="location-row" onClick={() => void locateNearbyStores()}>
          <View className="location-row__pin">⌖</View>
          <View className="location-row__content">
            <View className="location-row__title-line">
              <Text className="location-row__title">{storeName}</Text>
              <Text className="location-row__arrow">›</Text>
            </View>
            <Text className="location-row__meta">{storeMeta}</Text>
          </View>
          <View className="location-row__pickup">
            <Text className="location-row__pickup-time">15</Text>
            <Text className="location-row__pickup-unit">分钟可取</Text>
          </View>
        </View>

        <View className="search-bar">
          <Text className="search-bar__icon">⌕</Text>
          <Input
            className="search-bar__input"
            placeholder="搜索牛排、海鲜、冰淇淋"
            placeholderClass="search-bar__placeholder"
            confirmType="search"
          />
          <Text className="search-bar__action">搜索</Text>
        </View>
      </View>

      <View className="announcement">
        <Text className="announcement__badge">公告</Text>
        <Text className="announcement__text">新用户首单立减 20 元，下单后附近门店快速自提</Text>
        <Text className="announcement__arrow">›</Text>
      </View>

      <Swiper
        className="banner-swiper"
        indicatorDots
        indicatorColor="rgba(255, 255, 255, 0.45)"
        indicatorActiveColor="#ffffff"
        autoplay
        circular
        interval={4500}
      >
        {banners.map((banner) => (
          <SwiperItem key={banner.title}>
            <View className={`banner banner--${banner.tone}`}>
              <View className="banner__content">
                <Text className="banner__badge">{banner.badge}</Text>
                <Text className="banner__title">{banner.title}</Text>
                <Text className="banner__description">{banner.description}</Text>
                <Text className="banner__action">{banner.action} →</Text>
              </View>
              <View className="banner__visual">
                <View className="banner__halo" />
                <Text className="banner__emoji">{banner.emoji}</Text>
              </View>
            </View>
          </SwiperItem>
        ))}
      </Swiper>

      <View className="shortcut-panel">
        {shortcuts.map((shortcut) => (
          <View
            className="shortcut"
            key={shortcut.label}
            onClick={() => handleShortcut(shortcut.label)}
          >
            <View className={`shortcut__icon shortcut__icon--${shortcut.tone}`}>
              <Text>{shortcut.emoji}</Text>
            </View>
            <Text className="shortcut__label">{shortcut.label}</Text>
          </View>
        ))}
      </View>

      <View className="content-section content-section--special">
        <View className="section-heading">
          <View className="section-heading__main">
            <View className="section-heading__bar" />
            <Text className="section-heading__title">今日特惠</Text>
            <Text className="section-heading__subtitle">每日 10:00 更新</Text>
          </View>
          <View className="countdown">
            <Text className="countdown__label">距结束</Text>
            {countdown.map((time, index) => (
              <View className="countdown__group" key={`${time}-${index}`}>
                <Text className="countdown__number">{time}</Text>
                {index < countdown.length - 1 && <Text className="countdown__colon">:</Text>}
              </View>
            ))}
          </View>
        </View>

        <ScrollView className="product-scroll" scrollX>
          <View className="product-scroll__content">
            {specialProducts.map((product) => (
              <View
                className="special-card"
                key={product.id}
                onClick={() => handleProduct(product)}
              >
                <View className={`product-visual product-visual--${product.tone}`}>
                  <Text className="product-visual__tag">{product.tag}</Text>
                  <View className="product-visual__plate" />
                  <Text className="product-visual__emoji">{product.emoji}</Text>
                </View>
                <View className="special-card__body">
                  <Text className="special-card__name">{product.name}</Text>
                  <Text className="special-card__description">{product.description}</Text>
                  <View className="price-row">
                    <Text className="price-row__currency">¥</Text>
                    <Text className="price-row__price">{product.price}</Text>
                    <Text className="price-row__original">¥{product.originalPrice}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>

      <View className="content-section">
        <View className="section-heading">
          <View className="section-heading__main">
            <View className="section-heading__bar" />
            <Text className="section-heading__title">新品推荐</Text>
            <Text className="section-heading__subtitle">本周上新</Text>
          </View>
          <Text className="section-heading__more">查看更多 ›</Text>
        </View>

        <View className="new-product-grid">
          {newProducts.map((product) => (
            <View
              className="new-product-card"
              key={product.id}
              onClick={() => handleProduct(product)}
            >
              <View className={`new-product-card__visual product-visual--${product.tone}`}>
                <Text className="new-product-card__tag">{product.tag}</Text>
                <View className="new-product-card__circle" />
                <Text className="new-product-card__emoji">{product.emoji}</Text>
              </View>
              <View className="new-product-card__body">
                <Text className="new-product-card__name">{product.name}</Text>
                <Text className="new-product-card__description">{product.description}</Text>
                <View className="new-product-card__footer">
                  <View className="price-row">
                    <Text className="price-row__currency">¥</Text>
                    <Text className="price-row__price">{product.price}</Text>
                  </View>
                  <View className="add-button">＋</View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="recommendation">
        <View className="recommendation__heading">
          <View>
            <Text className="recommendation__eyebrow">懂你的社区冰箱</Text>
            <Text className="recommendation__title">为你推荐</Text>
          </View>
          <Text className="recommendation__reason">根据浏览和购买记录</Text>
        </View>

        {personalizedProducts.map((product) => (
          <View
            className="recommendation-card"
            key={product.id}
            onClick={() => handleProduct(product)}
          >
            <View className={`recommendation-card__visual product-visual--${product.tone}`}>
              <Text>{product.emoji}</Text>
            </View>
            <View className="recommendation-card__content">
              <Text className="recommendation-card__name">{product.name}</Text>
              <Text className="recommendation-card__description">{product.description}</Text>
              <Text className="recommendation-card__price">¥{product.price}</Text>
            </View>
            <Text className="recommendation-card__arrow">›</Text>
          </View>
        ))}
      </View>

      <Text className="home-footer">黑米姐姐 · 社区联营，让好食材离家更近</Text>
    </View>
  )
}
