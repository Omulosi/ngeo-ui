// import is from 'is_js';
import capitalize from 'src/utils/capitalize';

/* eslint-disable */
export default function getArea({
  user = {},
  roles = {},
  fieldOfficer = {},
  countyManager = {},
  regionalManager = {},
  agentArea = null
}) {
  let areas = [];
  let region = '';
  let county = '';
  let subCounty = '';
  let division = '';
  let district = '';
  let location = '';
  let subLocation = '';
  let constituency = '';
  let ward = '';

  if (agentArea) {
    const area = {
      subCounty: agentArea.sub_county || '',
      district: agentArea.district || '',
      division: agentArea.division || '',
      location: agentArea.location || '',
      subLocation: agentArea.sub_location || '',
      constituency: agentArea.constituency || '',
      ward: agentArea.ward || ''
    };

    subCounty = area.subCounty && area.subCounty.map((a) => capitalize(a));
    district = area.district && area.district.map((a) => capitalize(a));
    division = area.division && area.division.map((a) => capitalize(a));
    location = area.location && area.location.map((a) => capitalize(a));
    subLocation =
      area.subLocation && area.subLocation.map((a) => capitalize(a));
    constituency =
      area.constituency && area.constituency.map((a) => capitalize(a));
    ward = area.ward && area.ward.map((a) => capitalize(a));

    areas = [
      {
        type: 'Sub-County',
        name: Array.isArray(subCounty) ? subCounty.join() : ''
      },
      {
        type: 'District',
        name: Array.isArray(district) ? district.join() : ''
      },
      {
        type: 'Division',
        name: Array.isArray(division) ? division.join() : ''
      },
      {
        type: 'Location',
        name: Array.isArray(location) ? location.join() : ''
      },
      {
        type: 'Sub-Location',
        name: Array.isArray(subLocation) ? subLocation.join() : ''
      },
      {
        type: 'Constituency',
        name: Array.isArray(constituency) ? constituency.join() : ''
      },
      {
        type: 'Ward',
        name: Array.isArray(ward) ? ward.join() : ''
      }
    ];

    areas = areas.filter((a) => Boolean(a.name));
  }

  if (user.role === roles.FOO) {
    let area = null;
    if (fieldOfficer) {
      area =
        (fieldOfficer.area && fieldOfficer.area) ||
        (fieldOfficer.attributes && fieldOfficer.attributes.area) ||
        null;
    }

    if (area) {
      area = {
        region: area.region || '',
        county: area.county || '',
        constituency: area.constituency || '',
        subCounty: area.sub_county || '',
        district: area.district || '',
        division: area.division || '',
        location: area.location || '',
        subLocation: area.sub_location || '',
        ward: area.ward || ''
      };

      region = area.region && capitalize(area.region);
      county = area.county && capitalize(area.county);
      subCounty = area.subCounty && area.subCounty.map((a) => capitalize(a));
      district = area.district && area.district.map((a) => capitalize(a));
      division = area.division && area.division.map((a) => capitalize(a));
      location = area.location && area.location.map((a) => capitalize(a));
      subLocation =
        area.subLocation && area.subLocation.map((a) => capitalize(a));
      constituency =
        area.constituency && area.constituency.map((a) => capitalize(a));
      ward = area.ward && area.ward.map((a) => capitalize(a));
    }

    areas = [
      {
        type: 'Region',
        name: Array.isArray(region) ? region.join() : region ? region : ''
      },
      {
        type: 'County',
        name: Array.isArray(county) ? county.join() : county ? county : ''
      },
      // Assume everythin blow is array or nothing
      {
        type: 'Sub-County',
        name: Array.isArray(subCounty) ? subCounty.join() : ''
      },
      {
        type: 'District',
        name: Array.isArray(district) ? district.join() : ''
      },
      {
        type: 'Division',
        name: Array.isArray(division) ? division.join() : ''
      },
      {
        type: 'Location',
        name: Array.isArray(location) ? location.join() : ''
      },
      {
        type: 'Sub-Location',
        name: Array.isArray(subLocation) ? subLocation.join() : ''
      },
      {
        type: 'Constituency',
        name: Array.isArray(constituency) ? constituency.join() : ''
      },
      {
        type: 'Ward',
        name: Array.isArray(ward) ? ward.join() : ''
      }
    ];

    areas = areas.filter((a) => Boolean(a.name));
  }

  if (user.role === roles.CM) {
    let cmArea = '';
    if (countyManager) {
      let county = countyManager.attributes
        ? countyManager.attributes.area
        : '';
      cmArea = county;
    }

    try {
      cmArea = { type: 'County', name: capitalize(cmArea.county || '') };
      areas = [cmArea];
      areas = areas.filter((a) => Boolean(a.name));
    } catch (err) {
      console.log(err);
      areas = '';
    }
  }

  if (user.role === roles.RM) {
    let rmArea = '';
    if (regionalManager) {
      let region = regionalManager.attributes
        ? regionalManager.attributes.area
        : '';
      rmArea = region;
    }

    try {
      rmArea = { type: 'Region', name: capitalize(rmArea.region || '') };
      areas = [rmArea];
      areas = areas.filter((a) => Boolean(a.name));
    } catch (err) {
      console.log(err);
      areas = '';
    }
  }

  return areas;
}

export const getProjects = ({ data = {} }) => {
  let projects = [];
  if (data) {
    projects = data.attributes && data.attributes.projects;
  }

  return projects;
};

export const getInstallations = ({ data = {} }) => {
  let installtions = [];

  if (data) {
    installtions = data.attributes && data.attributes.installation;
  }

  return installtions;
};
