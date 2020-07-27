import axios from 'axios';

export const getGeocodeByPlaceId = placeId => {
  const geocoder = new window.google.maps.Geocoder();
  const OK = window.google.maps.GeocoderStatus.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== OK) {
        reject(status);
      }
      resolve(results);
    });
  });
};

export const parseMashvisorResponse = (response) => {
  const summary = { ...response.content, properties: undefined };
  const properties = response.content.properties.map(property => {
    const address = `
    ${property.name ? `${property.name}, `: ''}
    ${property.airbnb_neighborhood ? `${property.airbnb_neighborhood}, `: ''}
    ${property.airbnb_city ? `${property.airbnb_city}, `: ''}
    ${property.state} ${property.zip}
    `;
    return ({
    active: property.status === 'ACTIVE',
    address,
    bathrooms: property.num_of_baths,
    beds: property.num_of_beds,
    id: `m-${property.property_id}`,
    image: property.image.split('?')[0],
    lat: property.lat,
    lon: property.lon,
    monthlyPrice: property.monthly_price,
    nightPrice: property.night_price,
    rooms: property.num_of_rooms,
    source: 'Mashvisor',
    type: property.property_type,
    traditional: false,
    url: '',
    website: `https://www.mashvisor.com/`,
    weeklyPrice: property.weekly_price,
  })
});
  return { properties, summary }
}

export const parseRealtorResponse = (response) => {
  const summary = { ...response.meta };
  const properties = response.properties.map(property => ({
    active: property.listing_status === 'active',
    address: `
    ${property.address.line ? `${property.address.line}, ` : ''}
    ${property.address.neighborhood_name ? `${property.address.neighborhood_name}, ` : ''}
    ${property.address.city ? `${property.address.city}, ` : ''}
    ${property.address.state_code ? `${property.address.state_code}, ` : ''}
    ${property.address.postal_code}
    `,
    bathrooms: `${property?.community.baths_min} - ${property?.community.baths_max}`,
    beds: `${property.community.beds_min} - ${property.community.beds_max}`,
    id: `r-${property.property_id}`,
    image: property.photos[0].href,
    lat: property.address.lat,
    lon: property.address.lon,
    price: `${property.community.price_min} - ${property.community.price_max}`,
    source: 'Realtor',
    type: property.prop_type,
    traditional: true,
    website: 'https://www.realtor.com/',
    url: property.rdc_web_url,
  }));
  return { properties, summary }
}

export const parseRealtyMoleResponse = (response) => {
  const summary = {};
  const properties = response.map(property => ({
    active: true,
    address: property.formattedAddress,
    bathrooms: property.bathrooms,
    id: `rm-${property.id}`,
    lat: property.latitude,
    lon: property.longitude,
    rooms: property.bedrooms,
    source: 'Realty Mole',
    type: property.propertyType,
    traditional: true,
    website: 'https://www.realtymole.com/'
  }));
  return { properties, summary }
}

export const fetchRealtor = async ({ state: state_code, city, page=1 }) => {
  const response = await axios({
    "method": "GET",
    "url": "https://realtor.p.rapidapi.com/properties/v2/list-for-rent",
    "headers": {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "realtor.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY || '',
      "useQueryString": true
    }, "params": {
      "sort": "relevance",
      city,
      state_code,
      "limit": 5,
      "offset": (page - 1) * 5
    }
  })
  if(response.data) {
    return parseRealtorResponse(response.data).properties
  }
}

export const fetchRealtyMole = async ({ state, city, fullAddress, page=1 }) => {
  const response = await axios({
    "method":"GET",
    "url":"https://realty-mole-property-api.p.rapidapi.com/properties",
    "headers":{
    "content-type":"application/octet-stream",
    "x-rapidapi-host":"realty-mole-property-api.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY || '',
    "useQueryString":true
    },"params":{
    "state": state,
    "radius":"5",
    "limit":"5",
    offset: (page - 1) * 5,
    city,
    "address": fullAddress,
    }})
  if(response.data) {
    return parseRealtyMoleResponse(response.data).properties
  }
}

// const fetchAttom = async ({ city, state, address, address2 }) => {
//   const response = await axios({
//     "method":"GET",
//     "url":"https://attomdatasolutions-attom-property-v1.p.rapidapi.com/saleshistory/detail",
//     "headers":{
//     "content-type":"application/octet-stream",
//     "x-rapidapi-host":"attomdatasolutions-attom-property-v1.p.rapidapi.com",
//     "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY || '',
//     "accept":"application/json",
//     "useQueryString":true
//     },"params":{
//     "address2":`${address}, ${state}`,
//     "address1":address2
//     }
//     })
//     if(response.data) {
//       return parseRealtyMoleResponse(response.data).properties
//     }
// }

export const fetchMashvisor = async ({ city, state, page=1 }) => {
  const response = await axios({
    "method": "GET",
    "url": "https://mashvisor-api.p.rapidapi.com/airbnb-property/active-listings",
    "headers": {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "mashvisor-api.p.rapidapi.com",
      "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY || '',
      "useQueryString": true
    },
    "params": {
      page,
      city,
      items: 5,
      state
    }
  })
  if(response.data) {
    return parseMashvisorResponse(response.data).properties
  }
}


export const loadScript = (src, position, id) => {
  if (!position) {
    return;
  }
  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

export const defaultAdminLevelData = {
  state: '',
  city: '',
  address: '',
  address2: '',
  fullAddress: '',
  page: 1,
}

