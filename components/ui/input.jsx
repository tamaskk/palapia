import React, { Fragment } from "react";

const Input = ({id, type, label, onChangeHandler, ownStyle, ownStyleLabel, max, placeholder, value }) => {
  return (
    <Fragment>
      <label htmlFor={id} className={ownStyleLabel}>
        {label}
      </label>
      <input
        className={`p-3 text-center text-lg placeholder:text-center active:outline-none focus:outline-none shadow-xl rounded-md border-b border-b-gray-600 ${ownStyle}`}
        id={id}
        type={type}
        value={value}
        onChange={onChangeHandler}
        required
        maxLength={max}
        placeholder={placeholder}
      />
    </Fragment>
  );
};

export default Input;
