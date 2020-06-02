import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import { PergoTitle } from '../PergoTitle';
import img_tmp_map from '../../images/tmp-map.png';
import AsyncMap from './AsyncMap';
import ReactMapboxGl, { Marker, Layer, Feature } from 'react-mapbox-gl';
import { MapContext } from '../../context/mapContext/mapContextContainer';
import RedIcon from '../../images/red.png';
import BlueIcon from '../../images/blue.png';
const MapSection = ({ mapType }) => {
  const [directions, setDirections] = useState(null);
  const { mapData } = useContext(MapContext);

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoicGVyZ29sb2NhdGlvbnMiLCJhIjoiY2pzdGpjZjZlMjQ1YzN5bjV3c3gwcjY2NyJ9.Ro4U1wf7jwBXkYpPK-vBdg',
  });

  const fitBounds = [
    [parseFloat(mapData.pickup_lng), parseFloat(mapData.pickup_lat)],
    [parseFloat(mapData.dropoff_lng), parseFloat(mapData.dropoff_lat)],
  ];

  async function getDirections() {
    const Location1Str = mapData.pickup_lng + ',' + mapData.pickup_lat;
    const Location2Str = mapData.dropoff_lng + ',' + mapData.dropoff_lat;
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    let mapbox_directionUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${Location1Str};${Location2Str}?access_token=pk.eyJ1IjoicGVyZ29sb2NhdGlvbnMiLCJhIjoiY2pzdGpjZjZlMjQ1YzN5bjV3c3gwcjY2NyJ9.Ro4U1wf7jwBXkYpPK-vBdg&alternatives=false&geometries=geojson&steps=true`;
    let fetchResult = await fetch(proxyurl + mapbox_directionUrl);
    let Result = await fetchResult.json();
    setDirections(Result.routes[0].geometry.coordinates);
  }
  useEffect(() => {
    if (
      (mapData.pickup_lat === 0 && mapData.pickup_lng === 0) ||
      (mapData.dropoff_lat === 0 && mapData.dropoff_lng === 0)
    )
      return;
    getDirections();
  }, [mapData.pickup_lat, mapData.pickup_lng, mapData.dropoff_lat, mapData.dropoff_lng]);
  return (
    <MapSectionWrapper tmpMapImg={img_tmp_map}>
      <Paper className="main--map-section" elevation={3} square>
        <PergoTitle className="main--map-title">Job Map</PergoTitle>
        <div className="main--map-body">
          {mapType === 'GoogleAPI' && (
            <AsyncMap
              googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBpquE3lVWW1UIoZ7NT0NdCljs_exOx-Co&v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          )}
          {mapType === 'MapBox' &&
            (((mapData.pickup_lat !== 0 || mapData.pickup_lng !== 0) &&
              (mapData.dropoff_lat !== 0 || mapData.dropoff_lng !== 0) &&
              directions) ||
              mapData.pickup_lat === 0 ||
              mapData.pickup_lng === 0 ||
              mapData.dropoff_lat === 0 ||
              mapData.dropoff_lng === 0) && (
              <Map
                style="mapbox://styles/mapbox/streets-v9"
                fitBounds={fitBounds}
                fitBoundsOptions={{
                  padding: { top: 80, bottom: 80, left: 80, right: 80 },
                }}
                containerStyle={{
                  height: '100%',
                  width: '100%',
                }}
              >
                {!(mapData.pickup_lat === 0 && mapData.pickup_lng === 0) && (
                  <Marker coordinates={[mapData.pickup_lng, mapData.pickup_lat]} anchor="bottom">
                    <img src={RedIcon} />
                  </Marker>
                )}
                {!(mapData.dropoff_lat === 0 && mapData.dropoff_lng === 0) && (
                  <Marker coordinates={[mapData.dropoff_lng, mapData.dropoff_lat]} anchor="bottom">
                    <img src={BlueIcon} />
                  </Marker>
                )}
                {directions && (
                  <Layer
                    type="line"
                    layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                    paint={{ 'line-color': '#4790E5', 'line-width': 12 }}
                  >
                    <Feature coordinates={directions} />
                  </Layer>
                )}
              </Map>
            )}
          <div className="map_legend">
            <div className="map_icon_container">
              <img
                alt=""
                className="map_icon"
                src="http://maps.google.com/mapfiles/ms/icons/red.png"
              />
              <p>Pickup</p>
            </div>
            <div className="map_icon_container">
              <img
                alt=""
                className="map_icon"
                src="http://maps.google.com/mapfiles/ms/icons/blue.png"
              />
              <p>Dropoff</p>
            </div>
          </div>
        </div>
      </Paper>
    </MapSectionWrapper>
  );
};

export default MapSection;

const MapSectionWrapper = styled.div`
    flex: auto;
    display: flex;

    .main--map-section {
        flex: auto;
        margin-right: 10px;

        border: 2px solid var(--green-main-color);
        height: 100%;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;

        .main--map-title {
            background: var(--green-main-color);
            font-size: 16px;
            padding: 15px 10px;
        }

        .main--map-body {
            height: 100%;
            position: relative;
            .map_legend {
                width: 100px;
                height: 100px;
                background-color: white;
                position: absolute;
                bottom: 20px;
                right: 60px;
                border: 1px solid black;
                .map_icon_container {
                    display: flex;
                    .map_icon {
                        width: 32px; 
                        height: 32px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        margin: 10px 5px;
                    }
                    p {
                        font-size: 14px;
                        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
                    }
                }
            }
        }
    }
    @media (max-width: 1299px) {
        flex-direction: column;

        .main--map-section {
            margin-right: 0;
            margin-bottom: 10px;
        }

        .main--driver-section {
        max-width: 100%;
        max-height: 160px;

        .main--driver-body {
            .main--driver-layout-button {
            display: none;
            }
        }
    }
    @media (max-width: 830px) {
        .main--map-section {
            height: 400px;
        }

        .main--driver-section {
            .main--driver-body {
            }
        }
    }
`;
