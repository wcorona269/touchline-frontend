import { Avatar, Box, IconButton, TextField, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useDispatch, useSelector } from 'react-redux';
import { createComment } from '../../actions/comment_actions';
import { fetchPosts } from '../../actions/post_actions'
import { createNotification } from '../../actions/notification_actions';

const CreateComment = ({ post }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const [comment, setComment] = useState('');
	const [isValid, setIsValid] = useState(false);
	const user_id = useSelector(state => state.session?.user?.id);
	const user_avatar = useSelector(state => state.session?.user?.avatar_url)

	useEffect(() => {
		if (comment.length > 0 && comment.length < 1000) {
			setIsValid(true)
		} else {
			setIsValid(false)
		}
	}, [comment])

	const handleChange = (event) => {
		setComment(event.target.value)
	}
	
	const handleSubmit = () => {
		const comment_data = {
			'user_id': user_id,
			'post_id': post.id,
			'text': comment
		}

		const notif_info = {
			'recipient_id': post.user_id,
			'sender_id': user_id,
			'target_id': post.id,
			'target_type': 'POST_COMMENT',
			'read': false,
			'created_at': new Date(),
		}

		dispatch(createComment(comment_data));
		dispatch(createNotification(notif_info))
		setComment('');
		dispatch(fetchPosts())
	}
 
	return (
		<>
			<Box sx={{display: 'flex', flexDirection: 'row', marginBottom: '1rem'}}>
				<Avatar sx={{marginRight: '.5rem'}} src={user_avatar} />
				<TextField
					style={{ border: 'none', width: '100%', fontFamily: 'Ubuntu', borderRadius: '.5rem', paddingTop: '.5rem' }}
					placeholder="leave a comment..."
					variant="standard"
					id="outlined-multiline-flexible"
					multiline
					value={comment}
					onChange={handleChange}
					/>
				<IconButton variant='outlined' size='small' 
					onClick={() => handleSubmit()}
					disabled={!isValid}
					sx={{ 
						color: theme.palette.primary.main,
						borderRadius: '.5rem', marginLeft: '.5rem',
						height: '2rem', fontFamily: 'Ubuntu-Bold',
						marginTop: '.5rem'
					}}>
					<SendIcon/>
				</IconButton>
			</Box>
		</>
	)
}

export default CreateComment;