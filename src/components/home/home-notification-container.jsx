import React, { useState } from 'react'
import { setAsRead } from '../../actions/notification_actions';
import { Avatar, ListItem, ListItemAvatar, ListItemButton, Typography, useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const NotificationContainer = ({notif, idx}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const [isRead, setIsRead] = useState(notif.read);

	const determineMessage = (notification) => {
		switch (notification.target_type) {
			case 'comment_like':
				return `${notification.sender.username} liked your commment`
			case 'post_like':
				return `${notification.sender.username} liked your post`
			case 'post_comment':
				return `${notification.sender.username} commented on your post`
			case 'repost':
				return `${notification.sender.username} reposted your post`
			default:
				return 'notification'
		}
	}

	const handleClick = () => {
		if (isRead === false) {
			dispatch(setAsRead(notif.id))
			setIsRead(true);
		}
		if (notif.target_type === 'post_like' || notif.target_type === 'post_comment' || notif.target_type === 'repost') {
			navigate(`/post/${notif.target_id}`)
		}
	}

	return (
		<ListItem disablePadding divider alignItems='flex-start' key={idx} sx={{ backgroundColor: isRead ? '' : theme.palette.action.hover }} onClick={handleClick}>
			<ListItemButton  >
				<ListItemAvatar>
					<Avatar>
					</Avatar>
				</ListItemAvatar>
				<Typography variant='body1'>
					{determineMessage(notif)}
				</Typography>
			</ListItemButton>
		</ListItem>
	)
}

export default NotificationContainer;