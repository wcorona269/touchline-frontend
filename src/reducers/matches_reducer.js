import {
	FETCH_MATCHES_REQUEST,
	FETCH_MATCHES_SUCCESS,
	FETCH_MATCHES_FAILURE,
	FETCH_LIVE_MATCHES_REQUEST,
	FETCH_LIVE_MATCHES_SUCCESS,
	FETCH_LIVE_MATCHES_FAILURE,
} from '../actions/api_actions';

const initialState = {
	isLoading: false,
	error: null
};

const matchesReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case FETCH_MATCHES_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_MATCHES_SUCCESS:
			return { ...nextState, matches: action.payload['matches'], isLoading: false, error: null };
		case FETCH_MATCHES_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload['message'] };
		case FETCH_LIVE_MATCHES_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_LIVE_MATCHES_SUCCESS:
			return { ...nextState, live: action.payload['matches'], isLoading: false, error: null };
		case FETCH_LIVE_MATCHES_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload['message'] };
		default:
			return nextState;
	}
};

export default matchesReducer;