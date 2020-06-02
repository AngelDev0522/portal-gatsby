import React from 'react';
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import './PergoTextField.less';

export const PergoTextField = props => {
  const {
    id,
    type = 'text',
    format,
    label,
    readonly,
    values,
    formValid,
    formErrors,
    ...otherProps
  } = props;

  const onHandleFocus = event => {
    otherProps.handleFocus && otherProps.handleFocus(id);
  };

  const onHandleBlur = event => {
    otherProps.handleBlur && otherProps.handleBlur(id, event.target.value);
  };

  const onHandleChange = event => {
    otherProps.handleChange && otherProps.handleChange(id, event.target.value);
  };

  const onHandleKeyPress = event => {
    otherProps.handleKeyPress && otherProps.handleKeyPress(event);
  };

  return (
    <>
      {(type === 'text' || type === 'password') && (
        <TextField
          label={label}
          variant="outlined"
          InputProps={readonly === true ? { readOnly: true } : {}}
          onBlur={onHandleBlur}
          onChange={onHandleChange}
          onFocus={onHandleFocus}
          onKeyPress={onHandleKeyPress}
          type={type}
          {...(values && { value: values[id] })}
          {...(formValid && { error: formValid[id] === -1 })}
          {...(formErrors && formErrors[id] !== '' && { label: formErrors[id] })}
          {...otherProps}
        />
      )}
      {(type === 'number' || type === 'currency') && (
        <NumberFormat
          format={
            type === 'number'
              ? format
              : value => {
                  return parseFloat(value) <= 0
                    ? ''
                    : '$ ' +
                        parseFloat(value / 100)
                          .toFixed(2)
                          .toString()
                          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
          }
          label={label}
          variant="outlined"
          customInput={TextField}
          InputProps={readonly === true ? { readOnly: true } : {}}
          onBlur={onHandleBlur}
          onChange={onHandleChange}
          onFocus={onHandleFocus}
          onKeyPress={onHandleKeyPress}
          {...(values && { value: values[id] })}
          {...(formValid && { error: formValid[id] === -1 })}
          {...(formErrors && formErrors[id] !== '' && { label: formErrors[id] })}
          {...otherProps}
        />
      )}
    </>
  );
};
