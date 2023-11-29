import {
	FETCH_FAVORITES_FAILURE, 
	FETCH_FAVORITES_REQUEST, 
	FETCH_FAVORITES_SUCCESS,
	CREATE_FAVORITE_REQUEST,
	CREATE_FAVORITE_SUCCESS,
	CREATE_FAVORITE_FAILURE,
	DELETE_FAVORITE_FAILURE,
	DELETE_FAVORITE_REQUEST,
	DELETE_FAVORITE_SUCCESS
} from '../actions/favorite_actions';

const initialState = {
	isLoading: false,
	error: null
};

const favoritesReducer = (state = initialState, action) => {
	Object.freeze(state)
	let nextState = Object.assign({}, state)
	switch (action.type) {
		case FETCH_FAVORITES_REQUEST:
		case CREATE_FAVORITE_REQUEST:
		case DELETE_FAVORITE_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_FAVORITES_SUCCESS:
			return { ...nextState, isLoading: false, favorites: action.payload['favorites'] };
		case CREATE_FAVORITE_SUCCESS:
			const newFavorite = action.payload['favorite']
			return { ...nextState, favorites: [...nextState.favorites, newFavorite], isLoading: false };
		case DELETE_FAVORITE_SUCCESS:
			const deletedFavoriteId = action.payload['id']
			const updatedFavorites = nextState.favorites.filter(
				(favorite) => favorite.id !== deletedFavoriteId
			);
			return { ...nextState, favorites: updatedFavorites, isLoading: false };
		case FETCH_FAVORITES_FAILURE:
		case CREATE_FAVORITE_FAILURE:
		case DELETE_FAVORITE_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload };
		default:
			return nextState;
	}
};

export default favoritesReducer;