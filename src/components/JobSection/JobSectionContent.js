import React from 'react';
import { PergoTitle } from '../PergoTitle';
import Button from '@material-ui/core/Button';

const JobSectionContent = ({
  title,
  children,
  prevButton,
  nextButton,
  middleButton,
  ...otherProps
}) => (
  <div className={'main--job-body '}>
    <div className="main--job-step-header">
      <PergoTitle className="main--job-step-title">{title}</PergoTitle>
    </div>
    <div className={'main--job-step-body ' + (otherProps.className || '')}>{children}</div>
    <div className="main--job-step-footer">
      {prevButton ? (
        <Button className="main--job-step-btn-prev" variant="outlined" onClick={prevButton.onClick}>
          {prevButton.label}
        </Button>
      ) : (
        <div></div>
      )}
      <div className="form-control-inline">
        {middleButton && (
          <Button
            className="main--job-step-btn-next-other"
            variant="outlined"
            onClick={middleButton.onClick}
          >
            {middleButton.label}
          </Button>
        )}
        {nextButton && (
          <Button
            className="main--job-step-btn-next"
            variant="outlined"
            onClick={nextButton.onClick}
          >
            {nextButton.label}
          </Button>
        )}
      </div>
    </div>
  </div>
);

export default JobSectionContent;
