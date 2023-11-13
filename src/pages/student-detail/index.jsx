import {UserOutlined} from '@ant-design/icons';
import {Divider} from 'antd';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import Modal from 'react-modal';

const studentDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const {
    id,
    firstName,
    lastName,
    fatherName,
    tuitionFee,
    transportFee,
    admissionFee,
    phone,
    email,
    address,
    bloodgroup,
    religion,
    gender,
    studentClass,
  } = router.query;

  const studentData = {
    id,
    firstName,
    lastName,
    fatherName,
    tuitionFee,
    transportFee,
    admissionFee,
    phone,
    address,
    bloodgroup,
    religion,
    studentClass,
    gender,
    email,
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleBack = () => {
    router.push('/');
  };
  return (
    <div className='bg-gray-200 h-screen grid justify-center p-6'>
      <div className='flex justify-center'>
        <div className='bg-white p-6 rounded-lg h-fit w-fit'>
          <form className='w-full max-w-lg'>
            <div className='flex items-center p-6'>
              <div className='text-black text-5xl'>
                <UserOutlined />
              </div>
              <div>
                <h1 className='text-black text-lg font-bold uppercase'>
                  {studentData.firstName} {studentData.lastName}
                </h1>
              </div>
            </div>
            <Divider>Personal Information</Divider>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  First Name
                </label>
                <p className='text-gray-700'>{studentData.firstName}</p>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Last Name
                </label>
                <p className='text-gray-700'>{studentData.lastName}</p>
              </div>
              <div className='w-full mt-6 md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Father/Guardian Name
                </label>
                <p className='text-gray-700'>{studentData.fatherName}</p>
              </div>
              <div className='w-full mt-6 md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Email
                </label>
                <p className='text-gray-700'>{studentData.email}</p>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3 md:w-1/2'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Contact
                </label>
                <p className='text-gray-700'>{studentData.phone}</p>
              </div>
              <div className='w-full px-3 md:w-1/2'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Class
                </label>
                <p className='text-gray-700'>{studentData.studentClass}</p>
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/3 px-3 mb-6'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  City
                </label>
                <p className='text-gray-700'>{studentData.address}</p>
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Blood group
                </label>
                <p className='text-gray-700'>{studentData.bloodgroup}</p>
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Gender
                </label>
                <p className='text-gray-700'>{studentData.gender}</p>
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Religion
                </label>
                <p className='text-gray-700'>{studentData.religion}</p>
              </div>
              <Divider>Fee Structure</Divider>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Admission fee
                </label>
                <p className='text-gray-700'>{studentData.admissionFee}</p>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Tuition fee
                </label>
                <p className='text-gray-700'>{studentData.tuitionFee}</p>
              </div>
              <div className='w-full mt-6 md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'>
                  Transport fee
                </label>
                <p className='text-gray-700'>{studentData.transportFee}</p>
              </div>
              <Divider />
              <div className='w-full flex justify-between items-center mt-6 mx-2'>
                <button
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-gray'
                  type='button'
                  onClick={handleBack}
                >
                  Back
                </button>
                <div>
                  <button
                    className='bg-green-500 hover:bg-green-700 text-white font-bold m-2 py-2 px-4 rounded focus:outline-none focus:shadow-outline-green'
                    type='button'
                    onClick={handleOpenModal}
                  >
                    Fee Collection
                  </button>
                  <button
                    className='bg-blue-500 hover:bg-blue-700 text-white m-2 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue'
                    type='button'
                    onClick={handleOpenModal}
                  >
                    Fee Structure
                  </button>
                </div>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={handleCloseModal}
                  contentLabel='Example Modal'
                >
                  <h2 className='text-black'>Modal Content</h2>
                  <p className='text-black'>Any other content can go here...</p>
                  <button className='text-black' onClick={handleCloseModal}>
                    Close Modal
                  </button>
                </Modal>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default studentDetail;
