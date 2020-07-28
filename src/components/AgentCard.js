import React from 'react'

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import placeholder from '../assets/placeholder.jpg';

const useStyles = makeStyles((theme) => ({
  propertyImage: {
    objectFit: 'none',
    objectPosition: 'center',
    width: 300,
    height: 280,
  },
  propertyImageContainer: {
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
}));

export default function AgentCard({ property }) {
  const classes = useStyles();

  return (
    <Grid item xs={3} style={{ padding: '10px 40px', textAlign: 'left' }}>
      <div className="box" style={{ padding: 10 }}>
        <div className={classes.propertyImageContainer}>
          <img alt={property.name} src={property?.photos?.[0].getUrl() || placeholder} className={classes.propertyImage} />
        </div>
        <div>
         Name: {property.name}
        </div>
        <div>
          Address: {property.vicinity}
        </div>
      </div>
    </Grid>
  
  )
}
