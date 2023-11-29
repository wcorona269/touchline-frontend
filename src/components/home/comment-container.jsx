import { Avatar, Box, Divider, Grid, IconButton, Link, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useTheme } from '@mui/material/styles';

import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createLike, deleteLike } from '../../actions/post_actions';
import { createNotification } from '../../actions/notification_actions';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const CommentContainer = ({ comment, idx }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [isLiked, setIsLiked] = useState(0);
	const [commentLikes, setCommentLikes] = useState(comment?.likes?.length || 0);
	const user_id = useSelector(state => state.session?.user?.id);
	const theme = useTheme();

	useEffect(() => {
		for (let like of comment.likes) {
			if (like.user_id === user_id)	{
				setIsLiked(true)
			}
		}
	}, []);
	
	const handleLike = () => {
		const like_info = {
			'user_id': user_id,
			'comment_id': comment.id
		}
		const notif_info = {
			'recipient_id': comment.user_id,
			'sender_id': user_id,
			'target_id': comment.id,
			'target_type': 'COMMENT_LIKE',
			'read': false, // Initial read status, can be set to false for unread notifications
			'created_at': new Date(),
		}
		
		if (isLiked === true) {
			dispatch(deleteLike(like_info));
			setCommentLikes(commentLikes - 1)
		} else {
			dispatch(createLike(like_info))
			dispatch(createNotification(notif_info))
			setCommentLikes(commentLikes + 1);
		}
		setIsLiked(!isLiked)
	};

	return (
			<Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '.5rem' }} key={idx}>
				<Grid container spacing={3}>
					<Grid item xs="auto">
						<Avatar src={comment.avatar_url} />
					</Grid>
					<Grid item xs sx={{ display: 'flex', flexDirection: 'column', alignItems: 'left', paddingLeft: '.5rem !important'}}>
						<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
							<Link underline='hover' onClick={() => navigate(`/user/${comment.username}`)} >
								<Typography variant='body2' sx={{ marginBottom: '.25rem', fontFamily: theme.typography.bold }}>
									{comment.username}
								</Typography>
							</Link>
							<Typography variant='caption' sx={{ color: theme.palette.text.disabled, marginLeft: 1 }} >
								{moment(comment.created_at).fromNow()}
							</Typography>
						</Box>
						<Box onDoubleClick={() => handleLike()} sx={{ padding: '.5rem', paddingTop: 0, paddingLeft: 0, width: '95%' }} >
							<Typography variant='body2'>
								{comment.text}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs='auto'>
						<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: theme.palette.text.secondary }}>
							<IconButton aria-label="favorite" size="small" onClick={() => handleLike()} sx={{ padding: '0px', color: theme.palette.primary.main }}>
								{isLiked ?
									<FavoriteIcon fontSize='small' sx={{ height: 18, width: 18 }} /> :
									<FavoriteBorderIcon fontSize='small' sx={{ height: 18, width: 18 }} />
								}
							</IconButton>
							<Typography variant='body2' sx={{ fontSize: 15 }}>
								{commentLikes}
							</Typography>
						</Box>
					</Grid>
				</Grid>
				<Divider/>
			</Box>
	)
}

export default CommentContainer;
