import React, { useState } from 'react';
import styled from 'styled-components';

import { PergoTitle } from '../PergoTitle';
import { PergoTextField } from '../PergoTextField/PergoTextField';
import JobSectionContent from './JobSectionContent';

const Step3 = ({ values, onClickNext, onClickPrev }) => {
  return (
    <StepContent
      title={'Dispatch'}
      prevButton={{
        onClick: onClickPrev,
        label: 'Back',
      }}
      middleButton={{
        onClick: onClickNext,
        label: 'Dispatch',
      }}
    >
      <PergoTextField label="Distance (Miles)" defaultValue={`35.2 miles`} readonly />
      <PergoTextField label="Fare" defaultValue={`4500`} type="currency" readonly />
      <PergoTextField label="Total" defaultValue={`5000`} type="currency" readonly />
      <PergoTextField label="Balance" defaultValue={`800`} type="currency" readonly />
    </StepContent>
  );
};

export default Step3;

const StepContent = styled(JobSectionContent)``;
