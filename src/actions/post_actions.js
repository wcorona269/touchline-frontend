import axios from 'axios';

// fetch all posts
export const FETCH_ALL_POSTS_REQUEST = 'FETCH_ALL_POSTS_REQUEST'
export const FETCH_ALL_POSTS_SUCCESS = 'FETCH_ALL_POSTS_SUCCESS'
export const FETCH_ALL_POSTS_FAILURE = 'FETCH_ALL_POSTS_FAILURE'

export const fetchPosts = (page = 1, perPage = 10) => {
	return (dispatch) => {
		dispatch({ type: FETCH_ALL_POSTS_REQUEST });
		return axios.get(`/posts/index?page=${page}&per_page=${perPage}`)
			.then((response) => {
				dispatch({ type: FETCH_ALL_POSTS_SUCCESS, payload: response.data })
			})
			.catch((error) => {
				dispatch({ type: FETCH_ALL_POSTS_FAILURE, payload: error.message })
			})
	}
}


// fetch individual post
export const FETCH_POST_REQUEST = 'FETCH_POST_REQUEST'
export const FETCH_POST_SUCCESS = 'FETCH_POST_SUCCESS'
export const FETCH_POST_FAILURE = 'FETCH_POST_FAILURE'

export const fetchPost = (postId) => {
	return (dispatch) => {
		dispatch({ type: FETCH_POST_REQUEST });
		return axios.get(`/posts/fetch/one/${postId}`)
			.then((response) => {
				dispatch({ type: FETCH_POST_SUCCESS, payload: response.data })
			})
			.catch((error) => {
				dispatch({ type: FETCH_POST_FAILURE, payload: error.message })
			})
	}
}


// fetch user posts
export const FETCH_USER_POSTS_REQUEST = 'FETCH_USER_POSTS_REQUEST'
export const FETCH_USER_POSTS_SUCCESS = 'FETCH_USER_POSTS_SUCCESS'
export const FETCH_USER_POSTS_FAILURE = 'FETCH_USER_POSTS_FAILURE'

export const fetchUserPosts = (userId) => {
	return (dispatch) => {
		dispatch({ type: FETCH_USER_POSTS_REQUEST });
		return axios.get(`/posts/fetch/${userId}`)
		.then((response) => {
			dispatch({ type: FETCH_USER_POSTS_SUCCESS })
		})
		.catch((error) => {
			dispatch({ type: FETCH_USER_POSTS_FAILURE, payload: error.message })
		})
	}
}


// create post
export const CREATE_POST_REQUEST = 'CREATE_POST_REQUEST';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const CREATE_POST_SUCCESS = 'CREATE_POST_SUCCESS';

export const createPost = (postData) => {
	return (dispatch) => {
		dispatch({ type: CREATE_POST_REQUEST });
		return axios.post('/posts/create', postData)
			.then((response) => {
				dispatch({ type: CREATE_POST_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: CREATE_POST_FAILURE, payload: error.message });
			});
	};
};


// create post like
export const CREATE_LIKE_REQUEST = 'CREATE_LIKE_REQUEST';
export const CREATE_LIKE_SUCCESS = 'CREATE_LIKE_SUCCESS';
export const CREATE_LIKE_FAILURE = 'CREATE_LIKE_FAILURE';

export const createLike = (likeData) => {
	return (dispatch) => {
		dispatch({ type: CREATE_LIKE_REQUEST });
		return axios.post('/likes/create', likeData)
			.then((response) => {
				dispatch({ type: CREATE_LIKE_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: CREATE_LIKE_FAILURE, payload: error.message });
			});
	};
}


// remove post like
export const DELETE_LIKE_REQUEST = 'DELETE_LIKE_REQUEST'
export const DELETE_LIKE_SUCCESS = 'DELETE_LIKE_SUCCESS'
export const DELETE_LIKE_FAILURE = 'DELETE_LIKE_FAILURE'

export const deleteLike = (likeData) => {
	return (dispatch) => {
		dispatch({ type: DELETE_LIKE_REQUEST, likeData: likeData });
			return axios.delete('/likes/delete', {
				headers: {
					'Content-Type': 'application/json',
				},
				data: likeData, // The data you want to send in the request body
			})
			.then((response) => {
				dispatch({ type: DELETE_LIKE_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: DELETE_LIKE_FAILURE, payload: error.message });
			});
	};
}


// create repost
export const CREATE_REPOST_REQUEST = 'CREATE_REPOST_REQUEST'
export const CREATE_REPOST_SUCCESS =  'CREATE_REPOST_SUCCESS'
export const CREATE_REPOST_FAILURE = 'CREATE_REPOST_FAILURE'

export const createRepost = (repostData) => {
	return (dispatch) => {
		dispatch({ type: CREATE_REPOST_REQUEST, repostData: repostData });
			axios.post('/reposts/create', repostData)
			.then((response) => {
				dispatch({ type: CREATE_REPOST_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: CREATE_REPOST_FAILURE, payload: error.message });
			});
	};
}


// delete repost
export const DELETE_REPOST_REQUEST = 'DELETE_REPOST_REQUEST'
export const DELETE_REPOST_SUCCESS =  'DELETE_REPOST_SUCCESS'
export const DELETE_REPOST_FAILURE = 'DELETE_REPOST_FAILURE'

export const deleteRepost = (repostData) => {
	return (dispatch) => {
		dispatch({ type: DELETE_REPOST_REQUEST, repostData: repostData });
			return axios.delete(`/reposts/delete`, {
				data: repostData
			})
			.then((response) => {
				dispatch({ type: DELETE_REPOST_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: DELETE_REPOST_FAILURE, payload: error.message });
			});
	};
}


// delete repost
export const FETCH_ALL_REPOSTS_REQUEST = 'FETCH_ALL_REPOSTS_REQUEST';
export const FETCH_ALL_REPOSTS_SUCCESS = 'FETCH_ALL_REPOSTS_SUCCESS';
export const FETCH_ALL_REPOSTS_FAILURE = 'FETCH_ALL_REPOSTS_FAILURE';

export const fetchReposts = (page = 1, perPage = 10) => {
	return (dispatch) => {
		dispatch({ type: FETCH_ALL_REPOSTS_REQUEST });
		return axios.get(`/reposts/index?page=${page}&per_page=${perPage}`)
			.then((response) => {
				dispatch({ type: FETCH_ALL_REPOSTS_SUCCESS, payload: response.data })
			})
			.catch((error) => {
				dispatch({ type: FETCH_ALL_REPOSTS_FAILURE, payload: error.message })
			})
	}
}