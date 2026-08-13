import { Button, Text, View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState } from 'react'

import './index.scss'

const features = [
  { title: '15 分钟可取', description: '优先推荐离你最近的营业门店' },
  { title: '品质看得见', description: '图文视频讲清黑米技术与产品特点' },
  { title: '社区联营', description: '门店就在身边，售后和提货更方便' },
]

export default function HomePage() {
  const [locationText, setLocationText] = useState('点击定位附近门店')

  const locateNearbyStores = async () => {
    setLocationText('正在定位…')

    try {
      await Taro.getLocation({ type: 'gcj02' })
      setLocationText('已定位，正在匹配附近门店')
    } catch {
      setLocationText('定位未开启，可前往门店列表手动选择')
    }
  }

  return (
    <View className="home">
      <View className="hero">
        <Text className="hero__eyebrow">社区一刻钟生活圈</Text>
        <Text className="hero__title">新鲜与品质，离家更近一点</Text>
        <Text className="hero__description">线上选购，附近联营门店自提</Text>
        <Button className="hero__location" onClick={locateNearbyStores}>
          {locationText}
        </Button>
      </View>

      <View className="section">
        <View className="section__heading">
          <Text className="section__title">为什么选择黑米姐姐</Text>
          <Text className="section__subtitle">方便、可信、就在社区</Text>
        </View>

        <View className="feature-list">
          {features.map((feature, index) => (
            <View className="feature-card" key={feature.title}>
              <Text className="feature-card__number">0{index + 1}</Text>
              <View className="feature-card__content">
                <Text className="feature-card__title">{feature.title}</Text>
                <Text className="feature-card__description">{feature.description}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View className="promise">
        <Text className="promise__label">黑米姐姐技术展示</Text>
        <Text className="promise__title">不只告诉你产品好，也告诉你为什么好</Text>
        <Text className="promise__description">后续将在商品详情页接入技术科普视频和图文内容。</Text>
      </View>
    </View>
  )
}
