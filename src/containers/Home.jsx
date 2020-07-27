import React from 'react'

import Search from '../components/Search'

export default function Home({ onLocationChange, selectedLocation }) {
  return (
    <content className="home">
      <div style={{ width: 700 }}>
        <h1>Property Plug</h1>
        <Search onLocationChange={onLocationChange} selectedLocation={selectedLocation} />
      </div>
    </content>
  )
}
