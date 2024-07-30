import React, { useState } from 'react';
import Table from './Table';

const initialData = [
  { name: 'Europe', status: 'idea', date: '2018-04-24', city: 'Spain, Portugal, and Italy', people: 'Sasha & Bill' },
  { name: 'Trip 2', status: 'booked', date: '2024-07-17', city: 'India', people: '' },
];

const columns = [
  { Header: 'Name', accessor: 'name' },
  { Header: 'Status', accessor: 'status' },
  { Header: 'Date', accessor: 'date' },
  { Header: 'City', accessor: 'city' },
  { Header: 'People', accessor: 'people' },
];

const App = () => {
  const [data, setData] = useState(initialData);

  const updateData = (rowIndex, columnId, value) => {
    setData(oldData =>
      oldData.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };

  const addRow = () => {
    setData(oldData => [
      ...oldData,
      { name: '', status: 'idea', date: '', city: '', people: '' }
    ]);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-start items-start px-10 py-8">
      <h1 className='text-4xl text-black font-semibold font-sans'>✈ Travel Plans</h1>
      <Table columns={columns} data={data} updateData={updateData} />
      <button
        onClick={addRow}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add New Row
      </button>
    </div>
  );
};

export default App;
