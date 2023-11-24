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
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();
  const position = [33.974539, 71.449729];
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
            height: '100%',
          }}
        >
          {/* Map Container */}
          <MapContainer
            style={{height: '100%'}}
            center={position}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </MapContainer>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Contact;
