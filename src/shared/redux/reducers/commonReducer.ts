import { SET_APP_LANGUAGE, SET_SESSION_FLAG, SET_LANGUAGE_DETAILS } from '../types';
import { store } from './';

const INITIAL_STATE: store["commonReducer"] = {
    languagecode: 'en_CA',
    isSessionValid: false,
    gridRepos: [],
};

export default (state = INITIAL_STATE, action: any) => {
    switch (action.type) {
        case SET_APP_LANGUAGE:
            return {
                ...state,
                languagecode: action.payload,

            };
        case SET_SESSION_FLAG:
            return {
                ...state,
                isSessionValid: action.payload
            };
        case SET_LANGUAGE_DETAILS:
            console.log('in reduser', action.payload);
            return {
                ...state,
                gridRepos: action.payload
            };
        default:
            return state;
    }
};
