import { Errors } from "../../../../../helpers/run-validator";
import ActionTypes from "./actions";

// all form fields
export enum FormFields {
  title = "title",
  description = "description",
  expiresOn = "expiresOn",
  reminderDaysInAdvance = "reminderDaysInAdvance",
  reminderDaysInterval = "reminderDaysInterval",
}

export type FormStateValues = {
  [key in FormFields]: any;
};

export interface FormState {
  isSubmitted: boolean;
  values: FormStateValues;
  errors: Errors;
}

export interface Action {
  type: ActionTypes;
  payload: any;
}
