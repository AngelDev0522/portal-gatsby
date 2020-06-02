import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker,
  KeyboardDateTimePicker,
} from '@material-ui/pickers';
import 'date-fns';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';

import { PergoTextField } from '../PergoTextField/PergoTextField';
import JobSectionContent from './JobSectionContent';

const Step4 = ({ globalValues, onClickNext, onClickPrev }) => {
  const [values, setValues] = useState({
    distance: 0,
    fair: '',
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
  });

  const setIsReturn = value => {
    let tmpValues = Object.assign({}, values);
    tmpValues['is_return'] = value;
    setValues(tmpValues);
  };

  const setJobTab = value => {
    let tmpValues = Object.assign({}, values);
    tmpValues['is_recurring'] = value === 0 ? false : true;
    setValues(tmpValues);
  };

  const radioHandleChange = event => {
    let tmpValues = Object.assign({}, values);
    if (event.target.value === 'true')
      tmpValues['is_weekly'] = event.target.value === 'true' ? true : false;
    else {
      tmpValues['is_weekly'] = false;
      tmpValues['week_days'] = '';
    }
    setValues(tmpValues);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography component="div" role="tabpanel" hidden={value !== index} {...other}>
        {value === index && <div className="form-tab-body">{children}</div>}
      </Typography>
    );
  }

  const handleDateChange = (id, date) => {
    let tmpValues = Object.assign({}, values);
    tmpValues[id] = date;
    setValues(tmpValues);
  };

  const onHandleChange = (id, newValue) => {
    let tmpValues = Object.assign({}, values);
    tmpValues[id] = newValue;
    setValues(tmpValues);
  };

  const onHandleDayChange = (id, value) => {
    let tmpValues = Object.assign({}, values);
    if (value) {
      var contain = false;
      for (let i = 0; i < tmpValues['week_days'].length; i++) {
        if (parseInt(tmpValues['week_days'].charAt(i)) > parseInt(id)) {
          tmpValues['week_days'] = tmpValues['week_days'].replace(
            tmpValues['week_days'].charAt(i),
            id + tmpValues['week_days'].charAt(i)
          );
          contain = true;
          break;
        }
      }
      if (tmpValues['week_days'].length === 0 || !contain) {
        tmpValues['week_days'] += id;
      }
    } else {
      tmpValues['week_days'] = tmpValues['week_days'].replace(id, '');
    }
    setValues(tmpValues);
  };

  const onNextStep = () => {
    onClickNext(values);
  };

  useEffect(() => {
    let tmpValues = Object.assign({}, values);
    tmpValues['fair'] = globalValues.fair;
    tmpValues['distance'] = globalValues.distance;
    setValues(tmpValues);
  }, [globalValues]);
  return (
    <StepContent
      title={'Reservation'}
      prevButton={{
        onClick: onClickPrev,
        label: 'Back',
      }}
      nextButton={{
        onClick: onNextStep,
        label: 'Reservation',
      }}
    >
      <PergoTextField label="Distance (Miles)" value={values.distance} readonly />
      <div className="form-control-inline ">
        <PergoTextField label="Fare" value={values.fair} type="currency" readonly />
        <PergoTextField label="Total" value={`5000`} type="currency" readonly />
        <PergoTextField label="Balance" value={`800`} type="currency" readonly />
      </div>

      <div className="form-control-section">
        <Tabs
          textColor="primary"
          value={values.is_recurring == false ? 0 : 1}
          onChange={(event, newValue) => {
            setJobTab(newValue);
          }}
        >
          <Tab label="One Time" />
          <Tab label="Recurring" />
        </Tabs>
        <TabPanel value={values.is_recurring == false ? 0 : 1} index={0}>
          <div className="form-control-inline ">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                inputVariant="outlined"
                format="yyyy/MM/dd HH:mm"
                ampm={true}
                label="Pickup Time"
                value={values.pickup_time}
                onChange={e => handleDateChange('pickup_time', e)}
                style={{ flex: 2 }}
              />
            </MuiPickersUtilsProvider>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">Reserve Ahead</InputLabel>
              <Select
                value={values.reserve_ahead}
                onChange={e => onHandleChange('reserve_ahead', e.target.value)}
              >
                <MenuItem value={0}>00:00</MenuItem>
                <MenuItem value={5}>00:05</MenuItem>
                <MenuItem value={10}>00:10</MenuItem>
                <MenuItem value={15}>00:15</MenuItem>
                <MenuItem value={20}>00:20</MenuItem>
                <MenuItem value={25}>00:25</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="form-control-inline ">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDateTimePicker
                inputVariant="outlined"
                format="yyyy/MM/dd HH:mm"
                ampm={true}
                label="Return"
                value={values.return_time}
                onChange={e => handleDateChange('return_time', e)}
                InputProps={{ disabled: !values.is_return }}
                style={{ flex: 2 }}
              />
            </MuiPickersUtilsProvider>
            <div style={{ display: 'flex', marginBottom: 10 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.is_return}
                    onChange={val => {
                      setIsReturn(val.target.checked);
                    }}
                  />
                }
                label="Return"
              />
            </div>
          </div>

          <div className="form-control-inline ">
            <FormControl variant="outlined" style={{ flex: 2 }}>
              <InputLabel htmlFor="outlined-age-native-simple">Assign Driver</InputLabel>
              <Select
                value={values.driver}
                onChange={e => onHandleChange('driver', e.target.value)}
              >
                <MenuItem value={1}>(325) 342-5234, Lionel Messi</MenuItem>
                <MenuItem value={2}>(634) 673-4236, Jack Smith</MenuItem>
              </Select>
            </FormControl>
            <div></div>
          </div>
        </TabPanel>
        <TabPanel value={values.is_recurring == false ? 0 : 1} index={1}>
          <div className="form-control-inline ">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardTimePicker
                inputVariant="outlined"
                format="HH:mm"
                ampm={true}
                label="Pickup Time"
                value={values.pickup_time}
                onChange={e => handleDateChange('pickup_time', e)}
                style={{ flex: 2 }}
              />
            </MuiPickersUtilsProvider>
            <FormControl variant="outlined">
              <InputLabel htmlFor="outlined-age-native-simple">Reserve Ahead</InputLabel>
              <Select
                value={values.reserve_ahead}
                onChange={e => onHandleChange('reserve_ahead', e.target.value)}
              >
                <MenuItem value={0}>00:00</MenuItem>
                <MenuItem value={5}>00:05</MenuItem>
                <MenuItem value={10}>00:10</MenuItem>
                <MenuItem value={15}>00:15</MenuItem>
                <MenuItem value={20}>00:20</MenuItem>
                <MenuItem value={25}>00:25</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="form-control-inline ">
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="outlined"
                format="yyyy/MM/dd HH:mm"
                ampm={true}
                label="Starting"
                value={values.start_date}
                onChange={e => handleDateChange('start_date', e)}
              />
            </MuiPickersUtilsProvider>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                inputVariant="outlined"
                format="yyyy/MM/dd HH:mm"
                ampm={true}
                label="Until"
                value={values.end_date}
                onChange={e => handleDateChange('end_date', e)}
              />
            </MuiPickersUtilsProvider>
          </div>

          <div className="form-control-inline ">
            <RadioGroup row name="Repeat" value={values.is_weekly} onChange={radioHandleChange}>
              <FormControlLabel control={<Radio />} value={false} label="Every Day" />
              <FormControlLabel control={<Radio />} value={true} label="Weekly" />
            </RadioGroup>
          </div>

          {values.is_weekly === true && (
            <FormGroup aria-label="position" row>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.week_days.indexOf('1') >= 0 ? true : false}
                    onChange={e => onHandleDayChange('1', e.target.checked)}
                  />
                }
                label="Mon"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.week_days.indexOf('2') >= 0 ? true : false}
                    onChange={e => onHandleDayChange('2', e.target.checked)}
                  />
                }
                label="Tue"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.week_days.indexOf('3') >= 0 ? true : false}
                    onChange={e => onHandleDayChange('3', e.target.checked)}
                  />
                }
                label="Wed"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.week_days.indexOf('4') >= 0 ? true : false}
                    onChange={e => onHandleDayChange('4', e.target.checked)}
                  />
                }
                label="Thu"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.week_days.indexOf('5') >= 0 ? true : false}
                    onChange={e => onHandleDayChange('5', e.target.checked)}
                  />
                }
                label="Fri"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.week_days.indexOf('6') >= 0 ? true : false}
                    onChange={e => onHandleDayChange('6', e.target.checked)}
                  />
                }
                label="Sat"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.week_days.indexOf('7') >= 0 ? true : false}
                    onChange={e => onHandleDayChange('7', e.target.checked)}
                  />
                }
                label="Sun"
              />
            </FormGroup>
          )}
        </TabPanel>
      </div>
    </StepContent>
  );
};

export default Step4;

const StepContent = styled(JobSectionContent)``;
