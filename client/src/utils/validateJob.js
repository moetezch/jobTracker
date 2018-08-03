import validUrl from 'valid-url'
const validate = values => {
  const errors = {};
  const requiredFields = [
    'date',
    'jobTitle',
    'type',
    'company',
    'country',
    'foundOn'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })
  if (values.link && !(validUrl.isUri(values.link))) {
    errors.link = 'Invalid URL';
  }

  return errors;
};

export default validate;