import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DetailsDisplay from 'src/components/DetailsDisplay';
import SuccessChip from 'src/components/SuccessChip';
import capitalize from 'src/utils/capitalize';
import FailureChip from 'src/components/FailureChip';
// import getArea from 'src/utils/getArea';
// import { roles } from 'src/config';
import createAreaString from 'src/utils/createAreaString';

/*eslint-disable */
const FieldOfficerInfo = ({ details }) => {
  const {
    email,
    first_name: firstName,
    is_active: status,
    last_name: lastName,
    date_joined: dateJoined,
    area: fooArea,
    staff_number
  } = details;

  const areaString = createAreaString(fooArea);

  const rows = [
    {
      name: 'Email',
      value: email || ''
    },
    {
      name: 'First Name',
      value: capitalize(firstName) || ''
    },
    {
      name: 'Last Name',
      value: capitalize(lastName) || ''
    },
    {
      name: 'Status',
      value: (status && <SuccessChip label="Active" />) || (
        <FailureChip label="Inactive" />
      )
    },
    { name: 'Staff Number', value: staff_number },
    { name: 'Date Joined', value: moment(dateJoined).format('lll') },
    {
      name: 'Area',
      value: areaString ? areaString : 'Area not assigned'
    }
  ];

  return <DetailsDisplay title="Field Officer Info" data={rows} />;
};

FieldOfficerInfo.propTypes = {
  etails: PropTypes.object
};

export default FieldOfficerInfo;
