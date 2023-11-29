import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {  Box, Container, Grid, Paper, Stack } from '@mui/material';
import HomeMenu from './home-menu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../actions/notification_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import UserFavorites from './my-favorites';

const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch()
	const [selectedTab, setSelectedTab] = useState(0);
	const isFavoritesLoading = useSelector(state => state.favorites.isLoading)
	const username = useSelector(state => state.session.user?.username);
	const user_id = useSelector(state => state.session?.user?.id);	
	const isNotificationsLoading = useSelector(state => state.notifications.isLoading)
	const notifications = useSelector(state => state.notifications?.notifications)
	const [unreadCount, setUnreadCount] = useState();
	
	useEffect(() => {
		if (!isFavoritesLoading) {
			dispatch(fetchFavorites(user_id))
		}
		if (!isNotificationsLoading) {
			dispatch(fetchNotifications(user_id))
		}
	}, [user_id])

	useEffect(() => {
		document.body.style.overflow = 'visible';
	}, [])

	useEffect(() => {
		if (location.pathname.includes('home')) {
			setSelectedTab(0)
		} else if (location.pathname.includes('notifications')) {
			setSelectedTab(1)
		} else if (location.pathname.includes('matches')) {
			setSelectedTab(3)
		} else if (location.pathname.includes('news')) {
			setSelectedTab(4)
		} else if (location.pathname.includes(username)) {
			setSelectedTab(5)
		} else {
			setSelectedTab(2)
		}

		window.scrollTo(0, 0)
	}, [location])

	useEffect(() => {
		let count = 0;
		if (!notifications || typeof notifications !== 'object') return; 
		let notifs = Object.values(notifications)
		if (notifications) {
			for (let notif of notifs) {
				if (notif.read === false) count += 1;
			}
		}
		setUnreadCount(count)
	}, [notifications])

	const handleTabSelect = (value, location) => {
		setSelectedTab(value);
		navigate(`/${location}`)
	}

	return (
		<Container className='home-container' sx={{paddingBottom: '5rem'}}>
			<Grid container alignItems='flex-start' spacing={2}>
				<Grid item xs={3} sx={{position: 'sticky', top: '2rem'}}>
					<Stack spacing={2}>
						<Box>
							<HomeMenu 
								unreadCount={unreadCount}
								selectedTab={selectedTab}
								handleTabSelect={handleTabSelect}
							/>
						</Box>
						<Paper elevation={1}>
							<UserFavorites/>
						</Paper>
					</Stack>
				</Grid>
				<Outlet/>
			</Grid>
		</Container>
	)
}

export default Home;