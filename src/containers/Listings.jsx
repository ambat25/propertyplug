import React from 'react';
import { Grid, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

import Search from '../components/Search'
import AgentCard from '../components/AgentCard'
import ListingItem from '../components/ListingItem'

export default function Listings({ agencies, onLoadMore, onLocationChange, properties, fetching, selectedLocation }) {
  console.log(agencies)
  return (
    <Grid container>
      <Grid container style={{ minHeight: 200, height: '15vh' }}>
        <Grid item xs={12} >
          <h1 style={{ color: 'red' }}><a className="links" href="/">Property Plug</a></h1>
          <div style={{ width: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            <Search onLocationChange={onLocationChange} selectedLocation={selectedLocation} />
          </div>
        </Grid>
      </Grid>
      {/* <Grid container style={{ minHeight: 400, padding: 10 }}>
      </Grid> */}
      <Grid container style={{ minHeight: 800, padding: 10 }}>
        <h1 style={{ margin: 0 }}>Agencies</h1>
        <Grid item xs={12}>
          <div style={{ display: 'flex' }}>
            {agencies.map((agency) => (<AgentCard key={agency.id} property={agency} />))}
          </div>
        </Grid>
        <h1>Properties</h1>
        <Grid item xs={12}>
          <Grid container>
            {properties.map((property) => (<ListingItem key={property.id} property={property} />))}
          </Grid>
          <div style={{ margin: 10 }}>
            {
              fetching ? <CircularProgress style={{ color: 'red' }} /> : (
                <Button style={{ color: 'red' }} onClick={onLoadMore}>Load More</Button>
              )
            }
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}
