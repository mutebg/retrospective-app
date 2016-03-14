
//import promise from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from '../reducers';


const createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
export default createStoreWithMiddleware(reducers);
