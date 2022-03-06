export const checkIfPastDate = (errorMessage: string) => {
  return (value: Date) => {
    const currentTimestamp = new Date().getTime();
    const givenDateTimestamp = value.getTime();
    if (givenDateTimestamp < currentTimestamp) {
      return errorMessage;
    }
    return null;
  };
};
