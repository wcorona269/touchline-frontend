import {
	FETCH_ALL_REPOSTS_SUCCESS,
	FETCH_ALL_REPOSTS_REQUEST,
	FETCH_ALL_REPOSTS_FAILURE,
	CREATE_REPOST_SUCCESS,
	CREATE_REPOST_FAILURE,
	CREATE_REPOST_REQUEST,
	DELETE_REPOST_FAILURE,
	DELETE_REPOST_SUCCESS,
	DELETE_REPOST_REQUEST
} from '../actions/post_actions'

const initialState = {
	isLoading: false,
	error: null,
	reposts: {}
}

const repostsReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case FETCH_ALL_REPOSTS_REQUEST:
		case CREATE_REPOST_REQUEST:
		case DELETE_REPOST_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case CREATE_REPOST_SUCCESS:
			const createdRepost = action.payload['repost']
			return {
				...nextState,
				isLoading: false,
				error: null,
				reposts: {
					...nextState.reposts,
					[createdRepost.id]: createdRepost
				}
			}
		case DELETE_REPOST_SUCCESS:
			const deletedRepostId = action.payload['repostId']
			const filteredReposts = nextState.reposts.filter((repost) => repost.id !== deletedRepostId)
			return { ...nextState, isLoading: false, error: null, reposts: filteredReposts}
		case FETCH_ALL_REPOSTS_SUCCESS:
			const newReposts = action.payload['reposts']
			return { ...nextState, 
				isLoading: false, 
				error: null, 
				reposts: {
					...nextState.reposts,
					...newReposts
				}
			};
		case FETCH_ALL_REPOSTS_FAILURE:
		case CREATE_REPOST_FAILURE:
		case DELETE_REPOST_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload, reposts: null }
		default:
			return nextState;
	}
}

export default repostsReducer;