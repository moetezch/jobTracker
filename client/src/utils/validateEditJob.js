const validate = values => {
  const errors = {};
  const requiredFields = [
    'reply'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors;
};

export default validate;