const createInputConfig = (
  elementType,
  type,
  placeholder,
  defaultValue,
  validation
) => ({
  elementType: elementType,
  elementConfig: {
    type: type,
    placeholder: placeholder,
  },
  validation: validation,
  isValid: false,
  value: defaultValue,
  touched: false,
});

export default createInputConfig;