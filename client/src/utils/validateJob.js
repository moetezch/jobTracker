const validate = values => {
  const errors = {};
  const requiredFields = [
    'date',
    'jobTitle',
    'company',
    'country',
    'foundOn',
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  return errors;
};

export default validate;