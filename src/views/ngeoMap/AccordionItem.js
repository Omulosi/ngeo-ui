import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const Accordion = withStyles({
  root: {
    color: '#fff',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0
    },
    '&:before': {
      display: 'none'
    },
    '&$expanded': {
      margin: 'auto'
    }
  },
  expanded: {}
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    color: 'rgb(238,238,238)',
    backgroundColor: 'rgb(35, 48, 68)',
    cursor: 'pointer',
    transition: 'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    minHeight: 50,
    '&$expanded': {
      minHeight: 50
    },
    '& .MuiAccordionSummary-content': {
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    '&:hover': {
      textDecoration: 'none',
      backgroundColor: 'rgba(35, 48, 68, 0.97)'
    }
  },
  content: {
    '&$expanded': {}
  },
  expanded: {}
})(MuiAccordionSummary);

const AccordionDetails = withStyles(() => ({
  root: {
    flexDirection: 'column',
    padding: 0,
    color: '#263238'
  }
}))(MuiAccordionDetails);

const useStyles = makeStyles({
  text: {
    fontSize: '0.9rem'
  }
});

/* eslint-disable */
export default function AccordionItem({ title, children }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion square expanded={expanded} onChange={toggleExpand}>
        <AccordionSummary
          aria-controls="panel-content"
          id="panel-header"
          expandIcon={<ExpandMoreIcon />}
        >
          <Typography className={classes.text}>{title}</Typography>
        </AccordionSummary>
        <AccordionDetails>{children}</AccordionDetails>
      </Accordion>
    </div>
  );
}
