import {
	FETCH_CLUB_REQUEST,
	FETCH_CLUB_SUCCESS,
	FETCH_CLUB_FAILURE,
	REMOVE_CLUB
} from '../actions/api_actions';

const initialState = {
	isLoading: false,
	error: null
};

const clubReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state)
	switch (action.type) {
		case FETCH_CLUB_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_CLUB_SUCCESS:
			return {
				...nextState,
				club: action.payload['club'],
				squad: action.payload['squad'],
				fixtures: action.payload['fixtures'],
				seasons: action.payload['seasons'],
				stats: action.payload['stats'],
				news: action.payload['news'],
				isLoading: false,
				error: null
			};
		case FETCH_CLUB_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		case REMOVE_CLUB:
			return { ...nextState, isLoading: false, error: null }
		default:
			return nextState;
	}
};

export default clubReducer;