import { maxNumValidator } from "./../../../../../helpers/form-validators";
import { checkIfPastDate } from "./validators";
import {
  requiredValidator,
  maxCharsValidator,
  minNumValidator,
} from "../../../../../helpers/form-validators";
import { FormFields } from "./types";

// errors messages for form fields
export const errorMessages = {
  [FormFields.title]: {
    required: "Please input the task title!",
  },
  [FormFields.description]: {
    maxCharsLimit: (maxChars: number) => {
      return `Description cannot have more than '${maxChars}' chars`;
    },
  },
  [FormFields.expiresOn]: {
    required: "Please select the date on which this task expires",
    minDate: "The given date should be the current or future date",
  },
  [FormFields.reminderDaysInAdvance]: {
    minDays: (minDays: number) => {
      return `The reminder should be of minimum '${minDays}' day(s)`;
    },
    maxDays: (maxDays: number) => {
      return `Max days of reminder cannot exceed '${maxDays}' days`;
    },
  },
  [FormFields.reminderDaysInterval]: {
    minDays: (minDays: number) => {
      return `The reminder interval should of minimum '${minDays}' day(s)`;
    },
    maxDays: (maxDays: number) => {
      return `Max reminder interval cannot exceed '${maxDays}' days`;
    },
  },
};

export const descriptionMaxChars = 100;
export const maxReminderDaysInAdvance = 15;
export const minReminderDaysInAdvance = 1;
export const minReminderInterval = 1;
export const maxReminderInterval = 15;

// add required validation to the initial form fields
export const formFieldsValidators = {
  [FormFields.title]: [
    requiredValidator(errorMessages[FormFields.title].required),
  ],
  [FormFields.description]: [
    maxCharsValidator(
      descriptionMaxChars,
      errorMessages[FormFields.description].maxCharsLimit(descriptionMaxChars)
    ),
  ],
  [FormFields.expiresOn]: [
    requiredValidator(errorMessages[FormFields.expiresOn].required),
    checkIfPastDate(errorMessages[FormFields.expiresOn].minDate),
  ],
  [FormFields.reminderDaysInterval]: [
    maxNumValidator(
      maxReminderInterval,
      errorMessages[FormFields.reminderDaysInterval].maxDays(
        maxReminderInterval
      )
    ),
    minNumValidator(
      minReminderInterval,
      errorMessages[FormFields.reminderDaysInterval].minDays(
        minReminderInterval
      )
    ),
  ],
  [FormFields.reminderDaysInAdvance]: [
    maxNumValidator(
      maxReminderDaysInAdvance,
      errorMessages[FormFields.reminderDaysInAdvance].maxDays(
        maxReminderDaysInAdvance
      )
    ),
    minNumValidator(
      minReminderDaysInAdvance,
      errorMessages[FormFields.reminderDaysInAdvance].minDays(
        minReminderDaysInAdvance
      )
    ),
  ],
};
