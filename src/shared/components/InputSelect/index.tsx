import { Form } from "react-bootstrap";
import Error from "../Error";

interface Option {
  name: string;
  [key: string]: any;
}
interface InputSelectProps {
  value: string;
  errorMessage?: string | null;
  onChange: Function;
  options: Array<Option>;
  placeholder?: string;
  isVisible?: boolean;
  "data-testid"?: string;
}

const InputSelect = (props: InputSelectProps) => {
  const isVisible = props.hasOwnProperty("isVisible") ? props.isVisible : true;

  return isVisible ? (
    <Form.Group className="mb-3">
      <Form.Select
        value={props.value}
        isInvalid={props.errorMessage ? true : false}
        onBlur={() => props.onChange(props.value)}
        onChange={(event) => props.onChange(event.target.value)}
        data-testid={props["data-testid"]}
      >
        <option>{props.placeholder}</option>
        {props.options.map((option) => {
          return (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          );
        })}
      </Form.Select>
      {props.errorMessage ? <Error message={props.errorMessage} /> : null}
    </Form.Group>
  ) : null;
};

export default InputSelect;
