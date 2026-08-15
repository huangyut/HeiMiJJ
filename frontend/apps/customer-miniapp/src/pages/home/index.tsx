import { Image, Input, ScrollView, Swiper, SwiperItem, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useEffect, useMemo, useState } from 'react'

import crabImage from '../../assets/home/crab.png'
import dumplingImage from '../../assets/home/dumpling.png'
import icecreamImage from '../../assets/home/icecream.png'
import pastaImage from '../../assets/home/pasta.png'
import salmonImage from '../../assets/home/salmon.png'
import sausageImage from '../../assets/home/sausage.png'
import shrimpImage from '../../assets/home/shrimp.png'
import steakImage from '../../assets/home/steak.png'

import './index.scss'

type Product = {
  id: number
  name: string
  description: string
  price: string
  originalPrice?: string
  image: string
  tag?: string
}

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

const specialProducts: Product[] = [
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

const newProducts: Product[] = [
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

const formatTime = (seconds: number) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  return [hours, minutes, secs].map((value) => String(value).padStart(2, '0'))
}

export default function HomePage() {
  const [storeName, setStoreName] = useState('正在匹配附近门店')
  const [storeDistance, setStoreDistance] = useState('开启定位后显示距离')
  const [storeStatus, setStoreStatus] = useState('定位中')
  const [locating, setLocating] = useState(false)
  const [remainingSeconds, setRemainingSeconds] = useState(2 * 60 * 60 + 18 * 60 + 6)

  const countdown = useMemo(() => formatTime(remainingSeconds), [remainingSeconds])

  const locateNearbyStores = async (silent = false) => {
    if (locating) return

    setLocating(true)
    if (!silent) {
      setStoreName('正在重新定位…')
      setStoreDistance('正在匹配最近的营业门店')
      setStoreStatus('定位中')
    }

    try {
      await Taro.getLocation({ type: 'gcj02' })
      setStoreName('黑米姐姐 · 湖岸社区店')
      setStoreDistance('距你 1.2km')
      setStoreStatus('营业中')
    } catch {
      setStoreName('请选择附近自提门店')
      setStoreDistance('定位未开启，可手动选择')
      setStoreStatus('待选择')
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

  const openStores = () => {
    void Taro.switchTab({ url: '/pages/stores/index' })
  }

  const handleShortcut = (label: string) => {
    if (label === '附近门店') {
      openStores()
      return
    }

    Taro.showToast({ title: `正在打开${label}`, icon: 'none' })
  }

  const handleProduct = (product: Product) => {
    Taro.showToast({ title: product.name, icon: 'none' })
  }

  const openTechnology = () => {
    Taro.showToast({ title: '技术科普详情页建设中', icon: 'none' })
  }

  return (
    <View className="home">
      <View className="hero-header">
        <View className="brand-row">
          <View className="brand-mark">黑</View>
          <View className="brand-copy">
            <Text className="brand-copy__name">黑米姐姐</Text>
            <Text className="brand-copy__slogan">社区好食材 · 新鲜看得见</Text>
          </View>
          <View
            className="brand-service"
            onClick={() => Taro.showToast({ title: '客服功能建设中', icon: 'none' })}
          >
            <Text className="brand-service__icon">•••</Text>
            <Text className="brand-service__text">客服</Text>
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

        <View className="pickup-card">
          <View className="pickup-card__pin">
            <View className="pickup-card__pin-dot" />
          </View>
          <View className="pickup-card__content" onClick={() => void locateNearbyStores()}>
            <View className="pickup-card__eyebrow-row">
              <Text className="pickup-card__eyebrow">一刻钟生活圈</Text>
              <Text
                className={`pickup-card__status pickup-card__status--${storeStatus === '营业中' ? 'open' : 'waiting'}`}
              >
                {storeStatus}
              </Text>
            </View>
            <View className="pickup-card__store-row">
              <Text className="pickup-card__store">{storeName}</Text>
              <Text className="pickup-card__arrow">›</Text>
            </View>
            <Text className="pickup-card__distance">{storeDistance} · 支持到店自提</Text>
          </View>
          <View className="pickup-card__time" onClick={openStores}>
            <Text className="pickup-card__number">15</Text>
            <View className="pickup-card__unit">
              <Text>分钟</Text>
              <Text>可取</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="announcement">
        <Text className="announcement__badge">今日公告</Text>
        <Text className="announcement__text">新用户首单立减 20 元，附近门店快速自提</Text>
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
                <View className="banner__image-frame">
                  <Image className="banner__image" src={banner.image} mode="aspectFill" />
                </View>
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
              <Text>{shortcut.icon}</Text>
            </View>
            <Text className="shortcut__label">{shortcut.label}</Text>
          </View>
        ))}
      </View>

      <View className="technology-card" onClick={openTechnology}>
        <View className="technology-card__topline">
          <View>
            <Text className="technology-card__eyebrow">黑米姐姐技术展示</Text>
            <Text className="technology-card__title">锁住新鲜，也把原理讲清楚</Text>
          </View>
          <View className="technology-card__play">
            <View className="technology-card__play-icon" />
          </View>
        </View>
        <Text className="technology-card__description">
          从急速锁鲜、全程冷链到门店自提，每一步都有依据
        </Text>
        <View className="technology-metrics">
          <View className="technology-metric">
            <Text className="technology-metric__value">-35℃</Text>
            <Text className="technology-metric__label">急速锁鲜</Text>
          </View>
          <View className="technology-metrics__line" />
          <View className="technology-metric">
            <Text className="technology-metric__value">全程</Text>
            <Text className="technology-metric__label">冷链温控</Text>
          </View>
          <View className="technology-metrics__line" />
          <View className="technology-metric">
            <Text className="technology-metric__value">可追溯</Text>
            <Text className="technology-metric__label">商品批次</Text>
          </View>
        </View>
        <View className="technology-card__footer">
          <Text className="technology-card__watch">2 分钟看懂锁鲜技术</Text>
          <Text className="technology-card__link">查看原理 →</Text>
        </View>
      </View>

      <View className="content-section content-section--special">
        <View className="section-heading">
          <View className="section-heading__main">
            <View className="section-heading__bar" />
            <View>
              <Text className="section-heading__title">今日特惠</Text>
              <Text className="section-heading__subtitle">门店每日 10:00 更新</Text>
            </View>
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

        <ScrollView className="product-scroll" scrollX enhanced showScrollbar={false}>
          <View className="product-scroll__content">
            {specialProducts.map((product) => (
              <View
                className="special-card"
                key={product.id}
                onClick={() => handleProduct(product)}
              >
                <View className="product-image-wrap">
                  <Image className="product-image" src={product.image} mode="aspectFill" />
                  <Text className="product-image__tag">{product.tag}</Text>
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
            <View className="section-heading__bar section-heading__bar--gold" />
            <View>
              <Text className="section-heading__title">新品推荐</Text>
              <Text className="section-heading__subtitle">严选本周新鲜好味</Text>
            </View>
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
              <View className="new-product-card__visual">
                <Image className="new-product-card__image" src={product.image} mode="aspectFill" />
                <Text className="new-product-card__tag">{product.tag}</Text>
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

      <View className="quality-promise">
        <Text className="quality-promise__eyebrow">HEIMI QUALITY</Text>
        <Text className="quality-promise__title">每一份食材，都经得起了解</Text>
        <View className="quality-promise__items">
          <Text>严选产地</Text>
          <View className="quality-promise__dot" />
          <Text>冷链到店</Text>
          <View className="quality-promise__dot" />
          <Text>社区自提</Text>
        </View>
      </View>

      <Text className="home-footer">黑米姐姐 · 社区联营，让好食材离家更近</Text>
    </View>
  )
}
