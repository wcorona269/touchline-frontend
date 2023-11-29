import React, { useEffect, useState }from 'react'
import { Navigate } from 'react-router-dom';
import Home from '../home/home';
import { fetchCurrentUser } from '../../actions/session_actions';
import { useDispatch, useSelector } from 'react-redux';

const ProtectedRoute = () => {
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.session.user);
	const isLoading = useSelector(state => state.session.isLoading);
	const [isFetched, setIsFetched] = useState(false);

	useEffect(() => {
		dispatch(fetchCurrentUser())
			.then((userData) => {
				setIsFetched(true);
			})
			.catch((error) => {
				setIsFetched(true);
			});
	}, [dispatch]);

	useEffect(() => { }, [currentUser])

	if (isLoading || !isFetched) {
		return null;
	}
	
	if (currentUser === null) {
		return <Navigate to={'/welcome'} replace />;
	}
	return <Home/>
};

export default ProtectedRoute;