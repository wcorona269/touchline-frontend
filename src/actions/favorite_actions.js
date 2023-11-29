import axios from 'axios'

// Fetch favorites for current user
export const FETCH_FAVORITES_REQUEST = 'FETCH_FAVORITES_REQUEST'
export const FETCH_FAVORITES_SUCCESS = 'FETCH_FAVORITES_SUCCESS'
export const FETCH_FAVORITES_FAILURE = 'FETCH_FAVORITES_FAILURE'

export const fetchFavorites = (userId) => {
	return (dispatch) => {
		dispatch({ type: FETCH_FAVORITES_REQUEST });
		axios.get(`/favorite/fetch/${userId}`)
			.then((response) => {
				dispatch({ type: FETCH_FAVORITES_SUCCESS, payload: response.data })
			})
			.catch((error) => {
				dispatch({ type: FETCH_FAVORITES_FAILURE, payload: error.message })
			})
	}
}

// create favorite
export const CREATE_FAVORITE_REQUEST = 'CREATE_FAVORITE_REQUEST';
export const CREATE_FAVORITE_SUCCESS = 'CREATE_FAVORITE_SUCCESS';
export const CREATE_FAVORITE_FAILURE = 'CREATE_FAVORITE_FAILURE';

export const createFavorite = (favInfo) => {
	return (dispatch) => {
		dispatch({ type: CREATE_FAVORITE_REQUEST, favInfo: favInfo });
		axios.post(`/favorite/create`, favInfo)
			.then((response) => {
				dispatch({ type: CREATE_FAVORITE_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: CREATE_FAVORITE_FAILURE, payload: error.message });
			});
	};
};

// delete favorite
export const DELETE_FAVORITE_REQUEST = 'DELETE_FAVORITE_REQUEST';
export const DELETE_FAVORITE_SUCCESS = 'DELETE_FAVORITE_SUCCESS';
export const DELETE_FAVORITE_FAILURE = 'DELETE_FAVORITE_FAILURE';

export const deleteFavorite = (favId) => {
	return (dispatch) => {
		dispatch({ type: DELETE_FAVORITE_REQUEST, favId: favId });
		axios.delete(`/favorite/delete/${favId}`)
			.then((response) => {
				dispatch({ type: DELETE_FAVORITE_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: DELETE_FAVORITE_FAILURE, payload: error.message });
			});
	};
};
