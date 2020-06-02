import React, { useRef, useContext, useState, useEffect } from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from 'react-google-maps';
import { MapContext } from '../../context/mapContext/mapContextContainer';

const AsyncMap = props => {
  const mapRef = useRef(null);
  const [directions, setDirections] = useState(null);
  const { mapData } = useContext(MapContext);
  useEffect(() => {
    const directionsService = new window.google.maps.DirectionsService();
    const origin = { lat: mapData.pickup_lat, lng: mapData.pickup_lng };
    const destination = { lat: mapData.dropoff_lat, lng: mapData.dropoff_lng };
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [mapData]);
  if (mapRef.current) {
    const bounds = new window.google.maps.LatLngBounds();
    const markerLoc1 = new window.google.maps.LatLng(mapData.pickup_lat, mapData.pickup_lng);
    const markerLoc2 = new window.google.maps.LatLng(mapData.dropoff_lat, mapData.dropoff_lng);
    bounds.extend(markerLoc1);
    bounds.extend(markerLoc2);
    mapRef.current.fitBounds(bounds);
    mapRef.current.panToBounds(bounds);
  }
  return (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: mapData.pickup_lat, lng: mapData.pickup_lng }}
      ref={mapRef}
    >
      {directions && (
        <DirectionsRenderer
          directions={directions}
          options={{
            polylineOptions: { strokeColor: 'green' },
            suppressMarkers: true,
          }}
        />
      )}
      {!(mapData.pickup_lat === 0 && mapData.pickup_lng === 0) && (
        <Marker
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/red.png',
            scaledSize: new window.google.maps.Size(32, 32),
          }}
          name={'Dolores park1'}
          position={{ lat: mapData.pickup_lat, lng: mapData.pickup_lng }}
        />
      )}
      {!(mapData.dropoff_lat === 0 && mapData.dropoff_lng === 0) && (
        <Marker
          icon={{
            url: 'http://maps.google.com/mapfiles/ms/icons/blue.png',
            scaledSize: new window.google.maps.Size(32, 32),
          }}
          name={'Dolores park2'}
          position={{ lat: mapData.dropoff_lat, lng: mapData.dropoff_lng }}
        />
      )}
    </GoogleMap>
  );
};

export default withScriptjs(withGoogleMap(AsyncMap));
