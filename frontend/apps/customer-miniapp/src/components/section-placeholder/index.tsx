import { Text, View } from '@tarojs/components'

import './index.scss'

interface SectionPlaceholderProps {
  title: string
  description: string
}

export function SectionPlaceholder({ title, description }: SectionPlaceholderProps) {
  return (
    <View className="placeholder">
      <Text className="placeholder__eyebrow">黑米姐姐</Text>
      <Text className="placeholder__title">{title}</Text>
      <Text className="placeholder__description">{description}</Text>
      <Text className="placeholder__status">该模块已纳入 MVP 迭代计划</Text>
    </View>
  )
}
