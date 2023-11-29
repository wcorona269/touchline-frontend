import {
	REGISTER_USER_REQUEST,
	REGISTER_USER_SUCCESS,
	REGISTER_USER_FAILURE,
	REMOVE_USER_ERRORS,
	FETCH_USER_INFO_FAILURE,
	FETCH_USER_INFO_REQUEST,
	FETCH_USER_INFO_SUCCESS,
	UPDATE_AVATAR_REQUEST,
	UPDATE_AVATAR_SUCCESS
} from '../actions/user_actions';

const initialState = {
	users: [],
	user: null,
	isLoading: false,
	error: null
};

const usersReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case REGISTER_USER_REQUEST:
		case UPDATE_AVATAR_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case REGISTER_USER_SUCCESS:
			return { ...nextState, isLoading: false, error: null };
		case REGISTER_USER_FAILURE:
		case FETCH_USER_INFO_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		case REMOVE_USER_ERRORS:
			return { ...nextState, isLoading: false, error: null };
		case FETCH_USER_INFO_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_USER_INFO_SUCCESS:
		case UPDATE_AVATAR_SUCCESS:
			return { ...nextState, isLoading: false, users: action.payload }; 
		default:
			return nextState;
	}
};

export default usersReducer;