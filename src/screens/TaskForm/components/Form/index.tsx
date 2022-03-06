import { FormEvent, useEffect, useReducer } from "react";
import { Alert, Button, Col, Form, Row } from "react-bootstrap";
import InputDatePicker from "../../../../shared/components/InputDatePicker";
import InputField, {
  InputFieldType,
} from "../../../../shared/components/InputField";
import ActionTypes from "./store/actions";
import taskDetailsFormReducer, { getDefaultFormState } from "./store/reducer";
import { FormFields } from "./store/types";
import "react-datepicker/dist/react-datepicker.css";
import {
  maxReminderDaysInAdvance,
  minReminderInterval,
} from "./store/constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as DB from "../../../../helpers/db";
import { Task } from "../../../../types/common";

const formatValues = (values: Task) => {
  return {
    id: new Date().getTime(),
    title: values.title,
    description: values.description,
    expiresOn: values.expiresOn,
    reminderDaysInAdvance: values.reminderDaysInAdvance
      ? values.reminderDaysInAdvance
      : maxReminderDaysInAdvance,
    reminderDaysInterval: values.reminderDaysInterval
      ? values.reminderDaysInterval
      : minReminderInterval,
  };
};

const TaskForm = () => {
  const [state, dispatch] = useReducer(
    taskDetailsFormReducer,
    getDefaultFormState(),
    getDefaultFormState
  );
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params.taskId) {
      // edit form
      // fetch the task details from DB and load it in store
      const task: Task = DB.getItem(parseInt(params.taskId));
      if (task) {
        dispatch({
          type: ActionTypes.SET_DEFAULT_VALUES,
          payload: {...task, expiresOn: new Date(task.expiresOn)},
        });
      }
    }
  }, [params]);
  const onChange = (fieldName: FormFields) => {
    return (value: any) =>
      dispatch({
        type: ActionTypes.SET_VALUE,
        payload: { fieldName, value },
      });
  };
  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    dispatch({
      type: ActionTypes.SUBMIT,
      payload: {},
    });
  };

  useEffect(() => {
    if (state.isSubmitted) {
      const details = formatValues(state.values);
      // let the user see the success message for a while
      // and then redirect
      setTimeout(() => {
        // reset the submit status
        dispatch({
          type: ActionTypes.RESET_SUBMIT_STATUS,
          payload: {},
        });
        // save the details to db
        if (params.taskId) {
          // update
          DB.updateItem(parseInt(params.taskId), details);
        } else {
          // add
          DB.addItem(details);
        }
        navigate("/");
      }, 1000);
    }
  }, [state.isSubmitted, state.values, params, navigate]);

  return (
    <Form onSubmit={onSubmit}>
      <InputField
        placeholder="Title*"
        value={state.values.title}
        onChange={onChange(FormFields.title)}
        errorMessage={state.errors.title}
        data-testid={`input-${FormFields.title}`}
        maxLength={30}
      />
      <InputField
        type={InputFieldType.textarea}
        placeholder="Description"
        value={state.values.description}
        onChange={onChange(FormFields.description)}
        errorMessage={state.errors.description}
        data-testid={`input-${FormFields.description}`}
        maxLength={100}
      />
      <InputDatePicker
        placeholderText="Expires On*"
        selected={state.values.expiresOn}
        onChangeDate={onChange(FormFields.expiresOn)}
        errorMessage={state.errors.expiresOn}
        data-testid={`input-${FormFields.expiresOn}`}
      />
      <InputField
        type={InputFieldType.number}
        placeholder={`Reminder Days In Advance(default is ${maxReminderDaysInAdvance} days)`}
        value={state.values.reminderDaysInAdvance}
        onChange={onChange(FormFields.reminderDaysInAdvance)}
        errorMessage={state.errors.reminderDaysInAdvance}
        data-testid={`input-${FormFields.reminderDaysInAdvance}`}
      />
      <InputField
        type={InputFieldType.number}
        placeholder={`Reminder Days Interval(default is ${minReminderInterval} day)`}
        value={state.values.reminderDaysInterval}
        onChange={onChange(FormFields.reminderDaysInterval)}
        errorMessage={state.errors.reminderDaysInterval}
        data-testid={`input-${FormFields.reminderDaysInterval}`}
      />
      {state.isSubmitted ? (
        <Alert variant="success">New task added successfully!</Alert>
      ) : null}
      <Row className="justify-content-end">
        <Col className="col-auto pe-0">
          <Link to="/">
            <Button
              disabled={state.isSubmitted}
              variant="outline-secondary"
              data-testid="cancel-btn"
            >
              Cancel
            </Button>
          </Link>
        </Col>
        <Col className="col-auto">
          <Button
            variant="primary"
            data-testid="submit-btn"
            type="submit"
            disabled={state.isSubmitted}
          >
            {params.taskId ? "Update" : "Submit"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
