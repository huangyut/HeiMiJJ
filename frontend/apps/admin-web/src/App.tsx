import {
  AppstoreOutlined,
  DashboardOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  TeamOutlined,
} from '@ant-design/icons'
import { Card, Col, Layout, Menu, Row, Space, Statistic, Table, Tag, Typography } from 'antd'

const { Header, Content, Sider } = Layout

const menuItems = [
  { key: 'dashboard', icon: <DashboardOutlined />, label: '经营概览' },
  { key: 'stores', icon: <ShopOutlined />, label: '门店管理' },
  { key: 'products', icon: <AppstoreOutlined />, label: '商品管理' },
  { key: 'orders', icon: <ShoppingCartOutlined />, label: '订单管理' },
  { key: 'users', icon: <TeamOutlined />, label: '用户管理' },
]

const columns = [
  { title: '订单号', dataIndex: 'orderNo' },
  { title: '门店', dataIndex: 'store' },
  { title: '金额', dataIndex: 'amount' },
  { title: '状态', dataIndex: 'status', render: (status: string) => <Tag>{status}</Tag> },
]

export default function App() {
  return (
    <Layout className="app-layout">
      <Sider width={220} theme="dark">
        <div className="brand">黑米姐姐</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']} items={menuItems} />
      </Sider>
      <Layout>
        <Header className="header">
          <Typography.Title level={4}>平台管理后台</Typography.Title>
          <Space>管理员</Space>
        </Header>
        <Content className="content">
          <Typography.Title level={3}>经营概览</Typography.Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={8}>
              <Card>
                <Statistic title="今日订单" value={0} />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic title="待取货" value={0} />
              </Card>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic title="营业门店" value={0} />
              </Card>
            </Col>
          </Row>
          <Card title="最新订单" className="orders-card">
            <Table
              columns={columns}
              dataSource={[]}
              locale={{ emptyText: '后端接口接入后显示订单数据' }}
            />
          </Card>
        </Content>
      </Layout>
    </Layout>
  )
}
