import React, { useState } from 'react';
import styled from 'styled-components';

import { PergoTitle } from '../PergoTitle';
import { PergoTextField } from '../PergoTextField/PergoTextField';
import JobSectionContent from './JobSectionContent';

const Step0 = ({ globalValues, onClickNext, onClickPrev }) => {
  const [isUpdate, setUpdate] = useState(false);
  const [values, setValues] = useState({
    phone: globalValues['phone'],
    first_name: globalValues['first_name'],
    last_name: globalValues['last_name'],
  });

  const nameType = {
    phone: 'Phone Number',
    first_name: 'First Name',
    last_name: 'Last Name',
  };

  const [formValid, setFormValid] = useState({
    phone: 0,
    first_name: 0,
    last_name: 0,
  });

  const [formErrors, setFormErrors] = useState({
    phone: '',
    first_name: '',
    last_name: '',
  });

  const onHandleChange = (id, newValue) => {
    let tmpValues = Object.assign({}, values);
    tmpValues[id] = newValue;
    setValues(tmpValues);
  };

  const checkFieldValidate = (id, value) => {
    let fieldValidation = formValid;
    let fieldValidationErrors = formErrors;

    fieldValidation[id] = 1;
    if (id === 'phone') {
      value = value.replace(/\D/g, '');
      fieldValidation[id] = value.length === 10 ? 1 : -1;
      fieldValidationErrors[id] = fieldValidation[id] === 1 ? '' : nameType[id] + ' is not valid';
    } else {
      fieldValidation[id] = value != '' ? 1 : -1;
      fieldValidationErrors[id] = fieldValidation[id] === 1 ? '' : nameType[id] + ' is required';
    }

    setFormValid(fieldValidation);
    setFormErrors(fieldValidationErrors);
    setUpdate(!isUpdate);

    return fieldValidation[id];
  };

  const checkStepValidate = () => {
    let stepValid = 0;
    let stepFields = [];

    stepFields = ['phone', 'first_name', 'last_name'];

    for (var c in stepFields) {
      const element = stepFields[c];
      stepValid += checkFieldValidate(element, values[element]);
    }
    const formValidCount = stepValid === stepFields.length;
    return formValidCount;
  };

  const onNextStep = () => {
    if (checkStepValidate()) onClickNext(values);
  };

  return (
    <StepContent
      title={'Start Job'}
      className="job-section--start"
      nextButton={{
        type: 'next',
        onClick: onNextStep,
        label: 'START JOB',
      }}
    >
      <PergoTextField
        id="phone"
        label="Phone Number"
        values={values}
        handleChange={onHandleChange}
        formValid={formValid}
        formErrors={formErrors}
        type="number"
        format="(###) ###-####"
      />
      <div className="form-control-inline">
        <PergoTextField
          id="first_name"
          label="First Name"
          values={values}
          handleChange={onHandleChange}
          formValid={formValid}
          formErrors={formErrors}
        />
        <PergoTextField
          id="last_name"
          label="Last Name"
          values={values}
          handleChange={onHandleChange}
          formValid={formValid}
          formErrors={formErrors}
        />
      </div>
    </StepContent>
  );
};

export default Step0;

const StepContent = styled(JobSectionContent)``;
