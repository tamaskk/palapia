import React from 'react';

const CheckboxInput = (props) => {
  const { label, id, setInputValue, dataFromRadio } = props;

  return (
    <div className='flex flex-row items-center justify-start gap-1'>
      <input
        onChange={() => setInputValue(label)}
        checked={dataFromRadio === label}
        className='w-6 h-6'
        type="radio"
        id={id}
      />
      <label className='text-lg' htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxInput;
