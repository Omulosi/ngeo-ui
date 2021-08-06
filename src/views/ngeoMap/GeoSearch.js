import * as React from 'react';
import { NominatimSearch } from '@terrestris/react-geo';
import { makeStyles } from '@material-ui/core';
import MapContext from './Map/MapContext';

const useStyles = makeStyles({
  map: {
    height: '100vh'
  },
  searchbox: {}
});

const GeoSearch = () => {
  const classes = useStyles();

  const { map } = React.useContext(MapContext);

  return (
    <div className={classes.searchbox}>
      <NominatimSearch map={map} countrycodes="ke" />
    </div>
  );
};

export default GeoSearch;
