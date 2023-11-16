import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const feeCollection = () => {
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
  return (
    <div className='bg-white h-screen p-6'>
      <div className='flex gap-2'>
        <button
          className='bg-gray-500 hover:bg-gray-700 text-white text-xs  py-1 px-1 rounded focus:outline-none focus:shadow-outline-gray'
          type='button'
          // onClick={handleBack}
        >
          <KeyboardBackspaceIcon />
        </button>
        <h1 className='text-black font-semibold uppercase text-2xl'>
          Fee Collection
        </h1>
      </div>
      <div className='text-black mt-6'>
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
              {dummyData.map((item, index) => (
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
                  <td className='px-6 py-4'>{item.feeStructure?.tuitionFee}</td>
                  <td className='px-6 py-4'>
                    {item.feeStructure?.transportFee}
                  </td>
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
            <div className='flex justify-between mt-2'>
              <span className='font-medium'>Admission Fee:</span>
              <span className='ml-3 '>2000</span>
            </div>
            <div className='flex justify-between mt-2'>
              <span className='font-semibold'>Net Total:</span>
              <span className='font-semibold ml-3'>7000</span>
            </div>
            <button
              className='mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-blue-700'
              // onClick={() => alert('Payment initiated!')}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default feeCollection;
