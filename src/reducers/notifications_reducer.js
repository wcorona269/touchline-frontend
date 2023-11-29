import { 
	FETCH_NOTIFICATIONS_FAILURE, 
	FETCH_NOTIFICATIONS_REQUEST, 
	FETCH_NOTIFICATIONS_SUCCESS,
	READ_NOTIF_REQUEST,
	READ_NOTIF_SUCCESS,
	READ_NOTIF_FAILURE,
	READ_ALL_SUCCESS,
	READ_ALL_FAILURE,
	READ_ALL_REQUEST,
}
from "../actions/notification_actions";

const initialState = {
	isLoading: false,
	error: null
}

const notificationsReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case READ_NOTIF_REQUEST:
		case READ_ALL_REQUEST:
		case FETCH_NOTIFICATIONS_REQUEST:
			return { ...nextState, isLoading: true, error: null};
		case FETCH_NOTIFICATIONS_SUCCESS:
		case READ_ALL_SUCCESS:
			return { ...nextState, isLoading: false, error: null, notifications: action.payload['notifications'] };
		case READ_NOTIF_SUCCESS:
			const readNotification = action.payload['notification']
			return { ...nextState, 
				notifications: {
					...nextState.notifications,
					[readNotification.id]: readNotification
				},
				isLoading: false,
				error: null
			}
		case FETCH_NOTIFICATIONS_FAILURE:
		case READ_ALL_FAILURE:
		case READ_NOTIF_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload, notifications: null };
		default:
			return nextState;
	}
}

export default notificationsReducer;