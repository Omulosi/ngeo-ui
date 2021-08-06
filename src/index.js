import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import * as serviceWorker from './serviceWorker';

import App from './App';
import store from './redux/store';

// loads leaflet CSS
import 'leaflet/dist/leaflet.css';
import 'leaflet-draw/dist/leaflet.draw.css';
// react quill
import 'react-quill/dist/quill.snow.css';
import './index.css';

const { EventEmitter } = require('fbemitter');

const queryClient = new QueryClient();

// GLOBAL VARIABLES
window.map = null; // Global map object
window.emitter = new EventEmitter(); // For listening/broadcasting events
window.popup = null; // One popup for everything
window.isDrawingOrEditing = false;

/* eslint-disable */
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
