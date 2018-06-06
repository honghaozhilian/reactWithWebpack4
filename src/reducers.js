import {combineReducers} from "redux";

import counter from 'components/Home/reducer';
import user from 'components/User/reducer';


export default combineReducers({
    counter,
    user
});