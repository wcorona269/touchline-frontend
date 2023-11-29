import {
	FETCH_MATCH_REQUEST,
	FETCH_MATCH_SUCCESS,
	FETCH_MATCH_FAILURE
} from '../actions/api_actions';

const initialState = {
	isLoading: false,
	error: null
};

const matchReducer = (state = initialState, action) => {
	Object.freeze(state)
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case FETCH_MATCH_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_MATCH_SUCCESS:
			return { ...nextState, match: action.payload, isLoading: false, error: null };
		case FETCH_MATCH_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		default:
			return nextState;
	}
};

export default matchReducer;