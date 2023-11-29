import {
	FETCH_LEAGUE_REQUEST,
	FETCH_LEAGUE_SUCCESS,
	FETCH_LEAGUE_FAILURE,
	REMOVE_COMPETITION,
	FETCH_LEAGUES_INDEX_REQUEST,
	FETCH_LEAGUES_INDEX_SUCCESS
} from '../actions/api_actions';

const initialState = {
	isLoading: false,
	error: null,
};

const leaguesReducer = (state = initialState, action) => {
	Object.freeze(state)
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case FETCH_LEAGUE_REQUEST:
		case FETCH_LEAGUES_INDEX_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_LEAGUES_INDEX_SUCCESS:
			return {
				...nextState,
				isLoading: false,
				error: null,
				index: action.payload['all_leagues'],
				top_leagues: action.payload['top_leagues']
			}
		case FETCH_LEAGUE_SUCCESS:
			const { standings, 'top scorers': topScorers, 'top assists': topAssists, fixtures, news } = action.payload;
			return {
				...nextState,
				standings: [ ...standings ],
				top_scorers: Array.isArray(topScorers) ? [...topScorers] : { ...topScorers },
				top_assists: Array.isArray(topAssists) ? [...topAssists] : { ...topAssists },
				fixtures: Array.isArray(fixtures) ? [...fixtures] : { ...fixtures },
				news: Array.isArray(news) ? [...news] : { ...news },
				isLoading: false,
				error: null
			};
		case FETCH_LEAGUE_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		case REMOVE_COMPETITION:
			return { isLoading: false, error: null };
		default:
			return nextState;
	}
};

export default leaguesReducer;