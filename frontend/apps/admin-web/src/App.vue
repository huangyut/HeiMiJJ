<template>
  <el-container class="app-shell">
    <el-aside class="sidebar" width="232px">
      <div class="brand">
        <div class="brand__mark">黑</div>
        <div>
          <strong>黑米姐姐</strong>
          <span>平台管理后台</span>
        </div>
      </div>

      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        background-color="transparent"
        text-color="#cad2d9"
        @select="activeMenu = $event"
      >
        <el-menu-item v-for="item in menuItems" :key="item.key" :index="item.key">
          <span class="menu-icon">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </el-menu>

      <div class="sidebar__footer">社区联营 · 品质零售</div>
    </el-aside>

    <el-container>
      <el-header class="topbar">
        <div>
          <span class="topbar__eyebrow">HEIMI OPERATION CENTER</span>
          <h1>经营概览</h1>
        </div>
        <div class="admin-user">
          <span class="admin-user__avatar">管</span>
          <span>管理员</span>
        </div>
      </el-header>

      <el-main class="main-content">
        <section class="welcome-card">
          <div>
            <span class="welcome-card__date">今日经营数据</span>
            <h2>让社区好食材，离每个家庭更近</h2>
            <p>订单、门店和商品数据将在 Java 后端接口接入后实时展示。</p>
          </div>
          <div class="welcome-card__badge">15 分钟可取</div>
        </section>

        <section class="metric-grid">
          <article v-for="metric in metrics" :key="metric.label" class="metric-card">
            <div class="metric-card__heading">
              <span>{{ metric.label }}</span>
              <span class="metric-card__tag">{{ metric.tag }}</span>
            </div>
            <strong>{{ metric.value }}</strong>
            <p>{{ metric.description }}</p>
          </article>
        </section>

        <section class="data-panel">
          <div class="data-panel__heading">
            <div>
              <h3>最新订单</h3>
              <p>跟踪消费者下单、门店备货和到店核销进度</p>
            </div>
            <el-button type="primary" plain>查看全部订单</el-button>
          </div>

          <el-table :data="recentOrders" empty-text="后端接口接入后显示订单数据">
            <el-table-column prop="orderNo" label="订单号" min-width="180" />
            <el-table-column prop="store" label="门店" min-width="180" />
            <el-table-column prop="amount" label="金额" width="120" />
            <el-table-column prop="status" label="状态" width="140" />
          </el-table>
        </section>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'

const activeMenu = ref('dashboard')
const recentOrders = ref([])

const menuItems = [
  { key: 'dashboard', icon: '览', label: '经营概览' },
  { key: 'stores', icon: '店', label: '门店管理' },
  { key: 'products', icon: '品', label: '商品管理' },
  { key: 'orders', icon: '单', label: '订单管理' },
  { key: 'users', icon: '客', label: '用户管理' },
]

const metrics = [
  { label: '今日订单', value: 0, tag: '今日', description: '消费者提交的有效订单' },
  { label: '待取货', value: 0, tag: '实时', description: '已备货等待核销的订单' },
  { label: '营业门店', value: 0, tag: '全部', description: '当前正常营业的联营门店' },
]
</script>
