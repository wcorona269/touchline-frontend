import { FETCH_STANDINGS_REQUEST, FETCH_STANDINGS_SUCCESS, FETCH_STANDINGS_FAILURE } from "../actions/standings_actions";

const initialState = {
	isLoading: false,
	error: null
};

const standingsReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case FETCH_STANDINGS_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_STANDINGS_SUCCESS:
			return {
				...nextState,
				standings: action.payload,
				isLoading: false,
				error: null
			};
		case FETCH_STANDINGS_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		default:
			return nextState;
	}
};

export default standingsReducer;