export interface Errors {
  [key: string]: string | null;
}

interface BaseState {
  [key: string]: any;
  errors: Errors;
}

// each field validator execution
export const executeFieldValidator = <State extends BaseState>(
  state: State,
  fieldName: string,
  fieldValue: any,
  validators: Array<Function>
) => {
  for (let i = 0; i < validators.length; i++) {
    const errorMessage = validators[i](fieldValue, state);
    state = {
      ...state,
      errors: { ...state.errors, [fieldName]: errorMessage },
    };
    if (errorMessage) {
      break;
    }
  }
  return state;
};

// execute validators
export const executeFieldsValidators = <State extends BaseState>(
  state: State,
  valuesPropertyName: string,
  validators: { [key: string]: Array<Function> }
) => {
  for (let fieldName in validators) {
    state = executeFieldValidator(
      state,
      fieldName,
      state[valuesPropertyName][fieldName],
      validators[fieldName]
    );
  }
  return state;
};

export const checkIfFormHasErrors = (errors: Errors) => {
  for (let fieldName in errors) {
    if (errors[fieldName]) {
      // even if the single field has error
      // the form cannot be submitted
      return true;
    }
  }
  return false;
};