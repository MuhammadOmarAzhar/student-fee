import {firestore} from '@/firebase-config';
import {COLLECTION_NAMES} from '@/firebase/constants';
import {fetchCollectionWhere} from '@/firebase/functions';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';

const feeRecord = () => {
  const router = useRouter();
  const {id} = router.query;
  let studentId = JSON.parse(id);

  const dummyData = [
    {
      id: 1,
      month: 'June',
      feeStructure: {tuitionFee: 1000, transportFee: 2000},
      status: 'paid',
    },
    {
      id: 2,
      month: 'July',
      feeStructure: {tuitionFee: 1200, transportFee: 1500},
      status: 'unpaid',
    },
  ];

  const feeRecord = async () => {
    try {
      let response = await fetchCollectionWhere(
        firestore,
        COLLECTION_NAMES.feeRecord,
        'student_id',
        studentId
      );
      return response;
    } catch (error) {
      console.log(error.message);
    }
  };

  // const getMonthsNamesBetweenTimestamps = (startTimestamp, endTimestamp) => {
  //   let currentMoment = moment(startTimestamp * 1000); // Assuming timestamps are in seconds
  //   const endMoment = moment(endTimestamp * 1000);

  //   const monthsNames = [];

  //   while (
  //     currentMoment.isBefore(endMoment) ||
  //     currentMoment.isSame(endMoment, 'month')
  //   ) {
  //     monthsNames.push(currentMoment.format('MMMM'));
  //     currentMoment.add(1, 'month');
  //   }
  //   debugger;

  //   return monthsNames;
  // };

  // const getMonthsNamesBetweenTimestamps = (lastTimeStamp, currentTimeStamp) => {
  //   let endMoment = moment(lastTimeStamp * 1000); // Assuming timestamps are in seconds
  //   const currentMoment = moment(currentTimeStamp * 1000);

  //   const monthsNames = [];

  //   // Add the start month
  //   monthsNames.push(endMoment.format('MMMM'));

  //   while (endMoment.add(1, 'month').isBefore(currentMoment)) {
  //     monthsNames.push(endMoment.format('MMMM'));
  //   }

  //   debugger;

  //   return monthsNames;
  // };

  const getMonthsNamesBetweenTimestamps = (lastTimeStamp, currentTimeStamp) => {
    let endMoment = moment(lastTimeStamp * 1000); // Assuming timestamps are in seconds
    const currentMoment = moment(currentTimeStamp * 1000);

    const monthsNames = [];

    // Add the start month if it's not the same as the current month
    if (!endMoment.isSame(currentMoment, 'month')) {
      monthsNames.push(endMoment.format('MMM'));
    }

    while (endMoment.add(1, 'month').isBefore(currentMoment)) {
      monthsNames.push(endMoment.format('MMM'));
    }
    monthsNames.pop();

    let monthsString = monthsNames.join(', ');
    return monthsString;
  };

  const handleBack = () => {
    router.back();
  };
  const {data, isLoading, isError} = useQuery('feerecord', feeRecord);

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
          Fee Record
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
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <th
                    scope='row'
                    className='px-6 py-4 font-medium whitespace-nowrap text-left text-black'
                  >
                    {getMonthsNamesBetweenTimestamps(
                      item.last_month_timestamp,
                      item.createdAt
                    )}
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
      </div>
    </div>
  );
};

export default feeRecord;
