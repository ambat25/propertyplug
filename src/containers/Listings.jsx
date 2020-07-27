import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BedIcon from '@material-ui/icons/KingBedOutlined';
import MoneyOutlinedIcon from '@material-ui/icons/MoneyOutlined';
import placeholder from '../assets/placeholder.jpg';

import Search from '../components/Search'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: 'nowrap',
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: 'translateZ(0)',
  },
  title: {
    color: theme.palette.primary.light,
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
  },
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
  }
}));


const ItemInfo = ({info, Icon, title }) => (
  info ?
    <Grid item xs={6}>
      <span style={{ fontWeight: 'bold' }}>
        {Icon && <Icon fontSize="small" />} {title}: &nbsp;
        </span>
      {info}
    </Grid>
    : null
)

export default function Listings({ onLoadMore, onLocationChange, properties }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid container style={{ minHeight: 200, height: '15vh' }}>
        <Grid item xs={12} >
          <h1>Property Plug</h1>
          <div style={{ width: 700, marginLeft: 'auto', marginRight: 'auto' }}>
            <Search onLocationChange={onLocationChange} />
          </div>
        </Grid>
      </Grid>
      <Grid container style={{ minHeight: 800, height: '85vh', padding: 10 }}>
        {/* <Grid item xs={3} style={{ background: 'yellow' }}>
        </Grid> */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {properties.map((property) => (
              <Grid item xs={3} key={property.id} style={{ padding: '10px 40px' }}>
                <Paper style={{ width: '100%' }} elevation={1}>
                  <div className={classes.propertyImageContainer}>
                    <img src={property.image || placeholder} className={classes.propertyImage} />
                  </div>
                  <Grid container
                    direction="row"
                    justify="flex-start"
                    alignItems="flex-start"
                    spacing={1}
                    style={{ fontSize: 14, textAlign: 'left', padding: 10 }}
                  >
                      <ItemInfo
                        info={property.rooms}
                        title='Rooms'
                      />
                      <ItemInfo
                        Icon={BedIcon}
                        info={property.beds}
                        title='Beds'
                      />
                      <ItemInfo
                        info={property.type}
                        title='Property Type'
                      />
                      <ItemInfo
                        Icon={MoneyOutlinedIcon}
                        info={property.price}
                        title='Price'
                      />
                      <ItemInfo
                        info={property.address}
                        title='Address'
                      />
                  </Grid>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <p>powered by {property.source}</p>
                    </Grid>
                    <Grid item xs={6}>
                      <p><a href={property.url || property.website} target="_blank">Visit Site</a></p>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
            ))}
          </Grid>
          <Button color="primary" onClick={onLoadMore}>Load More</Button>
        </Grid>
      </Grid>
    </Grid>

  )
}
