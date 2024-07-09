import React from "react";

function FormInput({ label, name, type, placeholder, value, onChange }) {
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input input-md focus:border-none input-bordered input-primary w-full "
      />
    </label>
  );
}

export default FormInput;
