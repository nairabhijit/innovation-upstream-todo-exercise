export const requiredValidator = (errorMessage: string) => {
  return (value: any, state: any) => {
    if (!value || !value.toString().trim()) {
      return errorMessage;
    }
    return null;
  };
};

export const maxCharsValidator = (maxChars: number, errorMessage: string) => {
  return (value: any, state: any) => {
    if (value && value.toString().length > maxChars) {
      return errorMessage;
    }
    return null;
  };
};

export const maxNumValidator = (maxNum: number, errorMessage: string) => {
  return (value: any, state: any) => {
    if (value && value > maxNum) {
      return errorMessage;
    }
    return null;
  };
};

export const minNumValidator = (minNum: number, errorMessage: string) => {
  return (value: any, state: any) => {
    if (value && value < minNum) {
      return errorMessage;
    }
    return null;
  };
};
