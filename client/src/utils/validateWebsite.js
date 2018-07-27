import validUrl from'valid-url'

const validate = values => {
  const errors = {};

  const requiredFields = [
    'name',
    'url'
  ]
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  })

  if (!(validUrl.isUri(values.url))){
    errors.url = 'Invalid URL';
} 

  return errors;
};

export default validate;