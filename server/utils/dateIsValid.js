const dateIsValid = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/; // validate format YYYY-MM-DD

  return regex.test(date);
};

export default dateIsValid;
