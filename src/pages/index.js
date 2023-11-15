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
    const feeStructure =
      Array.isArray(item.feeStructure) && item.feeStructure.length > 0
        ? item.feeStructure[0]
        : {};
    router.push({
      pathname: '/student-detail',
      query: {
        id: item.student.id,
        firstName: item.student.firstName,
        lastName: item.student.lastName,
        fatherName: item.student.fatherName,
        tuitionFee: feeStructure.tuitionFee || '',
        transportFee: feeStructure.transportFee || '',
        admissionFee: feeStructure.admissionFee || '',
        phone: item.student.phone,
        address: item.student.address,
        bloodgroup: item.student.bloodgroup,
        religion: item.student.religion,
        studentClass: item.student.studentClass,
        gender: item.student.gender,
        email: item.student.email,
      },
    });
    queryClient.invalidateQueries('student');
  };

  const fetchStudentsWithFeeStructure = async () => {
    try {
      const students = await fetchCollection(
        firestore,
        COLLECTION_NAMES.students
      );

      const studentsWithFeeStructure = {};

      await Promise.all(
        students.map(async (student) => {
          const feeStructure = await fetchCollectionWhere(
            firestore,
            COLLECTION_NAMES.feestructure,
            'student_Id',
            student.id
          );

          studentsWithFeeStructure[student.id] = {
            student,
            feeStructure,
          };
        })
      );
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
                  {Object.values(data).map((item, index) => (
                    <tr
                      key={item.student.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                    >
                      <th
                        scope='row'
                        onClick={() => handleStudentDetail(item)}
                        className='px-6 py-4 font-medium whitespace-nowrap cursor-pointer'
                      >
                        {item.student.firstName} {item.student.lastName}
                      </th>
                      <td className='px-6 py-4'>
                        {item.feeStructure[0]?.tuitionFee}
                      </td>
                      <td className='px-6 py-4'>
                        {item.feeStructure[0]?.transportFee}
                      </td>
                      <td className='px-6 py-4'>{item.student.phone}</td>
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
