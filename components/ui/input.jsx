import React, { Fragment } from "react";

const Input = ({id, type, label, onChangeHandler, ownStyle, ownStyleLabel, max }) => {
  return (
    <Fragment>
      <label htmlFor={id} className={`text-4xl font-semibold w-full md:w-auto text-center lg:text-left ${ownStyleLabel}`}>
        {label}
      </label>
      <input
        className={`p-3 text-xl active:outline-none focus:outline-none shadow-xl rounded-md border-b border-b-gray-600 ${ownStyle}`}
        id={id}
        type={type}
        onChange={onChangeHandler}
        required
        maxLength={max}
      />
    </Fragment>
  );
};

export default Input;
