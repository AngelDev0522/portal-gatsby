import React, { useState } from 'react';

const MapContext = React.createContext(null);
export { MapContext };

const MapContextContainer = props => {
  const initValues = {
    zoom: 8,
    pickup_lat: 0,
    pickup_lng: 0,
    dropoff_lat: 0,
    dropoff_lng: 0,
  };
  const [mapData, setData] = useState(initValues);

  const setMapData = req => {
    setData({ ...req });
  };

  return (
    <MapContext.Provider
      value={{
        mapData,
        setMapData,
      }}
    >
      {props.children}
    </MapContext.Provider>
  );
};

export default MapContextContainer;
