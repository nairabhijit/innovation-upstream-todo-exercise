import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { formatDate } from "../../../helpers/date";
import TaskForm from "../components/Form";
import {
  errorMessages,
  maxReminderDaysInAdvance,
  maxReminderInterval,
  minReminderDaysInAdvance,
  minReminderInterval,
} from "../components/Form/store/constants";
import { FormFields } from "../components/Form/store/types";

const dateFormat = "mm/dd/yyyy";

const renderForm = () => {
  render(
    <BrowserRouter>
      <TaskForm />
    </BrowserRouter>
  );
};
const getInput = (name: FormFields) => {
  return screen.getByTestId(`input-${name}`);
};
const getSubmitButton = () => {
  return screen.getByTestId("submit-btn");
};
const setInputValue = (name: FormFields, value: string) => {
  const inputEl = getInput(name);
  fireEvent.change(inputEl, { target: { value } });
};
const expectErrorMessage = (errorMessage: string) => {
  expect(screen.getByText(errorMessage)).toBeInTheDocument();
};
const getYesterdayDate = () => {
  const date = new Date(Date.now() - 3600 * 1000 * 24);
  return formatDate(date, dateFormat);
};
describe("Load Task Details Form", () => {
  test("If the form is displayed with all the required inputs", () => {
    renderForm();
    for (let fieldName in FormFields) {
      // this will give error if any of the input is not displayed
      getInput(FormFields[fieldName as FormFields]);
    }
    // this will give error if the submit button is not displayed
    getSubmitButton();
  });
});

describe("Form Validations", () => {
  test("If the validation errors are displayed for mandatory fields", () => {
    renderForm();
    // submit the empty form
    const buttonEl = getSubmitButton();
    fireEvent.submit(buttonEl);
    expectErrorMessage(errorMessages[FormFields.title].required);
    expectErrorMessage(errorMessages[FormFields.expiresOn].required);
  });
  test("If the field 'Expires On' gives validation error when past date given", () => {
    renderForm();
    // set the past date
    setInputValue(FormFields.expiresOn, getYesterdayDate());
    expectErrorMessage(errorMessages[FormFields.expiresOn].minDate);
  });
  test(`If the field 'Reminder Days In Advance' gives validation error when the given days exceeds max limit of '${maxReminderDaysInAdvance}' days`, () => {
    renderForm();
    setInputValue(
      FormFields.reminderDaysInAdvance,
      // increment by 1, to force the validation error
      (maxReminderDaysInAdvance + 1).toString()
    );
    expectErrorMessage(
      errorMessages[FormFields.reminderDaysInAdvance].maxDays(
        maxReminderDaysInAdvance
      )
    );
  });
  test(`If the field 'Reminder Days In Advance' gives validation error when the given days are less than the min limit of '${minReminderDaysInAdvance}'`, () => {
    renderForm();
    setInputValue(
      FormFields.reminderDaysInAdvance,
      // decrement by 1, to force the validation error
      (minReminderDaysInAdvance - 1).toString()
    );
    expectErrorMessage(
      errorMessages[FormFields.reminderDaysInAdvance].minDays(
        minReminderDaysInAdvance
      )
    );
  });
  test(`If the field 'Reminder Days Interval' gives validation error when the given interval exceeds max limit of '${maxReminderInterval}' days`, () => {
    renderForm();
    setInputValue(
      FormFields.reminderDaysInterval,
      // increment by 1, to force the validation error
      (maxReminderDaysInAdvance + 1).toString()
    );
    expectErrorMessage(
      errorMessages[FormFields.reminderDaysInterval].maxDays(
        maxReminderDaysInAdvance
      )
    );
  });
  test(`If the field 'Reminder Days Interval' gives validation error when the given interval is less than the min limit of '${minReminderInterval}' days`, () => {
    renderForm();
    setInputValue(
      FormFields.reminderDaysInterval,
      // decrement by 1, to force the validation error
      (minReminderInterval - 1).toString()
    );
    expectErrorMessage(
      errorMessages[FormFields.reminderDaysInterval].minDays(
        minReminderInterval
      )
    );
  });
});
