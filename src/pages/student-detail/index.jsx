import {UserOutlined} from '@ant-design/icons';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import ReceiptIcon from '@mui/icons-material/Receipt';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';
import {Divider} from 'antd';
import {useRouter} from 'next/router';
import React, {useState} from 'react';
import Modal from 'react-modal';
import {Tooltip} from '@mui/material';
import {toast} from 'react-toastify';
import {fetchCollectionWhere, updateCollection} from '@/firebase/functions';
import {firestore} from '@/firebase-config';
import {COLLECTION_NAMES} from '@/firebase/constants';
import {useMutation, useQuery, useQueryClient} from 'react-query';
import {first} from 'lodash';
import moment from 'moment';

const studentDetail = () => {
  const queryClient = useQueryClient();
  const [newFee, setNewFee] = useState({
    tuition_fee: '',
    transport_fee: '',
  });
  const [textValue, setTextValue] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const {
    id,
    firstName,
    lastName,
    fatherName,
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

  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setNewFee({...newFee, [name]: value, updatedAt: moment().unix()});
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleFeeRecordButton = () => {
    router.push({
      pathname: '/fee-record',
      query: {id: JSON.stringify(studentData.id)},
    });
  };

  const handleFeeCollectionButton = () => {
    router.push({
      pathname: '/fee-collection',
      query: {fee: JSON.stringify(data)},
    });
  };

  const handleInputChange = (e) => {
    setTextValue(e.target.value);
  };

  const ModalSubmitButton = () => {
    mutation.mutate();
  };

  const mutation = useMutation(
    async () => {
      await updateCollection(
        firestore,
        COLLECTION_NAMES.feestructure,
        data.id,
        newFee
      );

      await queryClient.invalidateQueries('feestructure');
      handleCloseModal();

      toast.success('User info edited successfully!', {
        position: 'top-center',
        autoClose: 3000,
      });
    },
    {
      onSuccess: () => {},
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  const feeStructure = async () => {
    try {
      let response = await fetchCollectionWhere(
        firestore,
        COLLECTION_NAMES.feestructure,
        'student_id',
        studentData.id
      );
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  const {data, isLoading} = useQuery('feestructure', feeStructure, {
    select: (data) => {
      return data && data.length > 0 ? first(data) : null;
    },
  });

  if (isLoading || mutation.isLoading || !data) {
    return (
      <div className='h-screen bg-white flex justify-center items-center text-black text-xl font-bold'>
        Loading...
      </div>
    );
  }

  return (
    <div className='bg-gray-200 grid justify-center p-6'>
      <div className='flex justify-center'>
        <div className='bg-white p-6 rounded-lg h-fit w-fit'>
          <form className='w-full max-w-lg'>
            <div className='flex justify-end'>
              <button
                className='bg-teal-500 hover:bg-teal-700 text-white w-fit m-2 py-1.5 px-2 rounded focus:outline-none focus:shadow-outline-green'
                type='button'
                onClick={handleFeeRecordButton}
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
                <p className='text-gray-400 text-sm'>{data?.admission_fee}</p>
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Tuition fee
                </label>
                <p className='text-gray-400 text-sm'>{data?.tuition_fee}</p>
              </div>
              <div className='w-full mt-6 md:w-1/2 px-3'>
                <label className='block uppercase tracking-wide text-gray-800 text-sm font-bold'>
                  Transport fee
                </label>
                <p className='text-gray-400 text-sm'>{data?.transport_fee}</p>
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
                    className='bg-green-600 hover:bg-green-700 text-white w-fit m-2 py-1.5 px-2 rounded focus:outline-none focus:shadow-outline-green'
                    type='button'
                    onClick={handleFeeCollectionButton}
                  >
                    <Tooltip title='Fee Collection'>
                      <ReceiptIcon />
                    </Tooltip>
                  </button>
                </div>
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={handleCloseModal}
                  contentLabel='New Fee Structure Modal'
                  className='grid grid-cols-1 justify-center items-center bg-white'
                  style={{
                    overlay: {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      display: 'grid',
                      placeItems: 'center',
                    },
                    content: {
                      height: 'auto',
                      margin: 'auto',
                      top: '50%',
                      borderRadius: '8px',
                    },
                  }}
                >
                  <>
                    <div className='flex justify-between items-center'>
                      <h2 className='text-black ml-6  font-semibold uppercase '>
                        New Fee Structure
                      </h2>
                      <button
                        className='text-black p-4'
                        onClick={handleCloseModal}
                      >
                        <CloseIcon />
                      </button>
                    </div>

                    <div className='px-6 py-3 justify-between flex '>
                      <div className='flex items-center '>
                        <p className='uppercase text-green-800 text-xs font-semibold'>
                          Admission fee:
                        </p>
                        <p className='text-green-700 text-xs ml-1'>
                          {data?.admission_fee}
                        </p>
                      </div>
                      <div className='flex items-center '>
                        <p className='uppercase text-green-800 text-xs font-semibold'>
                          Tuition fee:
                        </p>
                        <p className='text-green-700 text-xs ml-1'>
                          {data?.tuition_fee}
                        </p>
                      </div>
                      <div className='flex items-center '>
                        <p className='uppercase tracking-wide text-green-800 text-xs font-semibold'>
                          Transport fee:
                        </p>
                        <p className='text-green-700 text-xs ml-1'>
                          {data?.transport_fee}
                        </p>
                      </div>
                    </div>

                    <div className='p-6 grid md:flex flex-wrap gap-4'>
                      <div>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-tuition-fee'
                        >
                          new tuition fee
                        </label>
                        <input
                          className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                          id='grid-tuition-fee'
                          type='tuitionFee'
                          name='tuitionFee'
                          value={newFee.tuition_fee}
                          onChange={handleOnChange}
                        />
                      </div>
                      <div>
                        <label
                          className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                          htmlFor='grid-transport-fee'
                        >
                          new Transport fee
                        </label>
                        <input
                          className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                          id='grid-transport-fee'
                          type='transportFee'
                          name='transportFee'
                          value={newFee.transport_fee}
                          onChange={handleOnChange}
                        />
                      </div>
                    </div>

                    <div className='px-6'>
                      <label
                        className='flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                        htmlFor='grid-transport-fee'
                      >
                        Note{' '}
                        <p className='text-gray-400 text-[10px] ml-1'>
                          {'(optional)'}
                        </p>
                      </label>
                      <textarea
                        className='border rounded w-full p-2 text-black'
                        rows='3'
                        value={textValue}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className='flex justify-end items-end mx-6 mt-3 mb-6'>
                      <button
                        className='bg-blue-500 hover:bg-blue-700 text-white  py-1.5 px-4 rounded focus:outline-none focus:shadow-outline-blue'
                        type='submit'
                        onClick={ModalSubmitButton}
                      >
                        Submit
                      </button>
                    </div>
                  </>
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
