import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
    SET_APP_LANGUAGE,
    SET_SESSION_FLAG,
    SET_LANGUAGE_DETAILS,
} from '../types';
import { fetchPopularRepos } from '../../utils/api';

export const setLanguage = (val: string) => ({
    type: SET_APP_LANGUAGE,
    payload: val,
});

export const setSessionFlag = (val: boolean) => ({
    type: SET_SESSION_FLAG,
    payload: val,
});

export const setLanguageDetails = (val: any) => ({
    type: SET_LANGUAGE_DETAILS,
    payload: val,
})

export const getLanguageDetails = (val: string) => {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>)=> {
        fetchPopularRepos(val).then((repos: any)=> {
            console.log('inaction i', val, repos);
            dispatch(setLanguageDetails(repos))
        })
    }
}