import React from "react";

function FormTextarea({ label, name, placeholder, value, onChange }) {
  return (
    <div>
      <label className="form-control">
        <div className="label">
          <span className="label-text">{label}</span>
        </div>
        <textarea
          name={name}
          className="textarea  lg:h-24 h-20  focus:border-none input-bordered input-primary"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        ></textarea>
      </label>
    </div>
  );
}

export default FormTextarea;
