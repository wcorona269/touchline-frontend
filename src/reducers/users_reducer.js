import { DELETE_POST_REQUEST, DELETE_POST_SUCCESS } from '../actions/post_actions';
import {
	REMOVE_USER_ERRORS,
	FETCH_USER_INFO_FAILURE,
	FETCH_USER_INFO_REQUEST,
	FETCH_USER_INFO_SUCCESS,
	FETCH_MORE_USER_POSTS_SUCCESS,
	FETCH_MORE_USER_REPOSTS_SUCCESS,
	FETCH_MORE_USER_LIKES_SUCCESS,
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
		case FETCH_MORE_USER_POSTS_SUCCESS:
			return { ...nextState, user: {
				...nextState.user,
				posts: { ...nextState.user.posts, ...action.payload['posts'] },
				posts_total_pages: action.payload['posts_total_pages'],
				posts_current_page: action.payload['posts_current_page'],
			}};
		case FETCH_MORE_USER_REPOSTS_SUCCESS:
			return { ...nextState, user: {
				...nextState.user,
				reposts: { ...nextState.user.reposts, ...action.payload['reposts'] },
				reposts_total_pages: action.payload['reposts_total_pages'],
				reposts_current_page: action.payload['reposts_current_page'],
			}};
		case FETCH_MORE_USER_LIKES_SUCCESS:
			return { ...nextState, user: {
				...nextState.user,
				likes: { ...nextState.user.likes, ...action.payload['likes'] },
				likes_total_pages: action.payload['likes_total_pages'],
				likes_current_page: action.payload['likes_current_page'],
			}};
		default:
			return nextState;
	}
};


export default usersReducer;