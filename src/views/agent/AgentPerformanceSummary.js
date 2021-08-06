// import React from 'react';
// import { Grid, makeStyles } from '@material-ui/core';
// import TotalsCard from 'src/components/reports/TotalsCard';
// import ProgressCard from 'src/components/reports/ProgressCard';
// import FolderIcon from '@material-ui/icons/Folder';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: theme.spacing(1)
//   }
// }));

// /* eslint-disable */
// const AgentPerformanceSummary = ({ data }) => {
//   const classes = useStyles();
//   let progress = 0;
//   if (data) {
//     if (data.attributes.projects.features.length) {
//       progress =
//         (100 * data.attributes.returns.length) /
//         data.attributes.projects.features.length;
//     }
//   }
//   return (
//     <Grid container spacing={3} className={classes.root}>
//       <Grid item lg={3} sm={6} xl={3} xs={12}>
//         <TotalsCard
//           title="TOTAL PROJECTS"
//           totalsValue={data ? data.attributes.projects.features.length : 0}
//           changeDuration="Since last month"
//           icon={<FolderIcon />}
//         />
//       </Grid>
//       <Grid item lg={3} sm={6} xl={3} xs={12}>
//         <TotalsCard
//           title="TOTAL PETURNS"
//           totalsValue={data ? data.attributes.returns.length : 0}
//           changeDuration="Since last week"
//         />
//       </Grid>
//       <Grid item lg={3} sm={6} xl={3} xs={12}>
//         <ProgressCard title="PROGRESS" progress={progress} />
//       </Grid>
//     </Grid>
//   );
// };

// export default AgentPerformanceSummary;
