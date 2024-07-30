import React, { useState } from 'react';
import { useTable, useSortBy } from 'react-table';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { FaSortDown, FaSortUp, FaSort } from 'react-icons/fa6';
import 'react-datepicker/dist/react-datepicker.css';

const statusOptions = [
  { value: 'idea', label: 'Idea' },
  { value: 'planning', label: 'Planning' },
  { value: 'booked', label: 'Booked' },
];

const statusColors = {
  idea: 'purple',
  planning: 'lightblue',
  booked: 'lightpink',
};

const Table = ({ columns, data, updateData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      updateData,
    },
    useSortBy
  );

  const handleCellChange = (e, rowIndex, columnId) => {
    const value = e.target.value;
    updateData(rowIndex, columnId, value);
  };

  return (
    <table {...getTableProps()} style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  padding: '10px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {column.render('Header')}
                  <span style={{
                    marginLeft: '8px',
                    display: 'flex',
                    alignItems: 'center'
                  }}>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? <FaSortDown size={16} className='text-black' />
                        : <FaSortUp size={16} className='text-black' />
                      : <FaSort size={16} className='text-black' />}
                  </span>
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()} style={{ border: '1px solid lightgray', padding: '8px' }}>
                  {cell.column.id === 'status' ? (
                    <Select
                      options={statusOptions}
                      value={statusOptions.find(option => option.value === cell.value)}
                      onChange={option => updateData(row.index, cell.column.id, option.value)}
                      styles={{
                        control: (styles) => ({
                          ...styles,
                          backgroundColor: statusColors[cell.value],
                          color: 'black',
                          padding: '2px 5px',
                          border: 'none',
                          borderRadius: '4px',
                        }),
                        singleValue: (styles) => ({
                          ...styles,
                          color: 'black',
                        }),
                      }}
                    />
                  ) : cell.column.id === 'date' ? (
                    <DatePicker
                      selected={cell.value ? new Date(cell.value) : null}
                      onChange={date => updateData(row.index, cell.column.id, date ? date.toISOString().split('T')[0] : '')}
                      dateFormat="yyyy-MM-dd"
                    />
                  ) : (
                    <input
                      value={cell.value || ''}
                      onChange={e => handleCellChange(e, row.index, cell.column.id)}
                      placeholder={`Enter ${cell.column.id}`}
                    />
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
