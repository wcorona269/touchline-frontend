import axiosInstance from './axios_instance.js';
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

// Action types
export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

// Action creators
export const registerUser = (userData) => {
	return (dispatch) => {
		dispatch({ type: REGISTER_USER_REQUEST });
		return axiosInstance.post('/auth/register', userData)
			.then((response) => {
				dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });
				// Login user after successful registration
				dispatch(loginUser(userData));
				dispatch(closeModal());
			})
			.catch((error) => {
				if (!!error?.response?.data?.message) {
					dispatch({ type: REGISTER_USER_FAILURE, payload: error.response.data.message });
				} else {
					dispatch({ type: REGISTER_USER_FAILURE, payload: 'Unknown error, please try again.' });
				}
    	});
	};
};

// Action creators
export const loginUser = (userData) => {
	return (dispatch) => {
		dispatch({ type: LOGIN_USER_REQUEST });
		return axiosInstance.post('/auth/login', userData)
			.then((response) => {
				dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
				dispatch(closeModal());
			})
			.catch((error) => {
				if (!!error?.response?.data?.message) {
					dispatch({ type: LOGIN_USER_FAILURE, payload: error.response.data.message });
				} else {
					dispatch({ type: LOGIN_USER_FAILURE, payload: error.message });
			}});
	};
};

export const logoutUser = (data) => {
	return (dispatch) => {
		dispatch({ type: LOGOUT_USER_REQUEST });
		axiosInstance.post('/auth/logout', data)
			.then((response) => {
				dispatch({ type: LOGOUT_USER_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: LOGOUT_USER_FAILURE, payload: error.message });
			});
	};
};

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchCurrentUser = () => {
	return (dispatch) => {
		dispatch({ type: FETCH_USER_REQUEST });
		return axiosInstance.get(`/protected`)
			.then((response) => {
				dispatch({ type: FETCH_USER_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: FETCH_USER_FAILURE, payload: error.message });
			});
	};
};