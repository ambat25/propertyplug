import React from 'react'

import Search from '../components/Search'

export default function Home({ onLocationChange }) {
  return (
    <content className="home">
      <div style={{ width: 700 }}>
        <Search onLocationChange={onLocationChange} />
      </div>
    </content>
  )
}
