/* eslint-disable */

/**
 *
 * @param {area object} area
 *
 * Creates a string representation of area
 */
export default function createAreaList(area) {
  const areaList =
    area &&
    Object.entries(area).filter(
      // check if value is an array of values
      (items) => items[1] && Array.from(items[1]).length > 0
    );
  let areaString = '';

  if (areaList) {
    // Create a string from a list
    areaString = parseAreaList(areaList);
  }

  return areaString;
}

const parseAreaList = (areaList) => {
  let returnStr = '';
  areaList.forEach((area) => {
    switch (area[0].toLocaleLowerCase()) {
      case 'region':
        returnStr += `Region: ${area[1]}, `;
        break;
      case 'county':
        returnStr += `County: ${area[1]}, `;
        break;
      case 'constituency':
        returnStr += `Constituency: ${area[1]}, `;
        break;
      case 'sub_county':
        returnStr += `Sub-County: ${area[1]}, `;
        break;
      case 'sub_location':
        returnStr += `Sub-Location: ${area[1]}, `;
        break;
      case 'location':
        returnStr += `Location: ${area[1]}, `;
        break;
      case 'ward':
        returnStr += `ward: ${area[1]}, `;
        break;
      default:
        returnStr += `${area[0]}: ${area[1]}, `;
    }
  });

  // Remove last punctuation
  return returnStr.trim().slice(0, returnStr.length - 2);
};
