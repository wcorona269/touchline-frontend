import {
	LOGIN_USER_REQUEST,
	LOGIN_USER_SUCCESS,
	LOGIN_USER_FAILURE,
	LOGOUT_USER_REQUEST,
	LOGOUT_USER_SUCCESS,
	REMOVE_SESSION_ERRORS,
	FETCH_USER_REQUEST,
	FETCH_USER_SUCCESS,
	FETCH_USER_FAILURE,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REGISTER_USER_REQUEST
} from '../actions/session_actions';

import { UPDATE_AVATAR_REQUEST, 
	UPDATE_AVATAR_SUCCESS,
	UPDATE_USER_REQUEST,
	UPDATE_USER_FAILURE,
	UPDATE_USER_SUCCESS
} from '../actions/user_actions';

const initialState = {
	user: null,
	isLoading: false,
	error: []
}

const sessionReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case LOGIN_USER_REQUEST:
		case FETCH_USER_REQUEST:
		case UPDATE_USER_REQUEST:
		case UPDATE_AVATAR_REQUEST:
		case REGISTER_USER_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case LOGOUT_USER_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_USER_SUCCESS:
		case UPDATE_AVATAR_SUCCESS:
		case UPDATE_USER_SUCCESS:
		case REGISTER_USER_SUCCESS:
			return { ...nextState, user: action.payload['user'], isLoading: false, error: null };
		case LOGIN_USER_SUCCESS:
			return { ...nextState, user: action.payload['user'], isLoading: false, error: null };
		case LOGOUT_USER_SUCCESS:
			return { ...nextState, user: null, isLoading: false, error: null };
		case FETCH_USER_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		case LOGIN_USER_FAILURE:
		case REGISTER_USER_FAILURE:
		case UPDATE_USER_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload};
		case REMOVE_SESSION_ERRORS:
			return { ...nextState, isLoading: false, error: null }
		default:
			return nextState;
	}
};

export default sessionReducer;