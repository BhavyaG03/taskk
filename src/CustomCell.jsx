import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const statusOptions = [
  { value: 'idea', label: 'Idea' },
  { value: 'planning', label: 'Planning' },
  { value: 'booked', label: 'Booked' },
];

const EditableCell = ({ value: initialValue, row: { index }, column: { id }, updateData }) => {
  const [value, setValue] = useState(initialValue || '');
  const [isEditing, setIsEditing] = useState(false);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setIsEditing(false);
    updateData(index, id, value);
  };

  const onClick = () => {
    setIsEditing(true);
  };

  const renderCellContent = () => {
    if (id === 'status') {
      return (
        <Select
          options={statusOptions}
          value={statusOptions.find(option => option.value === value) || statusOptions[0]} // Default to first option
          onChange={option => {
            setValue(option.value);
            updateData(index, id, option.value);
          }}
          onBlur={onBlur}
          onClick={onClick}
        />
      );
    } else if (id === 'date') {
      return (
        <DatePicker
          selected={value ? new Date(value) : null} // Handle case where value might be undefined
          onChange={date => {
            const formattedDate = date ? date.toISOString().split('T')[0] : '';
            setValue(formattedDate);
            updateData(index, id, formattedDate);
          }}
          onBlur={onBlur}
          onClick={onClick}
          dateFormat="yyyy-MM-dd"
        />
      );
    } else {
      return (
        <input
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onClick={onClick}
          placeholder={`Enter ${id}`}
        />
      );
    }
  };

  return isEditing ? renderCellContent() : <div onClick={onClick}>{value || initialValue}</div>;
};

export default EditableCell;
