import App from '../modules/App/App'
import { Provider } from 'react-redux';
import IntlWrapper from '../modules/Intl/IntlWrapper'
import { configureStore } from '../modules/store';

const store = configureStore({});

const AppContainer = () => {
  return (
    <Provider store={store}>
      <IntlWrapper >
        <App />
      </IntlWrapper>
    </Provider>
  )
}


export default AppContainer