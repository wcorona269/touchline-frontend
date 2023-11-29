import { Button } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { readAllNotifications } from '../../actions/notification_actions';

const ReadAllButton  = () => {
	const dispatch = useDispatch();
	const user_id = useSelector(state => state.session?.user?.id);
	const isLoading = useSelector(state => state.notifications?.isLoading);
	const notifications = useSelector(state => state.notifications?.notifications);
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		if (!notifications || typeof notifications !== 'object') return;
		let notifs = Object.values(notifications);
		const hasUnread = (notifs.some(notif => notif.read === false));
		if (hasUnread === true) setShowButton(true)
	}, [notifications])
	
	const handleClick = () => {
		dispatch(readAllNotifications(user_id))
	}

	return showButton && !isLoading ? (
		<Button 
			size='small'
			variant='outlined'
			onClick={handleClick}
		>
			Read all
		</Button>
	) : (<></>)
}

export default ReadAllButton;