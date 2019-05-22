import { combineReducers } from 'redux';
import commonReducer from './commonReducer';

export default combineReducers({
    commonReducer,
});

export interface store {
    commonReducer: {
        languagecode: string;
        isSessionValid:boolean;
        gridRepos: any[];
    };
}