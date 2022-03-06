import {
  executeFieldsValidators,
  executeFieldValidator,
} from "../../../../../helpers/run-validator";
import { FormFields, FormState, Action } from "./types";
import ActionTypes from "./actions";
import { checkIfFormHasErrors } from "../../../../../helpers/run-validator";
import { formFieldsValidators } from "./constants";

const setErrorDefaultValues = () => {
  const fields: any = {};
  for (let fieldName in FormFields) {
    fields[fieldName] = null;
  }
  return fields;
};
const setFormFieldDefaultValues = () => {
  const fields: any = {};
  for (let fieldName in FormFields) {
    fields[fieldName] = "";
  }
  return fields;
};

export const getDefaultFormState = () => {
  return {
    isSubmitted: false,
    errors: setErrorDefaultValues(),
    values: setFormFieldDefaultValues(),
  };
};

const taskDetailsFormReducer = (state: FormState, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_VALUE:
      const { fieldName }: { fieldName: FormFields } = action.payload;
      state = {
        ...state,
        values: { ...state.values, [fieldName]: action.payload.value },
      };
      return executeFieldValidator(
        state,
        fieldName,
        state.values[fieldName],
        formFieldsValidators[fieldName]
      );
    case ActionTypes.SET_DEFAULT_VALUES:
      return { ...state, values: { ...action.payload } };
    case ActionTypes.SUBMIT:
      state = executeFieldsValidators(state, "values", formFieldsValidators);
      // if the form has no errors, mark the form as submitted
      const hasErrors = checkIfFormHasErrors(state.errors);
      state = { ...state, isSubmitted: !hasErrors };
      return state;
    case ActionTypes.RESET_SUBMIT_STATUS:
      return { ...state, isSubmitted: false };
    default:
      return state;
  }
};

export default taskDetailsFormReducer;
