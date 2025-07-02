const dateIsValid = (date) => {
  // validate format "YYYY-MM-DD"
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  // return boolean
  return regex.test(date);
};

export default dateIsValid;
