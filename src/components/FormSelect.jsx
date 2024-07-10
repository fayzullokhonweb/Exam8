import React from "react";

function FormSelect({ label, name, value, onChange, refSelect }) {
  return (
    <label className="form-control w-full max-w-xl">
      <div className="label">
        <span className="label-text">{label}</span>
      </div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="select select-bordered select-primary"
        ref={refSelect}
      >
        <option value="Uzbek">Uzbek</option>
        <option value="Turkey">Kazakhstan</option>
        <option value="Russia">Turkey</option>
        <option value="Europa">Russia</option>
        <option value="Other">Other</option>
      </select>
    </label>
  );
}

export default FormSelect;
