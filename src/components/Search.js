import React from 'react'
import { Button, Grid } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

import AutoSuggestion from './AutoSuggestion';

export default function Search({ onLocationChange }) {
  return (
    <Grid container style={{ background: 'red' }}>
      <Grid item xs={11}>
        <AutoSuggestion onLocationChange={onLocationChange} />
      </Grid>
      <Grid item xs={1}>
        <Button aria-label="search" color="primary" style={{ height: '100%', width: '100%' }}>
          <SearchIcon />
        </Button>
      </Grid>
    </Grid>
  )
}
