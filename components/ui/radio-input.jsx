import { useMainContext } from '@/lib/maincontext';
import React, { useState, useEffect } from 'react';

const CheckboxInput = (props) => {
  const { label, id, setInputValue } = props;
  const [isChecked, setIsChecked] = useState(false);
  const { filteredCountry, filteredTime, filteredType, filteredDifficulity } = useMainContext();

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setInputValue(label);
  };

  useEffect(() => {
    //The datas what comes from usemaincontext are arrays and i want to check all of them is that includes the label or not
    if (filteredCountry?.includes(label) || filteredTime?.includes(label) || filteredType?.includes(label) || filteredDifficulity?.includes(label)) {
      setIsChecked(true);
    } else {
      setIsChecked(false);
    }
  } , [filteredCountry, filteredTime, filteredType, filteredDifficulity]);


  return (
    <div className='flex flex-row items-center justify-start gap-1'>
      <input
        onChange={handleCheckboxChange}
        checked={isChecked}
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
