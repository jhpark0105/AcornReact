import React from "react";
import PropTypes from "prop-types";
import { Select } from "@mui/material";

const SelectPicker = ({ options, value, onChange, disabled }) => {
  return (
    <Select
      native
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      style={{ width: "100%", padding: "8px", borderRadius: "4px" }}
    >
      {options.map((option, index) => (
        <option key={index} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
};

SelectPicker.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

export default SelectPicker;
