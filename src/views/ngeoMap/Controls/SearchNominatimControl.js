/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import MapContext from '../Map/MapContext';
import SearchNominatim from 'ol-ext/control/SearchNominatim';
import mainConfig from 'src/config/config.json';
// import 'ol-ext/dist/ol-ext.css';
import './controls.css';

const SearchNominatimControl = ({ extent }) => {
  const { map } = useContext(MapContext);
  const { searchNominatimUrl } = mainConfig;

  useEffect(() => {
    if (!map) return;

    const searchNominatim = new SearchNominatim({
      reverse: true,
      position: true,
      placeholder: 'Search...',
      bounded: true,
      maxItems: 10,
      viewbox: extent,
      url: searchNominatimUrl
    });

    map.controls.push(searchNominatim);

    searchNominatim.on('select', function (e) {
      let sLayer = map.getLayers().getArray()[0];

      let source = sLayer.getSource();
      source.clear();
      // Check if we get a geojson to describe the search
      if (e.search.geojson) {
        var format = new ol.format.GeoJSON();
        var f = format.readFeature(e.search.geojson, {
          dataProjection: 'EPSG:4326',
          featureProjection: map.getView().getProjection()
        });
        sLayer.getSource().addFeature(f);
        var view = map.getView();
        var resolution = view.getResolutionForExtent(
          f.getGeometry().getExtent(),
          map.getSize()
        );
        var zoom = view.getZoomForResolution(resolution);
        var center = ol.extent.getCenter(f.getGeometry().getExtent());
        // redraw before zoom
        setTimeout(function () {
          view.animate({
            center: center,
            zoom: Math.min(zoom, 16)
          });
          source.clear();
        }, 100);
      } else {
        map.getView().animate({
          center: e.coordinate,
          zoom: Math.max(map.getView().getZoom(), 16)
        });
        source.clear();
      }
    });

    return () => map.controls.remove(searchNominatim);
  }, [map]);

  return null;
};

export default SearchNominatimControl;
