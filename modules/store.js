import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

export function configureStore(initialState = {}) {
  const store = createStore(rootReducer, initialState);

  console.log(store.getState());

  return store;
}
