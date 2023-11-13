import {UserOutlined} from '@ant-design/icons';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {Divider} from 'antd';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import Modal from 'react-modal';
import {Tooltip} from '@mui/material';

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
    <div className='bg-gray-200 h-full grid justify-center p-6'>
      <div className='flex justify-center'>
        <div className='bg-white p-6 rounded-lg h-fit w-fit'>
          <form className='w-full max-w-lg'>
            <div className='flex justify-end'>
              <button
                className='bg-teal-400 hover:bg-teal-700 text-white w-fit m-2 py-1.5 px-2 rounded focus:outline-none focus:shadow-outline-green'
                type='button'
              >
                <Tooltip title='Fee Record'>
                  <DescriptionIcon />
                </Tooltip>
              </button>
            </div>
            <div className='flex justify-center p-6'>
              <div className='text-black text-5xl'>
                <UserOutlined style={{color: '#9CA3AF', marginRight: 5}} />
              </div>
              <div className=' grid items-end'>
                <h1 className='text-gray-400 text-md font-semibold uppercase'>
                  {studentData.firstName} {studentData.lastName}
                </h1>
              </div>
            </div>
            <Divider style={{color: 'lightgray'}}>Personal Information</Divider>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold '>
                  First Name
                </label>
                <p className='text-gray-400 text-sm'>{studentData.firstName}</p>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Last Name
                </label>
                <p className='text-gray-400 text-sm'>{studentData.lastName}</p>
              </div>
              <div className='w-full mt-6 md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Father/Guardian Name
                </label>
                <p className='text-gray-400 text-sm'>
                  {studentData.fatherName}
                </p>
              </div>
              <div className='w-full mt-6 md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Email
                </label>
                <p className='text-gray-400 text-sm'>{studentData.email}</p>
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3 md:w-1/2'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Contact
                </label>
                <p className='text-gray-400 text-sm'>{studentData.phone}</p>
              </div>
              <div className='w-full px-3 md:w-1/2'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Class
                </label>
                <p className='text-gray-400 text-sm'>
                  {studentData.studentClass}
                </p>
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Religion
                </label>
                <p className='text-gray-400 text-sm'>{studentData.religion}</p>
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Blood group
                </label>
                <p className='text-gray-400 text-sm'>
                  {studentData.bloodgroup}
                </p>
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Gender
                </label>
                <p className='text-gray-400 text-sm'>{studentData.gender}</p>
              </div>
              <div className='w-full md:w-1/3 px-3 mt-6'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  City
                </label>
                <p className='text-gray-400 text-sm'>{studentData.address}</p>
              </div>
              <Divider style={{color: 'lightgray'}}>Fee Structure</Divider>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Admission fee
                </label>
                <p className='text-gray-400 text-sm'>
                  {studentData.admissionFee}
                </p>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Tuition fee
                </label>
                <p className='text-gray-400 text-sm'>
                  {studentData.tuitionFee}
                </p>
              </div>
              <div className='w-full mt-6 md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Transport fee
                </label>
                <p className='text-gray-400 text-sm'>
                  {studentData.transportFee}
                </p>
              </div>
              <Divider />
              <div className='w-full flex justify-between items-center mt-6 mx-2'>
                <button
                  className='bg-gray-500 hover:bg-gray-700 text-white  py-1.5 px-2 rounded focus:outline-none focus:shadow-outline-gray'
                  type='button'
                  onClick={handleBack}
                >
                  <KeyboardBackspaceIcon />
                </button>
                <div className='flex'>
                  <button
                    className='flex items-center bg-blue-500 hover:bg-blue-700 text-white m-2  py-1.5 px-2 rounded focus:outline-none focus:shadow-outline-blue'
                    type='button'
                    onClick={handleOpenModal}
                  >
                    <AddIcon style={{marginRight: 5, fontSize: 22}} />
                    <p className='text-sm'>New Fee Structure</p>
                  </button>
                  <button
                    className='bg-green-500 hover:bg-green-700 text-white w-fit m-2 py-1.5 px-2 rounded focus:outline-none focus:shadow-outline-green'
                    type='button'
                    onClick={handleOpenModal}
                  >
                    <Tooltip title='Fee Collection'>
                      <ReceiptIcon />
                    </Tooltip>
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
