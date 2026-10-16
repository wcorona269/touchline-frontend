import { Avatar, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../actions/post_actions';

const CreatePost = () => {
	const dispatch = useDispatch()
	const [post, setPost] = useState('');
	const userId = useSelector(state => state.session?.user?.id)
	const avatar = useSelector(state => state.session?.user?.avatar_url)
	const [isValidPost, setIsValidPost] = useState(false);
	const [postLength, setPostLength] = useState(0);

	const postData = {
		'user_id': userId,
		'text': post
	}

	useEffect(() => {
		if (post.length === 0) setIsValidPost(false)
		if (post.length > 0 && post.length <= 200) {
			setIsValidPost(true)
		} else {
			setIsValidPost(false)
		}

		setPostLength((post.length / 200) * 100);
	}, [post])
	
	const handleSubmit = () => {
		dispatch(createPost(postData));
		setPost('');
	}

	const handleChange = (event) => {
		setPost(event.target.value)
	}

	return (
		<Box sx={{ display: 'flex', gap: 1.5, p: 2 }}>
			<Avatar src={avatar} sx={{ width: 42, height: 42 }} />
			<Box sx={{ flex: 1, minWidth: 0 }}>
				<TextField
					fullWidth
					variant='standard'
					placeholder="What's happening in football?"
					multiline
					minRows={2}
					value={post}
					onChange={handleChange}
					InputProps={{ disableUnderline: true, sx: { fontSize: '1.05rem', pt: 1 } }}
				/>
				<Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1.5, mt: 1, pt: 1.5, borderTop: (theme) => `1px solid ${theme.palette.divider}` }}>
					{post.length > 0 && (
						<Box sx={{ position: 'relative', display: 'inline-flex' }}>
							<CircularProgress variant='determinate' size={28} thickness={4} value={Math.min(postLength, 100)} color={post.length > 200 ? 'error' : 'primary'} />
							<Box sx={{ inset: 0, position: 'absolute', display: 'grid', placeItems: 'center' }}>
								<Typography sx={{ fontSize: 10, fontWeight: 700 }} color={post.length > 180 ? 'error' : 'text.secondary'}>
									{200 - post.length}
								</Typography>
							</Box>
						</Box>
					)}
					<Button variant='contained' disabled={!isValidPost} onClick={handleSubmit} sx={{ px: 3 }}>
						Post
					</Button>
				</Box>
			</Box>
		</Box>
	)
}

export default CreatePost;