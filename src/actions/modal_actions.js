// ACTION CREATORS
export const SHOW_MODAL = 'SHOW_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const showModal = (modal) => ({
	type: SHOW_MODAL,
	modal: modal
})

export const closeModal = () => ({
	type: CLOSE_MODAL,
})