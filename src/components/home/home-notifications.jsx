import { Box, Grid, List, Paper, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import ScrollToTopOnLoad from '../util/scroll-to-top-on-load';
import HomeFixturesColumn from './home-fixtures-column';
import Title from '../util/title-util';
import NotificationContainer from './home-notification-container';

const Notifications = () => {
	const theme = useTheme();
	const notifications = useSelector(state => state.notifications?.notifications)

	useEffect(() => {}, [notifications])
	const noNotifsMessage = (
		<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<Typography variant='h6' sx={{ margin: 'auto', marginTop: '5rem', textAlign: 'center', height: '100%', color: theme.palette.text.disabled }}>
				No new notifications to show.
			</Typography>
		</Box>
	)

	const displayNotifications = () => {
		let result = [];
		if (!notifications || typeof notifications !== 'object') {
			return noNotifsMessage;
		}
		const notifsArray = notifications ? Object.values(notifications) : [];
		if (!notifsArray.length) return noNotifsMessage;
		const sortedNotifs = notifsArray.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
		for (let i = 0; i < sortedNotifs.length; i++) {
			const notif = sortedNotifs[i]
			result.push(
				<NotificationContainer notif={notif} idx={i} />
			)
		}
		return result;
	}

	return (
		<>
			<Grid item xs={6}>
				<Paper elevation={1} sx={{minHeight: '20rem'}}>
					<Title variant='h5' content='Notifications' notifs={true} />
					<List>
						{displayNotifications(notifications)}
					</List>
				</Paper>
			</Grid>
			<Grid item xs={3}>
				<HomeFixturesColumn/>
			</Grid>
			<ScrollToTopOnLoad/>
		</>
	)
}

export default Notifications;