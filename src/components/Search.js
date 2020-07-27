import React from 'react'
import { Button, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import AutoSuggestion from './AutoSuggestion';

export default function Search({ onLocationChange, selectedLocation }) {
  return (
    <Grid container style={{ background: '#ffffff' }}>
      <Grid item xs={11}>
        <AutoSuggestion onLocationChange={onLocationChange} selectedLocation={selectedLocation} />
      </Grid>
      <Grid item xs={1}>
        <Button aria-label="search" color="primary" style={{ height: '100%', width: '100%' }}>
          <SearchIcon style={{ color: 'red' }} />
        </Button>
      </Grid>
    </Grid>
  )
}
