import React, {useEffect, useState} from 'react';
import MapIcon from '@mui/icons-material/Map';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  MoneyCollectOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme} from 'antd';
import {useRouter} from 'next/router';

const {Header, Sider, Content} = Layout;
const FeeStructure = () => {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const [text, setText] = useState('');

  useEffect(() => {
    const originalText = 'Muhammad Omar Azhar';
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      setText(originalText.substring(0, currentIndex));
      currentIndex++;

      if (currentIndex > originalText.length) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div className='p-5 font-bold text-xl text-white'>E</div>
        ) : (
          <div className='p-5 font-bold text-xl text-white'>EDUCATION</div>
        )}
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['2']}>
          <Menu.Item
            key='1'
            icon={<UserOutlined />}
            onClick={() => router.push('/')}
          >
            Students Record
          </Menu.Item>
          <Menu.Item key='2' icon={<MoneyCollectOutlined />}>
            Fee Structure
          </Menu.Item>
          <Menu.Item
            key='3'
            icon={<MapIcon />}
            onClick={() => router.push('/contact')}
          >
            Location
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type='text'
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          // Apply the Tailwind CSS animation class
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <div>
            <p className='text-2xl'>{text}</p>
            <p className='animate-bounce text-2xl'>Hello its me</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default FeeStructure;
