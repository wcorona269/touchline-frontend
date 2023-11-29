import {
	SHOW_MODAL,
	CLOSE_MODAL
} from '../actions/modal_actions'

const modalReducer = (oldState = {}, action) => {
	Object.freeze(oldState);
	let nextState = Object.assign({}, oldState)

	switch (action.type) {
		case SHOW_MODAL:
			return { ...nextState, modal: action.modal }
		case CLOSE_MODAL:
			return {}
		default:
			return nextState;
	}
}

export default modalReducer;