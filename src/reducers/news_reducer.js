import {
	FETCH_NEWS_REQUEST,
	FETCH_NEWS_SUCCESS,
	FETCH_NEWS_FAILURE,
	FETCH_TOP_STORIES_FAILURE,
	FETCH_TOP_STORIES_REQUEST,
	FETCH_TOP_STORIES_SUCCESS
} from '../actions/news_actions';

const initialState = {
	isLoading: false,
	error: null
};

const newsReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case FETCH_NEWS_REQUEST:
		case FETCH_TOP_STORIES_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_NEWS_SUCCESS:
			return { ...nextState, news: action.payload, isLoading: false, error: null };
		case FETCH_TOP_STORIES_SUCCESS:
			return { ...nextState, top_stories: action.payload, isLoading: false, error: null }
		case FETCH_NEWS_FAILURE:
		case FETCH_TOP_STORIES_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		default:
			return nextState;
	}
};

export default newsReducer;