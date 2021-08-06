/* eslint-disable */
import React, { useContext, useEffect } from 'react';
import MapContext from '../Map/MapContext';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { Draw, Modify } from 'ol/interaction';
import { Vector as VectorSource } from 'ol/source';
import { Vector as VectorLayer } from 'ol/layer';
import Overlay from 'ol/Overlay';
import { unByKey } from 'ol/Observable';
import { LineString, Polygon } from 'ol/geom';
import { getArea, getLength } from 'ol/sphere';
import './interactions.css';

const MeasureInteraction = ({ measureType, setType }) => {
  const { map } = useContext(MapContext);

  // let type = 'LineString';
  let type = measureType == 'Area' ? 'Polygon' : measureType;

  useEffect(() => {
    if (!map) return;

    if (type === 'None') {
      // // Remove measure layers
      // let layers = map
      //   .getLayers()
      //   .getArray()
      //   .filter((layer) => layer.get('name') === 'measure');

      // layers.forEach((layer) => map.removeLayer(layer));

      // // Remove measure overlays
      // let overlays = map
      //   .getOverlays()
      //   .getArray()
      //   .filter((overlay) => overlay.get('name') === 'measure');
      // overlays.forEach((overlay) => map.removeLayer(overlay));

      // // Remove measure interactions
      // let interactions = map
      //   .getInteractions()
      //   .getArray()
      //   .filter((interaction) => interaction.get('name') === 'measure');
      // interactions.forEach((interaction) => map.removeLayer(interaction));

      return;
    }

    /**
     * Currently drawn feature.
     * @type {import("../src/ol/Feature.js").default}
     */
    let sketch;

    /**
     * The help tooltip element.
     * @type {HTMLElement}
     */
    let helpTooltipElement;

    /**
     * Overlay to show the help messages.
     * @type {Overlay}
     */
    let helpTooltip;

    /**
     * The measure tooltip element.
     * @type {HTMLElement}
     */
    let measureTooltipElement;

    /**
     * Overlay to show the measurement.
     * @type {Overlay}
     */
    let measureTooltip;

    /**
     * Message to show when the user is drawing a polygon.
     * @type {string}
     */
    let continuePolygonMsg = 'Click to continue drawing the polygon';

    /**
     * Message to show when the user is drawing a line.
     * @type {string}
     */
    let continueLineMsg = 'Click to continue drawing the line';

    /**
     * Handle pointer move.
     * @param {import("../src/ol/MapBrowserEvent").default} evt The event.
     */
    const pointerMoveHandler = function (evt) {
      if (evt.dragging) {
        return;
      }
      /** @type {string} */
      let helpMsg = 'Click to start drawing';

      if (sketch) {
        let geom = sketch.getGeometry();
        if (geom instanceof Polygon) {
          helpMsg = continuePolygonMsg;
        } else if (geom instanceof LineString) {
          helpMsg = continueLineMsg;
        }
      }

      helpTooltipElement.innerHTML = helpMsg;
      helpTooltip.setPosition(evt.coordinate);

      helpTooltipElement.classList.remove('hidden');
    };

    /**
     * Format length output.
     * @param {LineString} line The line.
     * @return {string} The formatted length.
     */
    const formatLength = function (line) {
      const length = getLength(line);
      let output;
      if (length > 100) {
        output = Math.round((length / 1000) * 100) / 100 + ' ' + 'km';
      } else {
        output = Math.round(length * 100) / 100 + ' ' + 'm';
      }
      return output;
    };

    /**
     * Format area output.
     * @param {Polygon} polygon The polygon.
     * @return {string} Formatted area.
     */
    const formatArea = function (polygon) {
      const area = getArea(polygon);
      let output;
      if (area > 10000) {
        output =
          Math.round((area / 1000000) * 100) / 100 + ' ' + 'km<sup>2</sup>';
      } else {
        output = Math.round(area * 100) / 100 + ' ' + 'm<sup>2</sup>';
      }
      return output;
    };

    /**
     * Creates a new help tooltip overlay
     */
    function createHelpTooltip() {
      if (helpTooltipElement) {
        helpTooltipElement.parentNode.removeChild(helpTooltipElement);
      }
      helpTooltipElement = document.createElement('div');
      helpTooltipElement.className = 'ol-tooltip hidden';
      helpTooltip = new Overlay({
        element: helpTooltipElement,
        offset: [15, 0],
        positioning: 'center-left'
      });
      helpTooltip.set('name', 'measure');
      map.addOverlay(helpTooltip);
    }

    /**
     * Creates a new measure tooltip overlay
     */
    function createMeasureTooltip() {
      if (measureTooltipElement) {
        measureTooltipElement.parentNode.removeChild(measureTooltipElement);
      }
      measureTooltipElement = document.createElement('div');
      measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
      measureTooltip = new Overlay({
        element: measureTooltipElement,
        offset: [0, -15],
        positioning: 'bottom-center'
      });
      measureTooltip.set('name', 'measure');
      map.addOverlay(measureTooltip);
    }

    let source = new VectorSource();

    let vector = new VectorLayer({
      source: source,
      zIndex: 99999, // set a high value
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: '#ffcc33',
          width: 2
        }),
        image: new CircleStyle({
          radius: 7,
          fill: new Fill({
            color: '#ffcc33'
          })
        })
      })
    });
    vector.set('name', 'measure');

    map.addLayer(vector);

    map.on('pointermove', pointerMoveHandler);

    map.getViewport().addEventListener('mouseout', function () {
      helpTooltipElement.classList.add('hidden');
    });

    let draw; // global so we can remove it later

    function addInteraction() {
      // let type = typeSelect.value == 'area' ? 'Polygon' : 'LineString';
      // let type = 'LineString';
      draw = new Draw({
        source: source,
        type: type,
        style: new Style({
          fill: new Fill({
            color: 'rgba(255, 255, 255, 0.2)'
          }),
          stroke: new Stroke({
            color: 'rgba(0, 0, 0, 0.5)',
            lineDash: [10, 10],
            width: 2
          }),
          image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
              color: 'rgba(0, 0, 0, 0.7)'
            }),
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.2)'
            })
          })
        })
      });
      draw.set('name', 'measure');

      map.addInteraction(draw);

      // Create tooltip overlays
      createMeasureTooltip();
      createHelpTooltip();

      let listener;
      draw.on('drawstart', function (evt) {
        // Disable normal popup
        window.isDrawingOrEditing = true;
        // set sketch - current feature
        sketch = evt.feature;

        /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
        let tooltipCoord = evt.coordinate;

        listener = sketch.getGeometry().on('change', function (evt) {
          const geom = evt.target;
          let output;
          if (geom instanceof Polygon) {
            output = formatArea(geom);
            tooltipCoord = geom.getInteriorPoint().getCoordinates();
          } else if (geom instanceof LineString) {
            output = formatLength(geom);
            tooltipCoord = geom.getLastCoordinate();
          }
          measureTooltipElement.innerHTML = output;
          measureTooltip.setPosition(tooltipCoord);
        });
      });

      draw.on('drawend', function () {
        measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
        measureTooltip.setOffset([0, -7]);
        // unset sketch
        sketch = null;
        // unset tooltip so that a new one can be created
        measureTooltipElement = null;
        createMeasureTooltip();
        unByKey(listener);

        helpTooltipElement.classList.add('hidden');

        setType('None');

        setTimeout(() => {
          // Enable normal popup
          window.isDrawingOrEditing = false;
          // Remove draw interaction from map
          map.removeInteraction(draw);
          // Remove overlays from map
          map.removeOverlay(helpTooltip);
          map.removeOverlay(measureTooltip);
        }, 500);
      });
    }

    addInteraction();

    return () => {
      map.removeInteraction(draw);
      map.removeOverlay(helpTooltip);
      map.removeOverlay(measureTooltip);
    };
  }, [map, measureType]);

  return null;
};

export default MeasureInteraction;
