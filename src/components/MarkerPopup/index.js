import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popup from 'react-leaflet-editable-popup';
import Item from './Item';

const useStyles = makeStyles(() => ({
  popup: {
    width: '250px',
    background: '#fff',
    borderRadius: '0',
    boxShadow: '0 1px 2px rgba(0,0,0,.1)',
    padding: 0,
    margin: 0
  }
}));

const MarkerPopup = () => {
  const classes = useStyles();

  const nameInput = React.createRef();
  const valInput = React.createRef();

  //   const [property, setProperty] = useState({});

  const onNameChange = () => {
    console.log(nameInput.current.value);
  };

  const saveContent = (content) => {
    console.log(`====> Popup content: ${content}`);
  };

  return (
    <Popup
      className={classes.popup}
      removable
      editable
      saveContentCallback={saveContent}
    >
      <div className="">
        <Item
          nameInput={nameInput}
          valInput={valInput}
          onNameChange={onNameChange}
        />
      </div>
    </Popup>
  );
};

export default MarkerPopup;
