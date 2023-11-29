// Action creators for creating and deleting notifications

import axios from 'axios';

// Action types

// CREATE
export const CREATE_NOTIFICATION_REQUEST = 'CREATE_NOTIFICATION_REQUEST';
export const CREATE_NOTIFICATION_SUCCESS = 'CREATE_NOTIFICATION_SUCCESS';
export const CREATE_NOTIFICATION_FAILURE = 'CREATE_NOTIFICATION_FAILURE';

export const createNotification = (notifData) => {
	return (dispatch) => {
		dispatch({ type: CREATE_NOTIFICATION_REQUEST, notif: notifData });
		return axios.post('/notifications/create', notifData)  // Assuming your backend endpoint for creating posts is '/posts/create'
			.then((response) => {
				dispatch({ type: CREATE_NOTIFICATION_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: CREATE_NOTIFICATION_FAILURE, payload: error.message });
			});
	};
};

// DELETE
export const DELETE_NOTIFICATION_REQUEST = 'DELETE_NOTIFICATION_REQUEST';
export const DELETE_NOTIFICATION_SUCCESS = 'DELETE_NOTIFICATION_SUCCESS';
export const DELETE_NOTIFICATION_FAILURE = 'DELETE_NOTIFICATION_FAILURE';

export const deleteNotification = (id) => {
	return (dispatch) => {
		dispatch({ type: DELETE_NOTIFICATION_REQUEST, id: id });
		return axios.delete(`/notifications/delete/${id}`)
			.then((response) => {
				dispatch({ type: DELETE_NOTIFICATION_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: DELETE_NOTIFICATION_FAILURE, payload: error.message });
			});
	};
};

// FETCH
export const FETCH_NOTIFICATIONS_REQUEST = 'FETCH_NOTIFICATIONS_REQUEST';
export const FETCH_NOTIFICATIONS_SUCCESS = 'FETCH_NOTIFICATIONS_SUCCESS';
export const FETCH_NOTIFICATIONS_FAILURE = 'FETCH_NOTIFICATIONS_FAILURE';

export const fetchNotifications = (userId) => {
	return (dispatch) => {
		dispatch({ type: FETCH_NOTIFICATIONS_REQUEST, userId: userId });
		return axios.get(`/notifications/fetch/${userId}`)
			.then((response) => {
				dispatch({ type: FETCH_NOTIFICATIONS_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: FETCH_NOTIFICATIONS_FAILURE, payload: error.message });
			})
	};
};

// Read all user notifications
export const READ_ALL_REQUEST = 'READ_ALL_REQUEST';
export const READ_ALL_SUCCESS = 'READ_ALL_SUCCESS';
export const READ_ALL_FAILURE = 'READ_ALL_FAILURE';

export const readAllNotifications = (userId) => {
	return (dispatch) => {
		dispatch({ type: READ_ALL_REQUEST, userId: userId });
		return axios.post(`/notifications/read-all/${userId}`)
			.then((response) => {
				dispatch({ type: READ_ALL_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: READ_ALL_FAILURE, payload: error.message });
			})
	};
};

// Read all user notifications
export const READ_NOTIF_REQUEST = 'READ_NOTIF_REQUEST';
export const READ_NOTIF_SUCCESS = 'READ_NOTIF_SUCCESS';
export const READ_NOTIF_FAILURE = 'READ_NOTIF_FAILURE';

export const setAsRead = (notifId) => {
	return (dispatch) => {
		dispatch({ type: READ_NOTIF_REQUEST, notifId: notifId });
		return axios.post(`/notifications/read/${notifId}`)
			.then((response) => {
				dispatch({ type: READ_NOTIF_SUCCESS, payload: response.data });
			})
			.catch((error) => {
				dispatch({ type: READ_NOTIF_FAILURE, payload: error.message });
			})
	};
};