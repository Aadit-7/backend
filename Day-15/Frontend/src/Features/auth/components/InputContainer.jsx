import React from "react";

const InputContainer = ({ label, placeholder }) => {
  return (
    <div className="input-container">
      <label htmlFor={label}>{label} : </label>
      <input type="text" id={label} name={label} placeholder={placeholder} />
    </div>
  );
};

export default InputContainer;
