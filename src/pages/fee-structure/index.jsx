import React, {useState} from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PhoneOutlined,
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
  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div className='p-5 font-bold text-xl'>E</div>
        ) : (
          <div className='p-5 font-bold text-xl'>EDUCATION</div>
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
            icon={<PhoneOutlined />}
            onClick={() => router.push('/contact')}
          >
            Contact
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
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default FeeStructure;
