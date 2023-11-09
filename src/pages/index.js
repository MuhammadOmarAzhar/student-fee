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
const App = () => {
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
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item
            key='1'
            icon={<UserOutlined />}
            // onClick={() => router.push('/students')}
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
          <div className='flex justify-between'>
            <div className='text-black text-lg font-bold'> STUDENTS </div>
            <button
              onClick={() => {}}
              className='bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-white'
            >
              Add Student
            </button>
          </div>
          <div className='text-black mt-6'>
            <div class='relative overflow-x-auto shadow-md sm:rounded-lg'>
              <table className='w-full text-sm text-left'>
                <thead className='text-xs uppercase bg-gray-50'>
                  <tr>
                    <th scope='col' className='px-6 py-3'>
                      Full name
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Tution fee
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Transport fee
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Contact
                    </th>
                    <th scope='col' className='px-6 py-3'>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <th
                        scope='row'
                        className='px-6 py-4 font-medium whitespace-nowrap'
                      >
                        {item.fullName}
                      </th>
                      <td className='px-6 py-4'>{item.tuitionFee}</td>
                      <td className='px-6 py-4'>{item.transportFee}</td>
                      <td className='px-6 py-4'>{item.contact}</td>
                      <td className='px-6 py-4'>
                        <a
                          href='#'
                          className='font-medium text-blue-600 hover:underline'
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;
