import { forwardRef } from "react";
import "react-datepicker/dist/react-datepicker.css";
import DatePickerComponent from "../Picker/DatePicker";
import { width } from "@mui/system";
// import styles from "../ListSearch.module.css";
// import { RiSearchLine } from "react-icons/ri";

const DateSearch = (props) => {
  const CustomInput = forwardRef((props, ref) => (
    <button className="datepicker-input" onClick={props.onClick} ref={ref}>
      {props.value}
    </button>
  ));

  return (
    <div>
      <DatePickerComponent
        selected={props.selectedDate}
        onChange={props.setSelectedDate}
        dateFormat="yyyy/MM/dd"
        customInput={<CustomInput />}
        showPopperArrow={false}
        style={{ width: 200 }}
      />
    </div>
  );
};

export default DateSearch;


