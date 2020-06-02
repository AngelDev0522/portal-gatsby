import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import { PergoTitle } from '../PergoTitle';
import { PergoTextField } from '../PergoTextField/PergoTextField';
import JobSectionContent from './JobSectionContent';
import { MapContext } from '../../context/mapContext/mapContextContainer';

const Step2 = ({ globalValues, onClickNext, onClickPrev, onClickMiddle }) => {
  const [values, setValues] = useState({
    distance: 0,
    ride_time: '',
    passenger: '',
    bags: '',
    vehicle_type: '',
    fair: '',
    tip: '',
    tip_percent: '',
    instruction: '',
  });

  const onHandleChange = (id, newValue) => {
    let tmpValues = Object.assign({}, values);
    tmpValues[id] = newValue;
    setValues(tmpValues);
  };

  const onNextStep = () => {
    onClickNext(values);
  };

  useEffect(() => {
    let tmpValues = Object.assign({}, values);
    tmpValues['distance'] = globalValues.distance;
    tmpValues['ride_time'] = globalValues.ride_time;
    setValues(tmpValues);
  }, [globalValues]);

  return (
    <StepContent
      title={'Job Detail'}
      prevButton={{
        onClick: onClickPrev,
        label: 'Back',
      }}
      middleButton={{
        onClick: onClickMiddle,
        label: 'Dispatch',
      }}
      nextButton={{
        onClick: onNextStep,
        label: 'Reservation',
      }}
    >
      <div className="form-control-inline">
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Passengers</InputLabel>
          <Select defaultValue={1} onChange={e => onHandleChange('passengers', e.target.value)}>
            {new Array(20).fill(0, 0, 20).map((item, index) => (
              <MenuItem value={index + 1} key={index}>{`${index + 1} passenger${
                index > 0 ? 's' : ''
              }`}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Bags</InputLabel>
          <Select defaultValue={0} onChange={e => onHandleChange('bags', e.target.value)}>
            <MenuItem value={0}>No Luggage</MenuItem>
            {new Array(6).fill(0, 0, 6).map((item, index) => (
              <MenuItem value={index + 1} key={index}>{`${index + 1} bag${
                index > 0 ? 's' : ''
              }`}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className="form-control-inline form-control-section">
        <PergoTextField
          label="Distance"
          value={values.distance + ' miles'}
          InputProps={{ readOnly: true }}
        />
        <PergoTextField
          label="Estimated Time"
          value={values.ride_time}
          InputProps={{ readOnly: true }}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Vehicle Type</InputLabel>
          <Select defaultValue={0} onChange={e => onHandleChange('vehicle_type', e.target.value)}>
            <MenuItem value={0}>Any</MenuItem>
            <MenuItem value={1}>Taxi</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="form-control-inline form-control-section">
        <PergoTextField id="fair" label="Fair $" type="currency" handleChange={onHandleChange} />

        <div className="form-control-inline ">
          <PergoTextField
            id="tip"
            label="Tip $"
            type="currency"
            style={{ flex: 2 }}
            handleChange={onHandleChange}
          />
          <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-age-native-simple">Tip %</InputLabel>
            <Select defaultValue={0} onChange={e => onHandleChange('tip_percent', e.target.value)}>
              <MenuItem value={5}>5%</MenuItem>
              <MenuItem value={10}>10%</MenuItem>
              <MenuItem value={15}>15%</MenuItem>
              <MenuItem value={20}>20%</MenuItem>
              <MenuItem value={25}>25%</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      <div className="">
        <PergoTextField
          id="instruction"
          label="Driver Instructions"
          multiline
          rows="3"
          handleChange={onHandleChange}
        />
      </div>

      <div className="form-control-section">
        <FormControlLabel
          control={
            <Checkbox onChange={e => onHandleChange('send_text_update', e.target.checked)} />
          }
          label="Send Text Updates"
        />
      </div>
    </StepContent>
  );
};

export default Step2;

const StepContent = styled(JobSectionContent)``;
