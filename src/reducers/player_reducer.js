import {
	FETCH_PLAYER_REQUEST,
	FETCH_PLAYER_SUCCESS,
	FETCH_PLAYER_FAILURE
} from '../actions/api_actions';

const initialState = {
	isLoading: false,
	error: null
};

const playerReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state)
	switch (action.type) {
		case FETCH_PLAYER_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_PLAYER_SUCCESS:
			return { ...nextState, player: action.payload, isLoading: false, error: null };
		case FETCH_PLAYER_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		default:
			return nextState;
	}
};

export default playerReducer;