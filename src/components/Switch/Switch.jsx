import React from "react";
import "./Switch.css";

const Switch = ({ value, name, handleToggle, onColor }) => {
  return (
    <>
      <input
        checked={value}
        name={name}
        onChange={handleToggle}
        className="react-switch-checkbox"
        id={`react-switch-${name}`}
        type="checkbox"
      />
      <label
        style={{ background: value && onColor }}
        className="react-switch-label"
        htmlFor={`react-switch-${name}`}
      >
        <span className={`react-switch-button`} />
      </label>
    </>
  );
};

export default Switch;