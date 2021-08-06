/* eslint-disable */
// import 'ol/ol.css'; => Causes map to behave in a weird
import {
  Circle as CircleStyle,
  Fill,
  Stroke,
  Style,
  Icon,
  RegularShape,
  Text
} from 'ol/style';
import Point from 'ol/geom/Point';
import { projectThemes } from 'src/config';
// import FontSymbol from 'ol-ext/style/FontSymbol';
// import 'ol-ext/style/FontAwesomeDef.js';

// IMPORT ALL IMAGES
function importAllImages(r) {
  const images = {};
  r.keys().map((item, index) => (images[item.replace('./', '')] = r(item)));
  return images;
}

const images = importAllImages(
  require.context('./images', false, /\.(png|jpe?g|svg)$/)
);

const styles = {
  // ================= Generic Styles
  select: new Style({
    stroke: new Stroke({
      color: '#0000ff',
      width: 2
    }),
    fill: new Fill({ color: 'green' })
  }),
  Dot: new Style({
    image: new Icon(
      /** @type {olx.style.IconOptions} */ ({
        color: '#8959A8',
        crossOrigin: 'anonymous',
        src: 'https://openlayers.org/en/v4.6.4/examples/data/dot.png'
      })
    )
  }),
  // Red rect with black borders
  Point: new Style({
    image: new RegularShape({
      points: 4,
      radius: 8,
      angle: Math.PI / 4,
      fill: new Fill({ color: 'red' }),
      stroke: new Stroke({
        color: [0, 0, 0],
        width: 2
      })
    })
  }),
  CircularPoint: new Style({
    image: new CircleStyle({
      radius: 4,
      fill: new Fill({
        color: 'blue'
      }),
      stroke: new Stroke({
        color: 'magenta'
      })
    })
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  }),

  MultiPolygon: new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 1
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)'
    })
  }),

  // Map specific styles
  Forest: new Style({
    fill: new Fill({
      color: 'rgba(112, 168, 0, 0.5)'
    })
  }),

  UserArea: new Style({
    stroke: new Stroke({
      color: 'blue',
      width: 3
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0)'
    })
  }),

  userAreaFunction: (feature, resolution) => {
    let region = feature.get('REGION');
    let county = feature.get('COUNTY');
    let constituency = feature.get('CONSTITUEN');
    let subCounty = feature.get('SUB_COUN');
    let division = feature.get('DIVISION');
    let location = feature.get('LOCATION');
    let subLocation = feature.get('SUB_LOCATI');

    // Order, starting from smallest region.
    // Name should default to name of smallest region
    let name =
      subLocation ||
      location ||
      division ||
      subCounty ||
      constituency ||
      county ||
      region;

    // Format name display
    name =
      (subLocation && `${name} Sub Location`) ||
      (location && `${name} Location`) ||
      (division && `${name} Division`) ||
      (constituency && `${name} Constituency`) ||
      (subCounty && `${name} Sub-County`) ||
      (county && `${name} County`) ||
      (region && `${name} Region`);

    const areaStyle = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 4
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0)'
      })
    });

    const textStyle = new Style({
      text: new Text({
        font: '16px Calibri,sans-serif',
        fill: new Fill({ color: '#0288d1' }),
        stroke: new Stroke({
          color: '#fff',
          width: 4
        }),
        text: name
      })
    });

    return [areaStyle, textStyle];
  },

  HighlightStyle: new Style({
    stroke: new Stroke({
      color: '#f00',
      width: 1
    }),
    fill: new Fill({
      color: 'rgba(240,0,0,0.1)'
    })
  }),

  // ===================== Admin Boundaries
  BoundaryLayer: new Style({
    stroke: new Stroke({
      color: '#aaaaaa',
      width: 6,
      lineJoin: 'round',
      lineCap: 'butt',
      lineDash: [8, 1, 3, 1, 3, 1, 3, 1]
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 1)'
    })
  }),

  //
  Region: new Style({
    fill: new Fill({
      color: 'rgba(240,240,240, 0)'
    }),
    stroke: new Stroke({
      color: '#ff0000',
      width: 5,
      lineJoin: 'round',
      lineCap: 'butt'
    })
  }),

  innerStroke: new Style({
    stroke: new Stroke({
      color: '#000000',
      width: 0.5,
      lineJoin: 'round',
      lineCap: 'butt',
      lineDash: [8, 1, 3, 1, 3, 1, 3, 1]
    })
  }),

  County: new Style({
    fill: new Fill({
      color: 'rgba(240,240,240, 0)'
    }),
    stroke: new Stroke({
      color: '#ff5500',
      width: 4,
      lineJoin: 'round',
      lineCap: 'butt',
      lineDash: [8, 1, 3, 1, 3, 1, 3, 1]
    })
    // stroke: new Stroke({
    //   color: '#000000',
    //   width: 0.5,
    //   lineJoin: 'round',
    //   lineCap: 'butt',
    //   lineDash: [8, 1, 3, 1, 3, 1, 3, 1]
    // })
  }),
  Constituency: new Style({
    fill: new Fill({
      color: 'rgba(240,240,240, 0)'
    }),
    stroke: new Stroke({
      color: '#df73ff',
      width: 3,
      lineJoin: 'round',
      lineCap: 'butt',
      lineDash: [8, 1, 3, 1, 3, 1, 3, 1]
    })
    // stroke: new Stroke({
    //   color: '#000000',
    //   width: 0.5,
    //   lineJoin: 'round',
    //   lineCap: 'butt',
    //   lineDash: [8, 1, 3, 1, 3, 1, 3, 1]
    // })
  }),

  Division: new Style({
    fill: new Fill({
      color: 'rgba(255,255,255, 0)'
    }),
    stroke: new Stroke({
      color: '#4ce600',
      width: 3,
      lineJoin: 'round',
      lineCap: 'butt',
      lineDash: [8, 1, 3, 1, 3, 1, 3, 1]
    })
  }),

  Location: new Style({
    fill: new Fill({
      color: 'rgba(255,255,255, 0)'
    }),
    stroke: new Stroke({
      color: '#732600',
      width: 1,
      lineJoin: 'round',
      lineCap: 'butt',
      lineDash: [8, 1, 3, 1, 3, 1, 3, 1]
    })
  }),

  SubLocation: new Style({
    fill: new Fill({
      color: 'rgba(255,255,255, 0)'
    }),
    stroke: new Stroke({
      color: '#c7516a',
      width: 1,
      lineJoin: 'round',
      lineCap: 'butt',
      lineDash: [8, 1, 3, 1, 3, 1, 3, 1]
    })
  }),
  // Installations

  SchoolPoint: new Style({
    image: new Icon({
      src: images['school.png'].default
    })
  }),
  // Hospitals
  HospitalPoint: new Style({
    image: new Icon({
      src: images['hospital_icon.png'].default
    })
  }),
  hospitalLoadFunction: (feature, resolution) => {
    const id = Number(feature.getId().split('.')[1]);
  },
  // BTS
  BTS: new Style({
    image: new Icon({
      src: images['cell-tower.png'].default
    })
  }),
  // Police
  Police: new Style({
    image: new Icon({
      src: images['police-icon.png'].default
    })
  }),
  Admin: new Style({
    image: new Icon({
      src: images['admin-icon.png'].default
    })
  }),
  ForestStation: new Style({
    image: new Icon({
      src: images['forest-station.png'].default
    })
  }),
  PowerStation: new Style({
    image: new Icon({
      src: images['power-station.png'].default
    })
  }),
  // Roads
  RoadClassA: new Style({
    stroke: new Stroke({
      // color: '#fa3411',
      color: 'rgb(250, 49, 16, 0.4)',
      width: 4,
      lineJoin: 'round',
      lineCap: 'butt'
    })
  }),
  RoadClassB: new Style({
    stroke: new Stroke({
      color: 'rgb(0, 0, 0, 0.4)',
      width: 3,
      lineJoin: 'round',
      lineCap: 'butt'
    })
  }),
  RoadClassC: new Style({
    stroke: new Stroke({
      color: 'rgba(75, 0, 130, 0.4)',
      width: 2,
      lineJoin: 'round',
      lineCap: 'butt'
    })
  }),
  RoadClassD: new Style({
    stroke: new Stroke({
      color: 'rgba(255, 127, 80, 0.4)',
      width: 2,
      lineJoin: 'round',
      lineCap: 'butt'
    })
  }),
  // Towns
  TownRegionHQ: new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({
        color: '#ffff00'
      }),
      stroke: new Stroke({
        color: '#000000',
        width: 3
      })
    })
  }),
  TownDistHQ: new Style({
    image: new CircleStyle({
      radius: 4,
      fill: new Fill({
        color: '#ff0000'
      }),
      stroke: new Stroke({
        color: '#000000',
        width: 2
      })
    })
  }),
  TownDivHQ: new Style({
    image: new CircleStyle({
      radius: 4,
      fill: new Fill({
        color: '#00ff00'
      }),
      stroke: new Stroke({
        color: '#000000',
        width: 2
      })
    })
  }),
  TownOther: new Style({
    image: new CircleStyle({
      radius: 4,
      fill: new Fill({
        color: '#FFA500'
      }),
      stroke: new Stroke({
        color: '#000000',
        width: 2
      })
    })
  }),

  // Style functions
  textStyleFunction: (feature, resolution, key) => {
    return null;
  },
  //
  townStyleFunction: (feature, resolution) => {
    let name = feature.get('Name');
    name = `${name} Town`;
    const textStyle = new Style({
      image: new CircleStyle({
        radius: 4,
        fill: new Fill({
          color: 'blue'
        }),
        stroke: new Stroke({
          color: 'magenta'
        })
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        }),
        offsetY: 12,
        text: name
      })
    });

    return [textStyle];
  },

  forestStyleFunction: (feature, resolution) => {
    let name = feature.get('FOREST');

    name = `${name} Forest`;
    const textStyle = new Style({
      fill: new Fill({
        color: 'rgba(112, 168, 0, 0.5)'
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        }),
        offsetX: 10,
        text: name
      })
    });

    return [textStyle];
  },

  themeStyleFunction: (feature, resolution) => {
    let name = feature.get('name');
    let theme = feature.get('theme');
    let color = feature.get('theme_color');

    const textStyle = new Style({
      image: new CircleStyle({
        radius: 7,
        stroke: new Stroke({
          color: 'white',
          width: 3
        }),
        fill: new Fill({
          color: color
        })
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        }),
        offsetY: 13,
        text: name
      })
    });

    return [textStyle];
  },

  projectStyleFunction: (feature, resolution) => {
    let name = feature.get('name');
    let theme = feature.get('theme');
    let agent = feature.get('agent');
    let terms = feature.get('terms');

    const textStyle = new Style({
      image: new CircleStyle({
        radius: 5,
        stroke: new Stroke({
          // color: 'white',
          color: [255, 128, 0],
          width: 2
        }),
        fill: new Fill({
          // color: 'blue',
          color: [255, 128, 0, 0.5]
        })
      }),
      text: new Text({
        font: '12px Calibri,sans-serif',
        fill: new Fill({ color: '#000' }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        }),
        offsetY: 13,
        text: name
      })
    });

    return [textStyle];
  },

  getLegendStyle: () => {
    var st = [];
    // Shadow style
    st.push(
      new ol.style.Style({
        image: new ol.style.Shadow({
          radius: 15
        })
      })
    );

    // Font style
    st.push(
      new ol.style.Style({
        image: new ol.style.FontSymbol({
          form: 'marker',
          glyph: 'fa-car',
          radius: 15,
          offsetY: -15,
          fontSize: 0.7,
          color: '#fff',
          fill: new ol.style.Fill({
            color: 'blue'
          }),
          stroke: new ol.style.Stroke({
            color: '#fff',
            width: 2
          })
        }),
        stroke: new ol.style.Stroke({
          width: 5,
          color: '#f00'
        }),
        fill: new ol.style.Fill({
          color: [255, 0, 0, 0.6]
        })
      })
    );
    return st;
  },

  keyInstallationsFunction: (feature, resolution) => {
    let region = feature.get('REGION');
    let county = feature.get('COUNTY');
    let constituency = feature.get('CONSTITUEN');
    let division = feature.get('DIVISION');
    let location = feature.get('LOCATION');
    let subLocation = feature.get('SUB_LOCATI');

    let name =
      subLocation || location || division || constituency || county || region;

    const areaStyle = new Style({
      stroke: new Stroke({
        color: 'blue',
        width: 3
      }),
      fill: new Fill({
        color: 'rgba(0, 0, 255, 0)'
      })
    });

    const textStyle = new Style({
      text: new Text({
        font: '18px Calibri,sans-serif',
        fill: new Fill({ color: '#0288d1' }),
        stroke: new Stroke({
          color: '#fff',
          width: 2
        }),
        offsetX: 10,
        text: name
      })
    });

    return [areaStyle, textStyle];
  },
  projectSelectStyle: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: '#red',
      width: 2
    }),
    image: new CircleStyle({
      radius: 6,
      fill: new Fill({
        color: '#ffcc33'
      })
    })
  }),

  generalStyle: new Style({
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
  }),

  arrowStyleFunction: function (feature) {
    let color = 'rgb(220, 0, 78)';
    let arrowColor = feature.get('color');
    const name = feature.get('name');

    if (arrowColor === 'yellow') {
      color = '#ffcc33';
    }

    if (arrowColor === 'blue') {
      color = 'blue';
    }

    let geometry = feature.getGeometry();
    let styles = [
      // linestring
      new Style({
        stroke: new Stroke({
          color: color,
          width: 4
        }),
        text: new Text({
          font: '12px Calibri,sans-serif',
          fill: new Fill({ color: '#000' }),
          stroke: new Stroke({
            color: '#fff',
            width: 3
          }),
          offsetY: 13,
          text: name || ''
        })
      })
    ];

    geometry.forEachSegment(function (start, end) {
      var dx = end[0] - start[0];
      var dy = end[1] - start[1];
      var rotation = Math.atan2(dy, dx);
      // arrows
      styles.push(
        new Style({
          geometry: new Point(end),
          image: new Icon({
            src: images['arrow-style.png'].default,
            color: color,
            anchor: [0.75, 0.5],
            rotateWithView: true,
            rotation: -rotation
          })
        })
      );
    });

    return styles;
  }
};

export default styles;
