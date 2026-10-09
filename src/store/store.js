import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../reducers/root_reducer';

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		const middleware = getDefaultMiddleware();
		if (process.env.NODE_ENV === 'development') {
			const logger = require('redux-logger').default;
			return middleware.concat(logger);
		}
		return middleware;
	}
})

export default store;