/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import MapContext from '../Map/MapContext';
import SearchFeature from 'ol-ext/control/SearchFeature';
import { Select } from 'ol/interaction';
// import 'ol-ext/dist/ol-ext.css';
import './controls.css';

// Search projects
const SearchFeatureControl = ({ vectorSource }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    let layers = map.getLayers().getArray();
    // project layer

    // Control Select
    let select = new Select({});
    map.addInteraction(select);

    // Set the control grid reference
    let searchFeature = new SearchFeature({
      //target: $(".options").get(0),
      source: vectorSource,
      property: 'theme',
      className: 'custom-search-feature',
      placeholder: 'Search projects...'
    });

    map.controls.push(searchFeature);

    // Select feature when click on the reference index
    searchFeature.on('select', function (e) {
      select.getFeatures().clear();
      select.getFeatures().push(e.search);
      let p = e.search.getGeometry().getFirstCoordinate();
      map.getView().animate({ center: p });
    });

    return () => map.controls.remove(searchFeature);
  }, [map]);

  return null;
};

export default SearchFeatureControl;
