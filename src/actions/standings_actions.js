import axios from 'axios';

// Action types
export const FETCH_STANDINGS_REQUEST = 'FETCH_STANDINGS_REQUEST';
export const FETCH_STANDINGS_SUCCESS = 'FETCH_STANDINGS_SUCCESS';
export const FETCH_STANDINGS_FAILURE = 'FETCH_STANDINGS_FAILURE';

// Action creators
export const fetchStandings = (leagueId) => {
	return (dispatch) => {
		dispatch({ type: FETCH_STANDINGS_REQUEST, leagueId: leagueId });
		return axios.get(`/standings/${leagueId}`)
			.then((response) => {
				dispatch({ type: FETCH_STANDINGS_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: FETCH_STANDINGS_FAILURE, payload: error.message });
			});
	};
};