import React, { useEffect, useRef, useState } from 'react';
import Listings from "./containers/Listings";
import Home from "./containers/Home";
import './App.css';
import {
  defaultAdminLevelData,
  fetchMashvisor,
  fetchRealtyMole,
  fetchRealtor,
  getGeocodeByPlaceId,
  getAgencies,
  loadScript,
} from './utils';


function App() {
  const [location, setLocation] = useState(null);
  const [fetchingData, setFetchingData] = useState(false);
  const [adminLevelData, setAdminLevelData] = useState({ ...defaultAdminLevelData });
  const [properties, setProperties] = useState([])
  const [agencies, setAgencies] = useState([])

  const loaded = useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }
    loaded.current = true;
  }

  useEffect(() => {
    if (location && location.place_id) {
      setProperties([])
      setAgencies([])
      getGeocodeByPlaceId(location.place_id).then(response => {
       getAgencies(response[0].geometry.location)
       .then(setAgencies)
        const locationSpecs = location.description.split(', ').reverse();
        const fullAddress = response[0].formatted_address || '';

        setAdminLevelData({
          state: locationSpecs[1] || '',
          city: locationSpecs[2] || '',
          address: locationSpecs[3] || '',
          address2: locationSpecs[4] || '',
          fullAddress,
          page: 1
        });
      })
    }
  }, [location])

  const fetchProperties = async () => {
    if (adminLevelData.state) {
      try {
        setFetchingData(true);
        const requests = [fetchRealtor(adminLevelData), fetchMashvisor(adminLevelData), fetchRealtyMole(adminLevelData)]
        await Promise.allSettled(requests).then((propertiesGroup) => {
          let fetchedProperties = [];
          propertiesGroup
            .forEach(({ status, value }) => {
              if (status === 'fulfilled') {
                fetchedProperties = [...fetchedProperties, ...value]
              }
            })
          setProperties([...properties, ...fetchedProperties])
        })
        setFetchingData(false);
      } catch (error) {
        // handle Catch
        setFetchingData(false);
      }
    }
  }

  const handleLoadMore = () => {
    setAdminLevelData({
      ...adminLevelData,
      page: adminLevelData.page + 1
    })
  }
  useEffect(() => { fetchProperties() }, [adminLevelData])

  return (
    <div className="App">
      {
        adminLevelData.state ? (
          <Listings
            fetching={fetchingData}
            onLoadMore={handleLoadMore}
            onLocationChange={setLocation}
            properties={properties}
            agencies={agencies}
            selectedLocation={location}
          />
        ) : (
            <Home onLocationChange={setLocation} selectedLocation={location} />
          )
      }
    </div>
  );
}

export default App;
