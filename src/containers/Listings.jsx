import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import Search from '../components/Search'
import ListingItem from '../components/ListingItem'

export default function Listings({ onLoadMore, onLocationChange, properties, fetching, selectedLocation }) {
  return (
    <Grid container>
      <Grid container style={{ minHeight: 200, height: '15vh' }}>
        <Grid item xs={12} >
          <h1 style={{ color: 'red' }}>Property Plug</h1>
          <div style={{ width: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            <Search onLocationChange={onLocationChange} selectedLocation={selectedLocation} />
          </div>
        </Grid>
      </Grid>
      <Grid container style={{ minHeight: 800, height: '85vh', padding: 10 }}>
        <Grid item xs={12}>
          <Grid container>
            {properties.map((property) => (<ListingItem key={property.id} property={property} />))}
          </Grid>
          <div style={{ margin: 10 }}>
            {
              fetching ? <CircularProgress style={{ color: 'red' }} /> : (
                <Button color="primary" onClick={onLoadMore}>Load More</Button>
              )
            }
          </div>
        </Grid>
      </Grid>
    </Grid>
  )
}
