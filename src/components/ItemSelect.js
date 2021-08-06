// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import { useBorderSelectStyles } from '@mui-treasury/styles/select/border';
// import Select from '@material-ui/core/Select';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormControl from '@material-ui/core/FormControl';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// // Original design here: https://github.com/siriwatknp/mui-treasury/issues/541

// const BorderSelect = ({ label, listItems }) => {
//   const [val, setVal] = useState(1);

//   const handleChange = (event) => {
//     setVal(event.target.value);
//   };

//   const borderSelectClasses = useBorderSelectStyles();

//   // moves the menu below the select input
//   const menuProps = {
//     classes: {
//       list: borderSelectClasses.list
//     },
//     anchorOrigin: {
//       vertical: 'bottom',
//       horizontal: 'left'
//     },
//     transformOrigin: {
//       vertical: 'top',
//       horizontal: 'left'
//     },
//     getContentAnchorEl: null
//   };

//   const iconComponent = () => {
//     return <ExpandMoreIcon className={borderSelectClasses.icon} />;
//   };

//   return (
//     <FormControl>
//       <InputLabel className={borderSelectClasses.label} id="inputLabel">
//         {label}
//       </InputLabel>
//       <Select
//         disableUnderline
//         classes={{ root: borderSelectClasses.select }}
//         labelId="inputLabel"
//         IconComponent={iconComponent}
//         MenuProps={menuProps}
//         value={val}
//         onChange={handleChange}
//       >
//         <MenuItem value={0}>None</MenuItem>
//         {listItems.map((item) => (
//           <MenuItem value={item.value}>{item.name}</MenuItem>
//         ))}
//       </Select>
//     </FormControl>
//   );
// };

// BorderSelect.propTypes = {
//   label: PropTypes.string,
//   listItems: PropTypes.array
// };

// export default BorderSelect;
