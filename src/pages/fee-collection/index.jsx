import {firestore} from '@/firebase-config';
import {COLLECTION_NAMES} from '@/firebase/constants';
import {fetchCollectionWhere} from '@/firebase/functions';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import {first, isNil, isNull} from 'lodash';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {useQuery, useQueryClient} from 'react-query';

const FeeCollection = () => {
  const router = useRouter();
  const {fee} = router.query;
  const [feeRecord, setFeeRecord] = useState(null);
  const [feeRecordList, setFeeRecordList] = useState([]);

  const handleBack = () => {
    router.back();
  };

  const getMonthsNamesBetweenTimestamps = (startTimestamp, endTimestamp) => {
    let currentMoment = moment(startTimestamp * 1000); // Assuming timestamps are in seconds
    const endMoment = moment(endTimestamp * 1000);

    const monthsNames = [];

    while (
      currentMoment.isBefore(endMoment) ||
      currentMoment.isSame(endMoment, 'month')
    ) {
      monthsNames.push(currentMoment.format('MMMM'));
      currentMoment.add(1, 'month');
    }

    return monthsNames;
  };

  const unPaidMonths = (feeStructure) => {
    try {
      debugger;
      // timestamp of last updatedAt fee of student
      let lastFeeTimeStamp = feeStructure.updatedAt;
      // get current timestamp

      let currentTimeStamp = moment().unix();

      const monthsNames = getMonthsNamesBetweenTimestamps(
        lastFeeTimeStamp,
        currentTimeStamp
      );
      let feeCollection = [];
      for (let index = 0; index < monthsNames.length; index++) {
        feeCollection.push({
          id: index + 1,
          month: monthsNames[index],
          tuition_fee: feeStructure.tuition_fee,
          transport_fee: feeStructure.transport_fee,
          status: 'Unpaid',
        });
      }

      setFeeRecordList(feeCollection);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    let feeObject = JSON.parse(fee);
    setFeeRecord(feeObject);
    unPaidMonths(feeObject);
  }, []);

  if (isNull(feeRecord)) {
    return (
      <div className='h-screen bg-white flex justify-center items-center text-black text-xl font-bold'>
        Loading...
      </div>
    );
  }

  return (
    <div className='bg-white h-screen p-6'>
      <div className='flex gap-2'>
        <button
          className='bg-gray-500 hover:bg-gray-700 text-white text-xs  py-1 px-1 rounded focus:outline-none focus:shadow-outline-gray'
          type='button'
          onClick={handleBack}
        >
          <KeyboardBackspaceIcon />
        </button>
        <h1 className='text-black font-semibold uppercase text-2xl'>
          Fee Collection
        </h1>
      </div>
      <div className='text-black mt-6 p-6'>
        <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Month
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Tuition Fee
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Transport Fee
                </th>
                <th
                  scope='col'
                  className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {feeRecordList.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium whitespace-nowrap text-left text-black'
                  >
                    {item.month}
                  </th>
                  <td className='px-6 py-4'>{item.tuition_fee}</td>
                  <td className='px-6 py-4'>{item.transport_fee}</td>
                  <td className='px-6 py-4 text-gray-500 font-semibold underline'>
                    {item.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='mt-6 flex justify-end'>
          <div className='text-black'>
            <h2 className='font-semibold text-lg'>Totals</h2>
            <div className='flex justify-between mt-2'>
              <span className='font-medium'>Total Tuition Fee:</span>
              <span className='ml-3 '>3000</span>
            </div>
            <div className='flex justify-between mt-2'>
              <span className='font-medium'>Total Transport Fee:</span>
              <span className='ml-3 '>2000</span>
            </div>
            {!feeRecord?.admission_status ? (
              <div className='flex justify-between mt-2'>
                <span className='font-medium'>Admission Fee:</span>
                <span className='ml-3 '>{feeRecord.admission_fee}</span>
              </div>
            ) : null}
            <div className='flex justify-between mt-2'>
              <span className='font-semibold'>Net Total:</span>
              <span className='font-semibold ml-3'>7000</span>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <div className='mt-6 border border-gray-300 p-4 w-full lg:w-1/2 bg-gray-100'>
            {!feeRecord?.admission_status ? (
              <div className='w-full px-3'>
                <input
                  className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-tuition-fee'
                  type='text'
                  placeholder='Admission Fee'
                  // value={tuitionFee}
                  // onChange={(e) => setTuitionFee(e.target.value)}
                />
              </div>
            ) : null}
            <div className='mt-6 flex'>
              <div className='w-full md:w-1/2 px-3'>
                <input
                  className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-tuition-fee'
                  type='text'
                  placeholder='Tuition Fee'
                  // value={tuitionFee}
                  // onChange={(e) => setTuitionFee(e.target.value)}
                />
              </div>
              <div className='w-full md:w-1/2 px-3'>
                <input
                  className='appearance-none block w-full bg-white text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
                  id='grid-transport-fee'
                  type='text'
                  placeholder='Transport Fee'
                  // value={transportFee}
                  // onChange={(e) => setTransportFee(e.target.value)}
                />
              </div>
            </div>

            <div className='px-3 mt-6'>
              <label
                className='flex uppercase tracking-wide text-gray-700 text-xs font-bold mb-2'
                htmlFor='grid-transport-fee'
              >
                Note{' '}
                <p className='text-gray-400 text-[10px] ml-1'>{'(optional)'}</p>
              </label>
              <textarea
                className='border rounded w-full p-2 text-black'
                rows='3'
                // value={textValue}
                // onChange={handleInputChange}
              />
            </div>
            <div className='flex justify-end'>
              <button className='mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700'>
                Pay Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeCollection;
