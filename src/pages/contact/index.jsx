import React, {useState} from 'react';
import {useRouter} from 'next/router';
import MapIcon from '@mui/icons-material/Map';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const {Header, Sider, Content} = Layout;

const Contact = () => {
  const latitude = 33.973601;
  const longitude = 71.449249;
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div className='p-5 font-bold text-xl text-white'>E</div>
        ) : (
          <div className='p-5 font-bold text-xl text-white'>EDUCATION</div>
        )}
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['3']}>
          <Menu.Item
            key='1'
            icon={<UserOutlined />}
            onClick={() => router.push('/')}
          >
            Students Record
          </Menu.Item>
          <Menu.Item
            key='2'
            icon={<MoneyCollectOutlined />}
            onClick={() => router.push('/fee-structure')}
          >
            Fee Structure
          </Menu.Item>
          <Menu.Item key='3' icon={<MapIcon />}>
            Location
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{padding: 0, background: colorBgContainer}}>
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{fontSize: '16px', width: 64, height: 64}}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {/* Map Container */}
          <MapContainer
            center={[latitude, longitude]}
            zoom={13}
            style={{height: '400px'}}
          >
            <TileLayer
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='&copy; OpenStreetMap contributors'
            />
            <Marker position={[latitude, longitude]}>
              <Popup>Your Location</Popup>
            </Marker>
          </MapContainer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Contact;
