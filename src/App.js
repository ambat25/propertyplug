import React, { useEffect, useRef, useState } from 'react';
import Listings from "./containers/Listings";
import Home from "./containers/Home";
import './App.css';
import {
  getGeocodeByPlaceId,
  fetchMashvisor,
  fetchRealtor,
  fetchRealtyMole
} from './utils';

function loadScript(src, position, id) {
  if (!position) {
    return;
  }
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const defaultAdminLevelData = {
  state: '',
  city: '',
  address: '',
  address2: '',
  fullAddress: '',
  page: 1,
}

function App() {
  const [location, setLocation] = useState({});
  const [adminLevelData, setAdminLevelData] = useState({ ...defaultAdminLevelData });
  const [properties, setProperties] = useState([])

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
      getGeocodeByPlaceId(location.place_id).then(response => {
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
        const requests = [fetchRealtor(adminLevelData), fetchMashvisor(adminLevelData), fetchRealtyMole(adminLevelData)]
        Promise.allSettled(requests).then((propertiesGroup) => {
          let fetchedProperties = [];
          propertiesGroup
            .forEach(({ status, value }) => {
              if (status === 'fulfilled') {
                fetchedProperties = [...fetchedProperties, ...value]
              }
            })
          setProperties([...properties, ...fetchedProperties])
        })
      } catch (error) {
        // handle Catch
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
          <Listings properties={properties} onLocationChange={setLocation} onLoadMore={handleLoadMore} />
        ) : (
            <Home onLocationChange={setLocation} />
          )
      }
    </div>
  );
}

export default App;
