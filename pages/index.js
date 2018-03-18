import React from 'react'
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import App from '../modules/App/App'

import IntlWrapper from '../modules/Intl/IntlWrapper'
import { configureStore } from '../client/store';
import routes from '../client/routes';

const store = configureStore({});

const AppContainer = () => {
  return (
    <Provider store={store}>
      <IntlWrapper >
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </IntlWrapper>
    </Provider>
  )
}


export default AppContainer