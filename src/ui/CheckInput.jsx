import React from "react";
import PropTypes from "prop-types";

function CheckInput({ name, label, register, value }) {
  return (
    <div className="flex gap-5 col-span-3">
      <label htmlFor={name} className=" cursor-pointer">
        {label}
      </label>
      <input
        type="checkbox"
        id={name}
        name={name}
        value={value}
        {...register}
      />
    </div>
  );
}

CheckInput.propTypes = {};

export default CheckInput;
