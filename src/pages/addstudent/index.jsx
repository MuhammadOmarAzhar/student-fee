import React, {useState} from 'react';
import {Divider} from 'antd';
import {UserAddOutlined} from '@ant-design/icons';
import {useMutation, useQueryClient} from 'react-query';
import {insertIntoCollection} from '@/firebase/functions';
import {firestore} from '@/firebase-config';
import {COLLECTION_NAMES} from '@/firebase/constants';
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

const Addstudent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [bloodgroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [religion, setReligion] = useState('');
  const [admissionFee, setAdmissionFee] = useState('');
  const [tuitionFee, setTuitionFee] = useState('');
  const [transportFee, setTransportFee] = useState('');
  const queryClient = useQueryClient();
  const router = useRouter();

  const createStudentMutation = useMutation(
    async (newStudent) => {
      await insertIntoCollection(
        firestore,
        COLLECTION_NAMES.students,
        newStudent
      );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('students');
        toast.success('Student added successfully!', {
          position: 'top-center',
          autoClose: 3000,
        });
      },
      onError: (error) => {
        console.log(error.message);
      },
    }
  );

  const handleSubmit = async () => {
    try {
      const newStudent = {
        firstName,
        lastName,
        fatherName,
        email,
        bloodgroup,
        gender,
        studentClass,
        phone,
        address,
        religion,
        admissionFee,
        tuitionFee,
        transportFee,
      };
      await createStudentMutation.mutateAsync(newStudent);
      router.push('/');
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className='bg-gray-200 h-max grid justify-center p-6'>
      <div className='flex justify-center'>
        <div className='bg-white p-6 rounded-lg h-fit w-fit'>
          <htmlForm className='w-full max-w-lg'>
            <div className='flex items-center  p-6'>
              <div className='text-black text-5xl'>
                <UserAddOutlined />
              </div>
              <div>
                <h1 className='text-black text-lg font-bold'>NEW STUDENT</h1>
              </div>
            </div>
            <Divider>Student Information</Divider>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-first-name'
                >
                  First Name
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                  id='grid-first-name'
                  type='text'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='Jane'
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-last-name'
                >
                  Last Name
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-last-name'
                  type='text'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Doe'
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-father-name'
                >
                  Father/Guardian Name
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-father-name'
                  type='text'
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  placeholder='Doe'
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-email'
                >
                  Email
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-email'
                  type='text'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='example@gmail.com'
                />
              </div>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full px-3 md:w-1/2'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-contact'
                >
                  Contact
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-contact'
                  type='text'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder='03xxxxxxxxx'
                />
                <p className='text-gray-600 text-xs italic'>
                  Contact number should be 11 digits
                </p>
              </div>
              <div className='w-full px-3 md:w-1/2'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-class'
                >
                  Class
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-class'
                  type='text'
                  value={studentClass}
                  onChange={(e) => setStudentClass(e.target.value)}
                  placeholder='4'
                />
              </div>
            </div>

            <div className='flex flex-wrap -mx-3 mb-2'>
              <div className='w-full md:w-1/3 px-3 mb-6'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-city'
                >
                  City
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-city'
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder='Islamabad'
                />
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-blood-group'
                >
                  Blood group
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-blood-group'
                  type='text'
                  value={bloodgroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  placeholder='B+'
                />
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-gender'
                >
                  Gender
                </label>
                <div className='relative'>
                  <select
                    className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                    id='grid-gender'
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>Select</option>
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Other'>Other</option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <svg
                      className='fill-current h-4 w-4'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                    >
                      <path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
                    </svg>
                  </div>
                </div>
              </div>
              <div className='w-full md:w-1/3 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-religion'
                >
                  Religion
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-religion'
                  type='text'
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  placeholder='Islam'
                />
              </div>
              <Divider orientation='left'>Fee Structure</Divider>
            </div>
            <div className='flex flex-wrap -mx-3 mb-6'>
              <div className='w-full md:w-1/2 px-3 mb-6 md:mb-0'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-admission-fee'
                >
                  Admission fee
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white'
                  id='grid-admission-fee'
                  type='text'
                  value={admissionFee}
                  onChange={(e) => setAdmissionFee(e.target.value)}
                  placeholder='3000'
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-tuition-fee'
                >
                  tuition fee
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-tuition-fee'
                  type='text'
                  value={tuitionFee}
                  onChange={(e) => setTuitionFee(e.target.value)}
                  placeholder='5000'
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <label
                  className='block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                  htmlFor='grid-transport-fee'
                >
                  Transport fee
                </label>
                <input
                  className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-transport-fee'
                  type='text'
                  value={transportFee}
                  onChange={(e) => setTransportFee(e.target.value)}
                  placeholder='1500'
                />
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
                <button
                  className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue'
                  type='submit'
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </htmlForm>
        </div>
      </div>
    </div>
  );
};

export default Addstudent;
