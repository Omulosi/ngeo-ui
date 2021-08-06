import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import DetailsDisplay from 'src/components/DetailsDisplay';
import SuccessChip from 'src/components/SuccessChip';
import capitalize from 'src/utils/capitalize';
import FailureChip from 'src/components/FailureChip';
import getArea from 'src/utils/getArea';
import { roles } from 'src/config';

/*eslint-disable */
const RegionalManagerInfo = ({ details }) => {
  const {
    email,
    first_name: firstName,
    is_active: status,
    last_name: lastName,
    date_joined: dateJoined,
    area
  } = details;

  const user = { role: roles.CM };

  const areas = getArea({ user, roles, regionalManager: details });

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
    { name: 'Date Joined', value: moment(dateJoined).format('lll') },
    {
      name: 'Area',
      value: area ? `${capitalize(area)} Region` : 'Area not assigned'
    }
  ];

  return <DetailsDisplay title="Regional Manager Info" data={rows} />;
};

RegionalManagerInfo.propTypes = {
  details: PropTypes.object
};

export default RegionalManagerInfo;
