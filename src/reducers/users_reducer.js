import { DELETE_POST_REQUEST, DELETE_POST_SUCCESS } from '../actions/post_actions';
import {
	REMOVE_USER_ERRORS,
	FETCH_USER_INFO_FAILURE,
	FETCH_USER_INFO_REQUEST,
	FETCH_USER_INFO_SUCCESS,
	UPDATE_AVATAR_REQUEST,
	UPDATE_AVATAR_SUCCESS,
	UPDATE_AVATAR_FAILURE
} from '../actions/user_actions';

const initialState = {
	user: null,
	isLoading: false,
	error: null
};

const usersReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state);
	switch (action.type) {
		// case DELETE_POST_REQUEST:
		case UPDATE_AVATAR_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		// case DELETE_POST_SUCCESS:
		// 	debugger;
		// 	return { 
		// 		...nextState,
		// 		isLoading:false,
		// 		error: null
		// 	}
		case FETCH_USER_INFO_FAILURE:
		case UPDATE_AVATAR_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		case REMOVE_USER_ERRORS:
			return { ...nextState, isLoading: false, error: null };
		case FETCH_USER_INFO_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_USER_INFO_SUCCESS:
			return { ...nextState, isLoading: false, user: action.payload['user'] }; 
		case UPDATE_AVATAR_SUCCESS:
			return { ...nextState, isLoading: false, user: action.payload['user_info'] };
		default:
			return nextState;
	}
};


export default usersReducer;