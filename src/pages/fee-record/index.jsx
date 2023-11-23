import {firestore} from '@/firebase-config';
import {COLLECTION_NAMES} from '@/firebase/constants';
import {fetchCollectionWhere} from '@/firebase/functions';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CloseIcon from '@mui/icons-material/Close';
import Modal from 'react-modal';
import moment from 'moment';
import {useRouter} from 'next/router';
import {useQuery} from 'react-query';
import {useState} from 'react';

const feeRecord = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const router = useRouter();
  const {id} = router.query;
  let studentId = JSON.parse(id);

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

  const handleOpenModal = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
                  Admission Fee
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
                    className='px-6 py-4 font-medium whitespace-nowrap text-left text-black cursor-pointer hover:underline'
                    onClick={() => handleOpenModal(item)}
                  >
                    {getMonthsNamesBetweenTimestamps(
                      item.last_month_timestamp,
                      item.createdAt
                    )}
                  </th>
                  <td className='px-6 py-4'>{item.admission_fee}</td>
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
          {selectedItem && (
            <div>
              <div className='flex justify-between items-center'>
                <h2 className='text-black ml-6 font-semibold uppercase text-lg '>
                  Fee Detail
                </h2>
                <button className='text-black p-4' onClick={handleCloseModal}>
                  <CloseIcon />
                </button>
              </div>
              <div className='grid grid-cols-3'>
                <div className='px-6 py-3 justify-between flex '>
                  <p className='uppercase text-green-800 font-semibold'>
                    Admission fee:
                  </p>
                  <p className='text-green-700 ml-1'>
                    {selectedItem.admission_fee}
                  </p>
                </div>
                <div className='px-6 py-3 justify-between flex '>
                  <p className='uppercase text-green-800 font-semibold'>
                    Tuition fee:
                  </p>
                  <p className='text-green-700 ml-1'>
                    {selectedItem.tuition_fee}
                  </p>
                </div>
                <div className='px-6 py-3 justify-between flex '>
                  <p className='uppercase tracking-wide text-green-800 font-semibold'>
                    Transport fee:
                  </p>
                  <p className='text-green-700 ml-1'>
                    {selectedItem.transport_fee}
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-3'>
                <div className='px-6 py-3 justify-between flex '>
                  <p className='uppercase text-green-800 font-semibold'>
                    Date:
                  </p>
                  <p className='text-green-700 ml-1'>
                    {moment(selectedItem.createdAt * 1000).format(
                      'DD/MMM/YYYY'
                    )}
                  </p>
                </div>
                <div className='px-6 py-3 justify-between flex '>
                  <p className='uppercase text-green-800 font-semibold'>
                    Status:
                  </p>
                  <p className='text-green-700 ml-1'>{selectedItem.status}</p>
                </div>
                <div className='px-6 py-3 justify-between flex '>
                  <p className='uppercase text-green-800 font-semibold'>
                    Note:
                  </p>
                  <p className='text-green-700 ml-1'>{selectedItem.note}</p>
                </div>
              </div>

              <div className='px-6 py-3 justify-center items-center flex mt-2'>
                <p className='uppercase text-black font-semibold'>
                  Total Amount:
                </p>
                <p className='text-green-700 ml-1'>
                  {selectedItem.total_amount}
                </p>
              </div>
            </div>
          )}
        </>
      </Modal>
    </div>
  );
};

export default feeRecord;
