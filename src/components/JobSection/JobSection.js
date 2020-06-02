import React, { useState } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import 'date-fns';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { PergoTitle } from '../PergoTitle';

import Step0 from './step0';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';

const JobSection = ({ mapType }) => {
  const [activeStep, setActiveStep] = useState(-1);
  const [sliderChanging, setSliderChanging] = useState(false);
  const [headerTitle, setHeaderTitle] = useState('Job Start');
  const [isDispatch, setIsDispatch] = useState(false);

  const initValues = {
    phone: '',
    first_name: '',
    last_name: '',
    pickup_place_name: '',
    pickup_address: '',
    pickup_suite: '',
    pickup_city: '',
    pickup_state: '',
    pickup_zip: '',
    pickup_lat: 0,
    pickup_lng: 0,
    dropoff_place_name: '',
    dropoff_address: '',
    dropoff_suite: '',
    dropoff_city: '',
    dropoff_state: '',
    dropoff_zip: '',
    dropoff_lat: 0,
    dropoff_lng: 0,
    passenger: '',
    bags: '',
    distance: '',
    ride_time: '',
    vehicle_type: '',
    fair: '',
    tip: '',
    tip_percent: '',
    instruction: '',
    send_text_update: false,
    is_recurring: false,
    pickup_time: '',
    reserve_ahead: '',
    is_return: false,
    return_time: '',
    driver: '',
    start_date: '',
    end_date: '',
    is_weekly: false,
    week_days: '',
  };
  const [values, setValues] = useState(initValues);

  let slider;

  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    beforeChange: () => {
      setSliderChanging(true);
    },
    afterChange: () => {
      setSliderChanging(false);
    },
  };

  const onClickPrev = () => {
    if (!sliderChanging && activeStep >= 0) {
      let newStep = activeStep - 1;
      if (activeStep > 1 && !isDispatch) {
        setIsDispatch(false);
        newStep--;
      }
      slider.slickGoTo(newStep + 1);
      setActiveStep(newStep);
    }
  };

  const onClickNext = (stepValues = null, dispatch = false) => {
    if (!sliderChanging && activeStep <= 1) {
      let newStep = activeStep + 1;
      if (activeStep === 1 && !dispatch) {
        newStep++;
      }

      setIsDispatch(dispatch);
      slider.slickGoTo(newStep + 1);
      setActiveStep(newStep);
      setValues({ ...values, ...stepValues });
    }
  };
  return (
    <JobSectionWrapper className="main--job-section-wrapper">
      <Paper className="main--job-section" elevation={3} square>
        <PergoTitle className="main--job-title">{headerTitle}</PergoTitle>

        <Stepper activeStep={activeStep > 2 ? 2 : activeStep}>
          <Step key={1}>
            <StepLabel></StepLabel>
          </Step>
          <Step key={2}>
            <StepLabel></StepLabel>
          </Step>
          <Step key={3}>
            <StepLabel></StepLabel>
          </Step>
        </Stepper>

        <Slider ref={c => (slider = c)} {...settings}>
          <Step0 globalValues={values} setValues={setValues} onClickNext={onClickNext} />
          <Step1
            globalValues={values}
            onClickPrev={onClickPrev}
            onClickNext={onClickNext}
            mapType={mapType}
          />
          <Step2
            globalValues={values}
            onClickPrev={onClickPrev}
            onClickNext={onClickNext}
            onClickMiddle={onClickNext}
          />
          <Step3 values={values} onClickPrev={onClickPrev} onClickNext={onClickNext} />
          <Step4 globalValues={values} onClickPrev={onClickPrev} onClickNext={onClickNext} />
        </Slider>
      </Paper>
    </JobSectionWrapper>
  );
};

export default JobSection;

const JobSectionWrapper = styled.div`
  flex: 1;
  max-width: 500px;
  min-width: 445px;
  margin-right: 10px;

  .main--job-section {
    border: 2px solid var(--blue-main-color);
    background: var(--job-section-background);

    .main--job-title {
      background: var(--blue-main-color);
      font-size: 16px;
      padding: 15px 10px;
      overflow: hidden;
      white-space: nowrap;
    }

    .MuiStepper-root {
      background: var(--job-section-background);
      padding: 15px 10px;

      .MuiStepLabel-label.MuiStepLabel-alternativeLabel {
        margin-top: 5px;
      }

      .MuiStepIcon-root {
        &.MuiStepIcon-completed {
          color: #ff8424;
        }
        &.MuiStepIcon-active {
          color: #ff8424;
        }
      }
    }

    .main--job-body {
      height: 100%;
      position: relative;

      .main--job-step-title {
        color: var(--black-text-color);
        text-align: center;
      }

      .main--job-step-body {
        font-size: 14px;
        padding: 20px 15px 57px;

        .MuiFormControl-root {
          width: 100%;
          margin-bottom: 10px;
        }

        .MuiOutlinedInput-root {
          border-radius: 0;
        }

        .MuiOutlinedInput-adornedEnd {
          padding-right: 0;
        }

        .MuiInputAdornment-positionEnd {
          margin-left: 0;
        }

        .MuiOutlinedInput-multiline {
          padding: 0;
        }

        .pac-target-input,
        .MuiInputLabel-outlined {
          font-size: 14px;
          transform: translate(14px, 12px) scale(1);
          background: var(--job-section-background);
          padding: 0 3px;

          &.MuiInputLabel-shrink {
            transform: translate(14px, -5px) scale(0.75);
          }
        }

        .MuiOutlinedInput-input {
          padding: 10px;
          font-size: 14px;
          height: auto;
        }

        .MuiOutlinedInput-notchedOutline > legend {
          max-width: 0.01px;
        }

        .MuiCheckbox-root {
          padding: 0 5px 0 9px;
        }

        .MuiCheckbox-colorSecondary.Mui-checked {
          color: var(--blue-main-color);
        }

        .MuiRadio-colorSecondary.Mui-checked {
          color: var(--blue-main-color);
        }

        .MuiFormControlLabel-root .MuiTypography-body1 {
          font-size: 14px;
        }

        .MuiFormControlLabel-root {
          min-width: 70px;
        }

        .MuiTabs-root {
        }

        .MuiTabs-fixed {
          background: var(--blue-main-color);
        }

        .MuiTabs-indicator {
          display: none;
        }

        .form-tab-body {
          border: 2px solid var(--blue-main-color);
          border-top: none;
          padding: 25px 15px 10px;
        }

        .MuiTab-textColorPrimary {
          color: white;
        }

        .MuiTab-textColorPrimary.Mui-selected {
          color: var(--blue-main-color);
          background: var(--job-section-background);
          border: 2px solid var(--blue-main-color);
          border-bottom: none;
        }
      }
    }

    .main--job-step-footer {
      padding: 0 15px 20px;
      display: flex;
      justify-content: space-between;
      position: absolute;
      bottom: 0;
      width: calc(100% - 30px);

      .MuiButton-outlined {
        border-radius: 0;
        min-width: 130px;
      }

      .main--job-step-btn-next {
        background: var(--blue-main-color);
        color: white;

        &:hover {
          background-color: var(--blue-main-hover-color);
        }
      }

      .main--job-step-btn-next-other {
        background: var(--green-main-color);
        color: white;

        &:hover {
          background-color: var(--green-main-hover-color);
        }
      }
    }
  }

  .job-section--location {
    .main--job-dropon,
    .main--job-dropoff {
      flex: 1;
      padding: 0;
    }
  }

  .form-control-section {
    margin: 10px 0;
    .google-places-autocomplete {
      .google-places-autocomplete__suggestions-container {
        margin-top: -10px;
        background: var(--job-section-background);
        width: calc(100% - 2px);
        border: 1px solid var(--blue-main-color);
        cursor: pointer;
        .google-places-autocomplete__suggestion {
          font-size: 14px;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          border-bottom: 1px solid var(--blue-main-color);
        }
      }
    }
    .mapbox_autocomplete {
      position: relative;
      input {
        padding: 10px;
        font-size: 14px;
        height: auto;
        background: var(--job-section-background);
        margin-bottom: 10px;
        width: 100%;
        border: 1px solid lightgray;
        max-width: -webkit-fill-available;
      }
      input:focus {
        outline: 2px solid #3f51b5;
        box-sizing: inherit;
      }
      .react-geocoder-results {
        border: 1px solid var(--blue-main-color);
        margin-top: -10px;
        position: absolute;
        z-index: 3;
        background: var(--job-section-background);
        width: 100%;
        max-width: -webkit-fill-available;
        cursor: pointer;
        .react-geocoder-item {
          padding: 10px;
          font-size: 14px;
          font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
          border-bottom: 1px solid var(--blue-main-color);
          background: var(--job-section-background);
          width: 100%;
          max-width: -webkit-fill-available;
        }
      }
    }
  }

  .form-control-inline {
    display: flex;

    & > div {
      padding-left: 5px;
      padding-right: 5px;
      flex: 1;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        padding-right: 0;
      }
    }

    & > button {
      margin-left: 5px;
      margin-right: 5px;
      flex: 1;

      &:first-child {
        margin-left: 0;
      }

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .slick-track {
    display: flex;

    .slick-slide {
      flex: 1;
      float: none;
      height: auto;

      & > div {
        height: 100%;
      }
    }
  }

  @media (max-width: 830px) {
    max-width: 100%;
    min-width: 0;
    margin-right: 0;
    margin-bottom: 10px;
  }

  @media (max-width: 485px) {
    .main--job-section .main--job-body .main--job-step-body {
      padding-bottom: 103px;
    }

    .main--job-step-footer {
      flex-direction: column-reverse;

      .form-control-inline {
        margin-bottom: 10px;
      }
    }
  }
`;
