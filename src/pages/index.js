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
import {fetchCollection, fetchCollectionWhere} from '@/firebase/functions';
import {useQuery, useQueryClient} from 'react-query';
import {firestore} from '@/firebase-config';
import {COLLECTION_NAMES} from '@/firebase/constants';
import {first} from 'lodash';
const {Header, Sider, Content} = Layout;
const App = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const handleAddStudentClick = () => {
    router.push('/addstudent');
    queryClient.invalidateQueries('id');
  };

  const handleStudentDetail = (item) => {
    let data = {
      id: item.id,
      firstName: item.first_name,
      lastName: item.last_name,
      fatherName: item.father_name,
      phone: item.phone,
      address: item.address,
      bloodgroup: item.blood_group,
      religion: item.religion,
      studentClass: item.student_class,
      gender: item.gender,
      email: item.email,
    };
    router.push({
      pathname: '/student-detail',
      query: data,
    });
    queryClient.invalidateQueries('student');
  };

  const handleEditStudent = (item) => {
    let data = {
      id: item.id,
      firstName: item.first_name,
      lastName: item.last_name,
      fatherName: item.father_name,
      phone: item.phone,
      address: item.address,
      bloodgroup: item.blood_group,
      religion: item.religion,
      studentClass: item.student_class,
      gender: item.gender,
      email: item.email,
    };

    router.push({
      pathname: '/edit-student',
      query: {data: JSON.stringify(data)},
    });
  };

  const fetchStudentsWithFeeStructure = async () => {
    try {
      const students = await fetchCollection(
        firestore,
        COLLECTION_NAMES.students
      );
      let studentsWithFeeStructure = [];
      for (const student of students) {
        const feeStructure = await fetchCollectionWhere(
          firestore,
          COLLECTION_NAMES.feestructure,
          'student_id',
          student.id
        );

        studentsWithFeeStructure = [
          ...studentsWithFeeStructure,
          {...student, feeStructure: first(feeStructure)},
        ];
      }

      return studentsWithFeeStructure;
    } catch (error) {
      console.error('Error fetching students with fee structure:', error);
      throw error;
    }
  };

  const {data, isLoading, isError} = useQuery(
    'student',
    fetchStudentsWithFeeStructure
  );

  if (isLoading) {
    return (
      <div className='h-screen bg-white flex justify-center items-center text-black text-xl font-bold'>
        Loading...
      </div>
    );
  }

  if (isError) {
    return <div>Error fetching data</div>;
  }

  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        {collapsed ? (
          <div className='p-5 font-bold text-xl justify-center text-white flex'>
            E
          </div>
        ) : (
          <div className='p-5 font-bold text-xl text-white'>EDUCATION</div>
        )}
        <Menu theme='dark' mode='inline' defaultSelectedKeys={['1']}>
          <Menu.Item key='1' icon={<UserOutlined />}>
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
              onClick={handleAddStudentClick}
              className='bg-blue-500 hover:bg-blue-600 active:bg-blue-400 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 focus:ring-offset-2 focus:ring-offset-white'
            >
              Add Student
            </button>
          </div>
          <div className='text-black mt-6'>
            <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
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
                  {data?.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <th
                        scope='row'
                        onClick={() => handleStudentDetail(item)}
                        className='px-6 py-4 font-medium whitespace-nowrap cursor-pointer text-blue-600 hover:underline'
                      >
                        {item.first_name} {item.last_name}
                      </th>
                      <td className='px-6 py-4'>
                        {item.feeStructure?.tuition_fee}
                      </td>
                      <td className='px-6 py-4'>
                        {item.feeStructure?.transport_fee}
                      </td>
                      <td className='px-6 py-4'>{item.phone}</td>
                      <td className='px-6 py-4'>
                        <button
                          onClick={() => handleEditStudent(item)}
                          className='font-medium text-blue-600 hover:underline focus:outline-none'
                        >
                          Edit
                        </button>
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
