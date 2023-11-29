import axios from 'axios';
import { closeModal } from './modal_actions';

// Action types
export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS';
export const LOGOUT_USER_FAILURE = 'LOGOUT_USER_FAILURE';

export const REMOVE_SESSION_ERRORS = 'REMOVE_SESSION_ERRORS'

export const removeSessionErrors = () => ({
	type: REMOVE_SESSION_ERRORS
});


// Action creators
export const loginUser = (userData) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER_REQUEST });
		return axios.post('/auth/login', userData)
			.then((response) => {
				dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
				dispatch(closeModal());
			})
			.catch((error) => {
			if (error.response && error.response.data && error.response.data.message) {
				dispatch({ type: LOGIN_USER_FAILURE, payload: error.response.data.message });
			} else {
				dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
		}});
	};
};


export const logoutUser = (data) => {
	return (dispatch) => {
		dispatch({ type: LOGOUT_USER_REQUEST });
		axios.post('/auth/logout', data)
			.then((response) => {
				dispatch({ type: LOGOUT_USER_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: LOGOUT_USER_FAILURE, payload: error.message });
			});
	};
};


// update User
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const updateUser = (userInfo) => {
	return (dispatch) => {
		dispatch({ type: UPDATE_USER_REQUEST, userData: userInfo });
		axios.post(`/auth/update`, userInfo)
			.then((response) => {
				dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
			});
	};
}


export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchCurrentUser = () => {
	return (dispatch) => {
		dispatch({ type: FETCH_USER_REQUEST });
		return axios
			.get(`/protected`)
			.then((response) => {
				dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
				return response.data; // Return user data if needed
			})
			.catch((error) => {
				dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
				throw error; // Throw error to handle it in the component
			});
	};
};