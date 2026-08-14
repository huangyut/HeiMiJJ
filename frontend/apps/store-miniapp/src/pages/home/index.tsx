import { Text, View } from '@tarojs/components'
import './index.scss'

const metrics = [
  { label: '待接单', value: 0 },
  { label: '备货中', value: 0 },
  { label: '待核销', value: 0 },
]

export default function HomePage() {
  return (
    <View className="page">
      <View className="store-card">
        <Text className="store-name">黑米姐姐联营门店</Text>
        <Text className="store-status">今日营业中</Text>
      </View>
      <View className="metrics">
        {metrics.map((metric) => (
          <View className="metric" key={metric.label}>
            <Text className="metric-value">{metric.value}</Text>
            <Text>{metric.label}</Text>
          </View>
        ))}
      </View>
      <View className="card">门店订单、库存和经营数据将在后端接口完成后接入。</View>
    </View>
  )
}
