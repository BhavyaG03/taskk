import React, { useState } from 'react';
import { useTable } from 'react-table';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const statusOptions = [
  { value: 'idea', label: 'Idea' },
  { value: 'planning', label: 'Planning' },
  { value: 'booked', label: 'Booked' },
];

const Table = ({ columns, data, updateData }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data,
    updateData,
  });

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
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
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
