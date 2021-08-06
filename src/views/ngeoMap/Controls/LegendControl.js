/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import MapContext from '../Map/MapContext';
import Legend from 'ol-ext/control/Legend';

// import 'ol-ext/dist/ol-ext.css';
import './controls.css';

const LegendControl = ({ style }) => {
  const { map } = useContext(MapContext);

  useEffect(() => {
    if (!map) return;

    const legend = new Legend({
      title: 'Legend',
      style,
      collapsed: false
    });

    map.controls.push(legend);

    // Add selection to legend
    function addToLegend() {
      //   var f = select.getFeatures().item(0);
      //   // Remove feature from select (to get its style back with ol6)
      //   if (f) select.getFeatures().remove(f);
      //   legend.addItem({
      //     className: $('#center input').prop('checked') ? 'center' : '',
      //     title: $('.options .row textarea').val(),
      //     /* given a style  and a geom type
      //   style: f.getStyle() || getFeatureStyle(f),
      //   typeGeom: f.getGeometry().getType()
      //   */
      //     /* or given a feature */
      //     feature: f
      //   });
      //   if (f) select.getFeatures().push(f);
    }

    return () => map.controls.remove(legend);
  }, [map]);

  return null;
};

export default LegendControl;
