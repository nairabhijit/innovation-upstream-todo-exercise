import { Col, Form, Row } from "react-bootstrap";
import Error from "../Error";

export enum InputFieldType {
  text = "text",
  textarea = "textarea",
  number = "number",
  search = "search",
}

export interface InputFieldProps {
  type?: InputFieldType;
  value: string;
  onChange: Function;
  placeholder?: string;
  errorMessage?: string | null;
  isVisible?: boolean;
  maxLength?: number;
  "data-testid"?: string;
}

const isTextarea = (fieldType: InputFieldType | undefined) => {
  return fieldType && fieldType === InputFieldType.textarea;
};

const InputField = (props: InputFieldProps) => {
  const isVisible = props.hasOwnProperty("isVisible") ? props.isVisible : true;
  const type = props.hasOwnProperty("type") ? props.type : InputFieldType.text;
  return isVisible ? (
    <Form.Group className="mb-3">
      {props.maxLength ? (
        <Row className="justify-content-end">
          <Col className="col-auto">
            <small className="text-secondary">
              {props.maxLength - props.value.length}/{props.maxLength}
            </small>
          </Col>
        </Row>
      ) : null}
      <Form.Control
        type={type}
        as={isTextarea(type) ? "textarea" : undefined}
        placeholder={props.placeholder}
        rows={isTextarea(type) ? 3 : undefined}
        value={props.value}
        isInvalid={props.errorMessage ? true : false}
        onBlur={() => props.onChange(props.value)}
        onChange={(event) => props.onChange(event.target.value)}
        data-testid={props["data-testid"]}
        maxLength={props.maxLength}
      />
      {props.errorMessage ? <Error message={props.errorMessage} /> : null}
    </Form.Group>
  ) : null;
};

export default InputField;
