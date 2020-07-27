import React from 'react'

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import BedIcon from '@material-ui/icons/KingBedOutlined';
import MoneyOutlinedIcon from '@material-ui/icons/MoneyOutlined';

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

const ItemInfo = ({ info, Icon, title, size }) => (
  info ?
    <Grid item xs={6}>
      <span style={{ fontSize: '0.8em' }}>
        {Icon && <Icon fontSize="small" />} {title}: &nbsp; {info}
        </span>
    </Grid>
    : null
)

const ItemInfoImportant = ({ info, Icon, title, size }) => (
  info ?
    <Grid item xs={12}>
      <span style={{ fontSize: '1.4em' }}>
        {Icon && <Icon fontSize="large" />} {title}: &nbsp; {info}
        </span>
    </Grid>
    : null
)

export default function ListingItem({ property }) {
  const classes = useStyles();

  return (
    <Grid item xs={3} style={{ padding: '10px 40px' }}>
      <div className="box">
        <div className={classes.propertyImageContainer}>
          <img alt={`property ad ${property.address}`} src={property.image || placeholder} className={classes.propertyImage} />
        </div>
        <Grid
          container
          spacing={1}
          style={{ textAlign: 'left', padding: 10 }}
        >
            <ItemInfoImportant
              Icon={BedIcon}
              info={property.beds}
              title='Beds'
            />
            <ItemInfoImportant
              Icon={MoneyOutlinedIcon}
              info={property.price}
              title='Price'
            />
            <Grid item xs={12} />
            <ItemInfo
              info={property.rooms}
              title='Rooms'
            />
            <ItemInfo
              info={property.type}
              title='Property Type'
            />
            <ItemInfo
              info={property.address}
              title='Address'
            />
        </Grid>
        <Grid container style={{ fontSize: '0.8em'}}>
          <Grid item xs={6}>
            <p>Powered by {property.source}</p>
          </Grid>
          <Grid item xs={6}>
            <p><a className="links" href={property.url || property.website} target="_blank" rel="noopener noreferrer">Visit Site</a></p>
          </Grid>
        </Grid>
      </div>
    </Grid>
  
  )
}
