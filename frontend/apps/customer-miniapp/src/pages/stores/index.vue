<template>
  <view class="stores-page">
    <view class="stores-hero">
      <view class="stores-hero__heading">
        <view>
          <text class="stores-hero__eyebrow">一刻钟生活圈</text>
          <text class="stores-hero__title">好食材，就在家附近</text>
        </view>
        <view class="stores-hero__badge">
          <text class="stores-hero__badge-number">15</text>
          <text class="stores-hero__badge-unit">分钟可取</text>
        </view>
      </view>

      <view class="location-card">
        <view class="location-card__pin"><view class="location-card__pin-core" /></view>
        <view class="location-card__content">
          <text class="location-card__label">当前定位</text>
          <text class="location-card__address">{{ currentLocation }}</text>
        </view>
        <button class="location-card__refresh" :disabled="locating" @click="locateStores">
          {{ locating ? '定位中' : '重新定位' }}
        </button>
      </view>
    </view>

    <view class="stores-toolbar">
      <view>
        <text class="stores-toolbar__title">附近门店</text>
        <text class="stores-toolbar__count">共 {{ sortedStores.length }} 家可选</text>
      </view>
      <view class="stores-toolbar__mode">
        <view class="stores-toolbar__mode-dot" />
        <text>列表模式</text>
      </view>
    </view>

    <view class="store-list">
      <view
        v-for="(store, index) in sortedStores"
        :key="store.id"
        class="store-card"
        :class="{
          'store-card--recommended': index === 0 && store.isOpen,
          'store-card--selected': selectedStoreId === store.id,
        }"
      >
        <view v-if="index === 0 && store.isOpen" class="store-card__recommend">离你最近</view>

        <view class="store-card__header">
          <view class="store-card__identity">
            <view
              class="store-card__status-dot"
              :class="
                store.isOpen ? 'store-card__status-dot--open' : 'store-card__status-dot--closed'
              "
            />
            <view class="store-card__heading">
              <text class="store-card__name">{{ store.name }}</text>
              <view class="store-card__tags">
                <text v-for="tag in store.tags" :key="tag" class="store-card__tag">{{ tag }}</text>
              </view>
            </view>
          </view>
          <view class="store-card__distance">
            <text class="store-card__distance-value">{{ formatDistance(store.distance) }}</text>
            <text class="store-card__distance-label">距你</text>
          </view>
        </view>

        <view class="store-card__pickup">
          <view class="store-card__pickup-icon">取</view>
          <text class="store-card__pickup-text">
            {{
              store.isOpen ? `现在下单，预计 ${store.pickupMinutes} 分钟可取` : '今日暂不提供自提'
            }}
          </text>
          <text
            class="store-card__business-status"
            :class="store.isOpen ? 'store-card__business-status--open' : ''"
          >
            {{ store.isOpen ? '营业中' : '今日歇业' }}
          </text>
        </view>

        <view class="store-card__details">
          <view class="store-card__detail-row">
            <text class="store-card__detail-label">门店地址</text>
            <text class="store-card__detail-value">{{ store.address }}</text>
          </view>
          <view class="store-card__detail-row">
            <text class="store-card__detail-label">营业时间</text>
            <text class="store-card__detail-value">{{ store.businessHours }}</text>
          </view>
          <view class="store-card__detail-row">
            <text class="store-card__detail-label">联系电话</text>
            <text
              class="store-card__detail-value store-card__detail-value--phone"
              @click="callStore(store)"
            >
              {{ store.phone }}
            </text>
          </view>
        </view>

        <view class="store-card__actions">
          <button
            class="store-card__button store-card__button--ghost"
            @click="navigateToStore(store)"
          >
            <text class="store-card__button-icon">↗</text>导航
          </button>
          <button
            class="store-card__button store-card__button--primary"
            :class="{ 'store-card__button--selected': selectedStoreId === store.id }"
            :disabled="!store.isOpen"
            @click="selectStore(store)"
          >
            {{
              selectedStoreId === store.id
                ? '已选为自提门店'
                : store.isOpen
                  ? '选择此门店'
                  : '暂不可选'
            }}
          </button>
        </view>
      </view>
    </view>

    <view class="stores-note">
      <view class="stores-note__icon">i</view>
      <text class="stores-note__text"
        >门店按距离排序；导航当前调用微信地图，已预留后续百度地图跳转能力。</text
      >
    </view>
  </view>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'

const DEFAULT_LOCATION = '武汉市 · 点击重新定位查找身边门店'

const stores = ref([
  {
    id: 1,
    name: '黑米姐姐 · 湖岸社区店',
    address: '武汉市洪山区珞瑜路湖岸社区邻里中心 1 楼',
    businessHours: '08:00-22:00',
    phone: '027-8888 8001',
    latitude: 30.5055,
    longitude: 114.3617,
    distance: 1.2,
    pickupMinutes: 15,
    isOpen: true,
    tags: ['冷链自提', '社区联营'],
  },
  {
    id: 2,
    name: '黑米姐姐 · 光谷天地店',
    address: '武汉市洪山区关山大道光谷天地商业街',
    businessHours: '08:30-21:30',
    phone: '027-8888 8002',
    latitude: 30.5033,
    longitude: 114.415,
    distance: 2.5,
    pickupMinutes: 18,
    isOpen: true,
    tags: ['门店热销', '停车方便'],
  },
  {
    id: 3,
    name: '黑米姐姐 · 南湖邻里店',
    address: '武汉市武昌区南湖街道中央花园社区',
    businessHours: '09:00-21:00',
    phone: '027-8888 8003',
    latitude: 30.4937,
    longitude: 114.3269,
    distance: 5.8,
    pickupMinutes: 20,
    isOpen: false,
    tags: ['社区联营'],
  },
  {
    id: 4,
    name: '黑米姐姐 · 楚河汉街店',
    address: '武汉市武昌区楚河汉街第三街区',
    businessHours: '09:00-22:00',
    phone: '027-8888 8004',
    latitude: 30.5606,
    longitude: 114.3424,
    distance: 8.2,
    pickupMinutes: 25,
    isOpen: true,
    tags: ['品类齐全', '冷链自提'],
  },
])

const currentLocation = ref(DEFAULT_LOCATION)
const locating = ref(false)
const selectedStoreId = ref(null)

const sortedStores = computed(() => [...stores.value].sort((a, b) => a.distance - b.distance))

function toRadians(value) {
  return (value * Math.PI) / 180
}

function calculateDistance(latitude1, longitude1, latitude2, longitude2) {
  const earthRadius = 6371
  const latitudeDelta = toRadians(latitude2 - latitude1)
  const longitudeDelta = toRadians(longitude2 - longitude1)
  const startLatitude = toRadians(latitude1)
  const endLatitude = toRadians(latitude2)
  const value =
    Math.sin(latitudeDelta / 2) ** 2 +
    Math.cos(startLatitude) * Math.cos(endLatitude) * Math.sin(longitudeDelta / 2) ** 2

  return earthRadius * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value))
}

function formatDistance(distance) {
  if (distance < 1) return `${Math.max(1, Math.round(distance * 1000))}m`
  return `${distance.toFixed(1)}km`
}

async function locateStores() {
  if (locating.value) return

  locating.value = true
  currentLocation.value = '正在获取当前位置…'

  try {
    const location = await uni.getLocation({ type: 'gcj02' })
    stores.value = stores.value.map((store) => ({
      ...store,
      distance: calculateDistance(
        location.latitude,
        location.longitude,
        store.latitude,
        store.longitude,
      ),
    }))
    currentLocation.value = '已定位 · 门店距离已为你更新'
    uni.showToast({ title: '定位成功', icon: 'success' })
  } catch {
    currentLocation.value = '定位未开启 · 当前展示武汉区域门店'
    uni.showToast({ title: '请授权定位后重试', icon: 'none' })
  } finally {
    locating.value = false
  }
}

function callStore(store) {
  uni.makePhoneCall({ phoneNumber: store.phone.replace(/\s/g, '') })
}

function navigateToStore(store) {
  // 当前使用微信位置能力；后续接入百度地图时，可在这里改为跳转承载百度地图 URI 的 web-view。
  uni.openLocation({
    latitude: store.latitude,
    longitude: store.longitude,
    name: store.name,
    address: store.address,
    scale: 16,
  })
}

function selectStore(store) {
  if (!store.isOpen) return

  uni.showModal({
    title: '确认自提门店',
    content: `${store.name}\n预计 ${store.pickupMinutes} 分钟可取`,
    confirmText: '确认选择',
    confirmColor: '#6c3d20',
    success: ({ confirm }) => {
      if (!confirm) return
      selectedStoreId.value = store.id
      uni.setStorageSync('heimijj-selected-store', store)
      uni.showToast({ title: '门店已切换', icon: 'success' })
    },
  })
}

onMounted(() => {
  const selectedStore = uni.getStorageSync('heimijj-selected-store')
  selectedStoreId.value = selectedStore?.id ?? null
  locateStores()
})
</script>

<style lang="scss" src="./index.scss"></style>
