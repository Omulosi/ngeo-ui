import getArea from 'src/utils/getArea';
import { roles } from 'src/config';

/* eslint-disable */
export default function getFieldOfficerAreas(countyManager) {
  let fieldOfficersList = countyManager.attributes.field_officers;
  let filterString = '';
  fieldOfficersList = fieldOfficersList.map((fieldOfficer) => {
    const areas = getArea({
      user: { role: fieldOfficer.user.role },
      roles,
      fieldOfficer
    });

    if (areas) {
      areas.forEach((area) => {
        // Build search string for the rest
        if (area.type === 'Sub-County') {
          // searchString += `subname=${area.name}&`
        }
        if (area.type === 'District') {
          filterString += `(distname=${area.name})|`;
        }
        if (area.type === 'Division') {
          filterString += `(divname=${area.name})|`;
        }
        if (area.type === 'Location') {
          filterString += `(locname=${area.name})|`;
        }
        if (area.type === 'Sub-Location') {
          filterString += `(sub_name=${area.name})|`;
        }
      });
    }
  });

  // Remore the last symbol
  return filterString.slice(0, filterString.length - 1);
}
