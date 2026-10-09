import axiosInstance from './axios_instance.js';
import { loginUser } from './session_actions';
import { closeModal } from './modal_actions';
export const REMOVE_USER_ERRORS = 'REMOVE_USER_ERRORS'

export const removeUserErrors = () => ({
	type: REMOVE_USER_ERRORS
});

// Action types
export const FETCH_USER_INFO_REQUEST = 'FETCH_USER_INFO_REQUEST';
export const FETCH_USER_INFO_SUCCESS = 'FETCH_USER_INFO_SUCCESS';
export const FETCH_USER_INFO_FAILURE = 'FETCH_USER_INFO_FAILURE';

export const fetchUserInfo = (username) => {
	return (dispatch) => {
		dispatch({ type: FETCH_USER_INFO_REQUEST });
		axiosInstance.get(`/users/info/${username}`)
			.then((response) => {
				dispatch({ type: FETCH_USER_INFO_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: FETCH_USER_INFO_FAILURE, payload: error.message });
			});
	};
};

// load more profile posts/reposts/likes (profile tabs load page 1 up front via
// fetchUserInfo; these fetch additional pages and get merged into existing state)
export const FETCH_MORE_USER_POSTS_SUCCESS = 'FETCH_MORE_USER_POSTS_SUCCESS';
export const FETCH_MORE_USER_REPOSTS_SUCCESS = 'FETCH_MORE_USER_REPOSTS_SUCCESS';
export const FETCH_MORE_USER_LIKES_SUCCESS = 'FETCH_MORE_USER_LIKES_SUCCESS';

export const fetchMoreUserPosts = (username, page) => {
	return (dispatch) => {
		axiosInstance.get(`/users/info/${username}?posts_page=${page}`)
			.then((response) => {
				dispatch({ type: FETCH_MORE_USER_POSTS_SUCCESS, payload: response.data['user'] });
			})
			.catch((error) => {
				dispatch({ type: FETCH_USER_INFO_FAILURE, payload: error.message });
			});
	};
};

export const fetchMoreUserReposts = (username, page) => {
	return (dispatch) => {
		axiosInstance.get(`/users/info/${username}?reposts_page=${page}`)
			.then((response) => {
				dispatch({ type: FETCH_MORE_USER_REPOSTS_SUCCESS, payload: response.data['user'] });
			})
			.catch((error) => {
				dispatch({ type: FETCH_USER_INFO_FAILURE, payload: error.message });
			});
	};
};

export const fetchMoreUserLikes = (username, page) => {
	return (dispatch) => {
		axiosInstance.get(`/users/info/${username}?likes_page=${page}`)
			.then((response) => {
				dispatch({ type: FETCH_MORE_USER_LIKES_SUCCESS, payload: response.data['user'] });
			})
			.catch((error) => {
				dispatch({ type: FETCH_USER_INFO_FAILURE, payload: error.message });
			});
	};
};

export const UPDATE_AVATAR_REQUEST = 'UPDATE_AVATAR_REQUEST'
export const UPDATE_AVATAR_SUCCESS = 'UPDATE_AVATAR_SUCCESS'
export const UPDATE_AVATAR_FAILURE = 'UPDATE_AVATAR_FAILURE'

export const updateAvatar = (username, formData) => {
  return (dispatch) => {
    dispatch({ type: UPDATE_AVATAR_REQUEST });
    axiosInstance.post(`/users/update-avatar/${username}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        dispatch({ type: UPDATE_AVATAR_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_AVATAR_FAILURE, payload: error.message });
      });
  };
};

// update User
export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

export const updateUser = (userInfo) => {
	return (dispatch) => {
		dispatch({ type: UPDATE_USER_REQUEST, userData: userInfo });
		axiosInstance.patch(`/users/update`, userInfo)
			.then((response) => {
				dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: UPDATE_USER_FAILURE, payload: error.message });
			});
	};
}
