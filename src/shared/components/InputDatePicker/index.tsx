import classNames from "classnames";
import { Form } from "react-bootstrap";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";
import Error from "../Error";

interface InputDatePickerProps {
  // custom on change method passed
  // this will be called when a blur or change event is triggered
  onChangeDate: Function;
  errorMessage?: string | null;
  "data-testid"?: string;
}
// User can pass ReactDatePicker props
const InputDatePicker = (
  props: InputDatePickerProps & Partial<ReactDatePickerProps>
) => {
  const { onChangeDate, errorMessage, ...datePickerProps } = props;
  return (
    <Form.Group className="mb-3">
      <ReactDatePicker
        placeholderText={props.placeholderText}
        customInput={<input data-testid={props["data-testid"]} />}
        className={classNames({
          "date-picker-container form-control": true,
          "is-invalid": errorMessage ? true : false,
        })}
        selected={props.selected}
        onBlur={() => onChangeDate(props.selected)}
        onChange={(value) => onChangeDate(value)}
        showYearDropdown
        showMonthDropdown
        {...datePickerProps}
      />
      {props.errorMessage ? <Error message={props.errorMessage} /> : null}
    </Form.Group>
  );
};

export default InputDatePicker;
