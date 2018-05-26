import {createStore ,applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import PolymerRedux from 'polymer-redux';
import reducer from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk),
  // The best part 8)
  compose(
    window.devToolsExtension
      ? window.devToolsExtension()
      : v => v
  )
);

export const ReduxMixin = PolymerRedux(store);
