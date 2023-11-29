import axios from 'axios';

// Action types
// Fetch news
export const FETCH_NEWS_REQUEST = 'FETCH_NEWS_REQUEST';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

// Action creators
export const fetchNews = (favorites) => {
	return (dispatch) => {
		dispatch({ type: FETCH_NEWS_REQUEST });
		return axios.post (`/news/all`, { favNames: favorites })
		.then((response) => {
			dispatch({ type: FETCH_NEWS_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_NEWS_FAILURE, payload: error.message })
		})
	}
}
// Action types
// Fetch news
export const FETCH_TOP_STORIES_REQUEST = 'FETCH_TOP_STORIES_REQUEST';
export const FETCH_TOP_STORIES_SUCCESS = 'FETCH_TOP_STORIES_SUCCESS';
export const FETCH_TOP_STORIES_FAILURE = 'FETCH_TOP_STORIES_FAILURE';

// Action creators
export const fetchTopStories = () => {
	return (dispatch) => {
		dispatch({ type: FETCH_TOP_STORIES_REQUEST });
		return axios.post(`/news/top`)
		.then((response) => {
			dispatch({ type: FETCH_TOP_STORIES_SUCCESS, payload: response.data });
		})
		.catch((error) => {
			dispatch({ type: FETCH_TOP_STORIES_FAILURE, payload: error.message })
		})
	}
}