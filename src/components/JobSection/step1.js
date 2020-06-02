import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Autocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import 'react-google-places-autocomplete/dist/index.min.css';
import Geocoder from 'react-mapbox-gl-geocoder';

import { PergoTextField } from '../PergoTextField/PergoTextField';
import JobSectionContent from './JobSectionContent';
import { MapContext } from '../../context/mapContext/mapContextContainer';

const Step1 = ({ globalValues, onClickNext, onClickPrev, mapType }) => {
  const [values, setValues] = useState({
    pickup_place_name: globalValues['pickup_place_name'],
    pickup_address: globalValues['pickup_address'],
    pickup_suite: globalValues['pickup_suite'],
    pickup_city: globalValues['pickup_city'],
    pickup_state: globalValues['pickup_state'],
    pickup_zip: globalValues['pickup_zip'],
    pickup_lat: globalValues['pickup_lat'],
    pickup_lng: globalValues['pickup_lng'],
    dropoff_place_name: globalValues['dropoff_place_name'],
    dropoff_address: globalValues['dropoff_address'],
    dropoff_suite: globalValues['dropoff_suite'],
    dropoff_city: globalValues['dropoff_city'],
    dropoff_state: globalValues['dropoff_state'],
    dropoff_zip: globalValues['dropoff_zip'],
    dropoff_lat: globalValues['dropoff_lat'],
    dropoff_lng: globalValues['dropoff_lng'],
    distance: globalValues['distance'],
    ride_time: globalValues['ride_time'],
  });

  const [loading, setLoading] = useState(false);

  const { mapData, setMapData } = useContext(MapContext);

  async function getDistance(lat1, lng1, lat2, lng2) {
    if ((lat1 === 0 && lng1 === 0) || (lat2 === 0 && lng2 === 0)) return 0;
    const Location1Str = lat1 + ',' + lng1;
    const Location2Str = lat2 + ',' + lng2;

    let ApiURL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&';

    let params = `origins=${Location1Str}&destinations=${Location2Str}&key=${'AIzaSyBpquE3lVWW1UIoZ7NT0NdCljs_exOx-Co'}`; // you need to get a key
    let finalApiURL = `${ApiURL}${encodeURI(params)}`;
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    let fetchResult = await fetch(proxyurl + finalApiURL); // call API
    let Result = await fetchResult.json(); // extract json
    // return Result.rows[0].elements[0]/1609.34;
    return {
      distance: Number(Result.rows[0].elements[0].distance.value / 1609.34).toFixed(2),
      ride_time: Result.rows[0].elements[0].duration.text,
    };
  }

  const onPickupSelected = place => {
    geocodeByAddress(place.description).then(results => {
      getLatLng(results[0]).then(({ lat, lng }) => {
        let tmpValues = Object.assign({}, values);
        tmpValues['pickup_city'] = '';
        tmpValues['pickup_state'] = '';
        tmpValues['pickup_address'] = '';
        tmpValues['pickup_place_name'] = '';
        tmpValues['pickup_zip'] = '';
        for (var i = 0; i < results[0].address_components.length; i++) {
          if (results[0].address_components[i].types[0]) {
            if ('locality' === results[0].address_components[i].types[0])
              tmpValues['pickup_city'] = results[0].address_components[i].long_name;
            else if ('street_number' === results[0].address_components[i].types[0])
              tmpValues['pickup_address'] = results[0].address_components[i].long_name + ' ';
            else if ('route' === results[0].address_components[i].types[0])
              tmpValues['pickup_place_name'] += results[0].address_components[i].long_name;
            else if ('administrative_area_level_1' === results[0].address_components[i].types[0])
              tmpValues['pickup_state'] = results[0].address_components[i].long_name;
            else if ('postal_code' === results[0].address_components[i].types[0])
              tmpValues['pickup_zip'] = results[0].address_components[i].long_name;
          }
        }
        tmpValues['pickup_lat'] = lat;
        tmpValues['pickup_lng'] = lng;

        setValues(tmpValues);
        setLoading(false);
      });
    });
  };
  const onMapBoxPickupSelected = (viewport, item) => {
    let tmpValues = Object.assign({}, values);
    tmpValues['pickup_city'] = '';
    tmpValues['pickup_state'] = '';
    tmpValues['pickup_address'] = '';
    tmpValues['pickup_place_name'] = '';
    tmpValues['pickup_zip'] = '';
    tmpValues['pickup_lat'] = viewport.latitude;
    tmpValues['pickup_lng'] = viewport.longitude;
    tmpValues['pickup_address'] = item.text;
    for (var i = 0; i < item.context.length; i++) {
      if (item.context[i].id.includes('postcode')) tmpValues['pickup_zip'] = item.context[i].text;
      else if (item.context[i].id.includes('place'))
        tmpValues['pickup_city'] = item.context[i].text;
      else if (item.context[i].id.includes('region'))
        tmpValues['pickup_state'] = item.context[i].text;
    }
    if (item.properties.address) tmpValues['pickup_place_name'] += item.properties.address;

    setValues(tmpValues);
    setLoading(false);
  };

  const onDropoffSelected = place => {
    geocodeByAddress(place.description).then(results => {
      getLatLng(results[0]).then(({ lat, lng }) => {
        let tmpValues = Object.assign({}, values);
        tmpValues['dropoff_city'] = '';
        tmpValues['dropoff_state'] = '';
        tmpValues['dropoff_address'] = '';
        tmpValues['dropoff_place_name'] = '';
        tmpValues['dropoff_zip'] = '';
        for (var i = 0; i < results[0].address_components.length; i++) {
          if (results[0].address_components[i].types[0]) {
            if ('locality' === results[0].address_components[i].types[0])
              tmpValues['dropoff_city'] = results[0].address_components[i].long_name;
            else if ('street_number' === results[0].address_components[i].types[0])
              tmpValues['dropoff_address'] = results[0].address_components[i].long_name + ' ';
            else if ('route' === results[0].address_components[i].types[0])
              tmpValues['dropoff_place_name'] += results[0].address_components[i].long_name;
            else if ('administrative_area_level_1' === results[0].address_components[i].types[0])
              tmpValues['dropoff_state'] = results[0].address_components[i].long_name;
            else if ('postal_code' === results[0].address_components[i].types[0])
              tmpValues['dropoff_zip'] = results[0].address_components[i].long_name;
          }
        }
        tmpValues['dropoff_lat'] = lat;
        tmpValues['dropoff_lng'] = lng;
        setValues(tmpValues);
        setLoading(false);
      });
    });
  };
  const onMapBoxDropoffSelected = (viewport, item) => {
    let tmpValues = Object.assign({}, values);
    tmpValues['dropoff_city'] = '';
    tmpValues['dropoff_state'] = '';
    tmpValues['dropoff_address'] = '';
    tmpValues['dropoff_place_name'] = '';
    tmpValues['dropoff_zip'] = '';
    tmpValues['dropoff_lat'] = viewport.latitude;
    tmpValues['dropoff_lng'] = viewport.longitude;
    tmpValues['dropoff_address'] = item.text;
    for (var i = 0; i < item.context.length; i++) {
      if (item.context[i].id.includes('postcode')) tmpValues['dropoff_zip'] = item.context[i].text;
      else if (item.context[i].id.includes('place'))
        tmpValues['dropoff_city'] = item.context[i].text;
      else if (item.context[i].id.includes('region'))
        tmpValues['dropoff_state'] = item.context[i].text;
    }
    if (item.properties.address) tmpValues['dropoff_place_name'] += item.properties.address;
    setValues(tmpValues);
    setLoading(false);
  };

  const onNextStep = () => {
    if (loading) onClickNext(values);
  };

  useEffect(() => {
    let tmpContext = Object.assign({}, mapData);
    tmpContext.pickup_lat = values['pickup_lat'];
    tmpContext.pickup_lng = values['pickup_lng'];
    tmpContext.dropoff_lat = values['dropoff_lat'];
    tmpContext.dropoff_lng = values['dropoff_lng'];
    setMapData(tmpContext);
    let tmpValues = Object.assign({}, values);
    getDistance(
      tmpValues['dropoff_lat'],
      tmpValues['dropoff_lng'],
      tmpValues['pickup_lat'],
      tmpValues['pickup_lng']
    )
      .then(result => {
        if (result === 0) {
          tmpValues['distance'] = 0;
          tmpValues['ride_time'] = '';
        } else {
          tmpValues['distance'] = result.distance;
          tmpValues['ride_time'] = result.ride_time;
        }
        setValues(tmpValues);
        setLoading(true);
      })
      .catch(err => {
        console.log('err', err);
      });
  }, [values['dropoff_lat'], values['pickup_lat']]);

  return (
    <StepContent
      title={'Location'}
      className="job-section--location"
      prevButton={{
        onClick: onClickPrev,
        label: 'Back',
      }}
      nextButton={{
        onClick: onNextStep,
        label: 'Next',
      }}
    >
      <div className="form-control-inline">
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Previous Pickup</InputLabel>
          <Select>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>4037 N Monroe St</MenuItem>
            <MenuItem value={20}>Bond Westside</MenuItem>
            <MenuItem value={30}>441 Washington St</MenuItem>
          </Select>
        </FormControl>
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Dropoff Pickup</InputLabel>
          <Select>
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>4037 N Monroe St</MenuItem>
            <MenuItem value={20}>Bond Westside</MenuItem>
            <MenuItem value={30}>441 Washington St</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="form-control-section">
        {mapType === 'GoogleAPI' && (
          <Autocomplete
            renderInput={props => (
              <div className="custom-wrapper">
                <PergoTextField label="Pickup Address Search" style={{ flex: 3 }} {...props} />
              </div>
            )}
            onSelect={onPickupSelected}
          />
        )}
        {mapType === 'MapBox' && (
          <Geocoder
            className="mapbox_autocomplete"
            updateInputOnSelect={true}
            value={''}
            mapboxApiAccessToken="pk.eyJ1IjoicGVyZ29sb2NhdGlvbnMiLCJhIjoiY2pzdGpjZjZlMjQ1YzN5bjV3c3gwcjY2NyJ9.Ro4U1wf7jwBXkYpPK-vBdg"
            onSelected={onMapBoxPickupSelected}
          />
        )}
        <div className="form-control-inline">
          <div className="form-control-inline" style={{ flex: 3 }}>
            <PergoTextField label="Name" value={values['pickup_address']} />
            <PergoTextField label="Address" value={values['pickup_place_name']} />
          </div>
          <PergoTextField label="Suite/Apt" style={{ flex: 1 }} />
        </div>

        <div className="form-control-inline">
          <div className="form-control-inline" style={{ flex: 3 }}>
            <PergoTextField label="City" style={{ flex: 2 }} value={values['pickup_city']} />
            <PergoTextField label="State" style={{ flex: 1 }} value={values['pickup_state']} />
          </div>
          <PergoTextField label="Zip Code" style={{ flex: 1 }} value={values['pickup_zip']} />
        </div>
      </div>

      <div className="form-control-section">
        {mapType === 'GoogleAPI' && (
          <Autocomplete
            renderInput={props => (
              <div className="custom-wrapper">
                <PergoTextField label="Dropoff Address Search" style={{ flex: 3 }} {...props} />
              </div>
            )}
            onSelect={onDropoffSelected}
          />
        )}
        {mapType === 'MapBox' && (
          <Geocoder
            className="mapbox_autocomplete"
            updateInputOnSelect={true}
            mapboxApiAccessToken="pk.eyJ1IjoicGVyZ29sb2NhdGlvbnMiLCJhIjoiY2pzdGpjZjZlMjQ1YzN5bjV3c3gwcjY2NyJ9.Ro4U1wf7jwBXkYpPK-vBdg"
            onSelected={onMapBoxDropoffSelected}
          />
        )}
        <div className="form-control-inline">
          <div className="form-control-inline" style={{ flex: 3 }}>
            <PergoTextField label="Name" value={values['dropoff_address']} />
            <PergoTextField label="Address" value={values['dropoff_place_name']} />
          </div>
          <PergoTextField label="Suite/Apt" style={{ flex: 1 }} />
        </div>

        <div className="form-control-inline">
          <div className="form-control-inline" style={{ flex: 3 }}>
            <PergoTextField label="City" style={{ flex: 2 }} value={values['dropoff_city']} />
            <PergoTextField label="State" style={{ flex: 1 }} value={values['dropoff_state']} />
          </div>
          <PergoTextField label="Zip Code" style={{ flex: 1 }} value={values['dropoff_zip']} />
        </div>
      </div>
    </StepContent>
  );
};

export default Step1;

const StepContent = styled(JobSectionContent)``;
