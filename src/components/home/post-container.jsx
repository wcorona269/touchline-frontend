//  import './post-container.scss';
import { Avatar, Box, Button, Link, Paper, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createLike, createRepost, deleteLike, deleteRepost } from '../../actions/post_actions';
import { createNotification } from '../../actions/notification_actions';
import { useNavigate } from 'react-router-dom';
import RepostButton from './repost-popper';
import RepeatIcon from '@mui/icons-material/Repeat';
import moment from 'moment-timezone';

const PostContainer = ({ post, repost }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const user_id = useSelector(state => state.session?.user?.id);
	const [postLikes, setPostLikes] = useState(0);
	const [reposts, setReposts] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [isReposted, setIsReposted] = useState(false);
	const avatar = post?.avatar_url

	useEffect(() => {
		for (let like of post.likes) {
			if (like.user_id === user_id) {
				setIsLiked(true)
			}
		}

		for (let repost of post.reposts) {
			if (repost.user_id === user_id) {
				setIsReposted(true)
			}
		}
		
		setPostLikes(post.likes.length)
		setReposts(post.reposts.length)
	}, [post]);

	const handleLike = () => {
		const like_info = {
			'post_id': post.id,
			'user_id': user_id,
		}

		const notif_info = {
			'recipient_id': post.user_id,
			'sender_id': user_id,
			'target_id': post.id,
			'target_type': 'POST_LIKE',
			'read': false,
			'created_at': new Date(),
		}

		if (isLiked === true) {
			dispatch(deleteLike(like_info))
			setPostLikes(postLikes - 1)
		} else {
			dispatch(createLike(like_info))
			dispatch(createNotification(notif_info))
			setPostLikes(postLikes + 1)
		}
		setIsLiked(!isLiked);
	}

	const handleRepost = () => {
		const repost_info = {
			'post_id': post.id,
			'user_id': user_id,
		}

		if (isReposted === true) {
			dispatch(deleteRepost(repost_info))
			setReposts(reposts - 1)
		} else {
			const notif_info = {
				'recipient_id': post.user_id,
				'sender_id': user_id,
				'target_id': post.id,
				'target_type': 'REPOST',
				'read': false,
				'created_at': new Date(),
			}
			dispatch(createRepost(repost_info));
			dispatch(createNotification(notif_info));
			setReposts(reposts + 1)
		}
		setIsReposted(!isReposted);
	}

	const showPost = () => {
		navigate(`/post/${post.id}`)
	}

	const buttons = [
		<Button key={0} aria-label="favorite" size="large" sx={{ borderRadius: '1rem', width: 'fit-content', color: theme.palette.grey['700'] }} onClick={() => showPost()}>
			<ChatBubbleOutlineIcon sx={{ marginRight: '.25rem' }} fontSize='medium'/>
			{post.comments.length}
		</Button>,
		<RepostButton key={1} handleRepost={handleRepost} reposts={reposts} isReposted={isReposted} setIsReposted={setIsReposted} post={post} user_id={user_id}  />,
		<Button key={2} aria-label="favorite" size="large" sx={{ borderRadius: '1rem', width: 'fit-content', color: isLiked ? theme.palette.primary.main : theme.palette.grey['700'] }} onClick={handleLike} >
			{isLiked ? <FavoriteIcon sx={{ marginRight: '.25rem' }} fontSize='medium' /> : <FavoriteBorderIcon sx={{ marginRight: '.25rem' }} />  }
			{postLikes}
		</Button>,
	];

	return (
		<Paper elevation={1} key={post.id} sx={{ padding: 2, paddingBottom: 0, borderBottom: 'none !important'}}>
			{repost &&
				<Link onClick={() => navigate(`/user/${repost.user.username}`)} underline='hover' sx={{ color: theme.palette.grey['500'], display: 'flex', alignItems: 'center', marginBottom: 1 }} variant='caption'>
					<RepeatIcon sx={{ marginRight: '.25rem' }} fontSize='small' />
					Reposted by {repost.user.username}
				</Link>
			}
			<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start' }}>
				<Avatar sx={{ marginRight: '.5rem' }} src={avatar} onClick={() => navigate(`/user/${post.username}`)} />
				<Box sx={{ display: 'flex', flexDirection: 'column'}}>
					<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: '.5rem'}}>
						<Typography variant='body1' sx={{ fontFamily: theme.typography.bold }}>
							<Link underline='hover' onClick={() => navigate(`/user/${post.username}`)} >
								{post.username}
							</Link>
						</Typography>
						<Typography variant='caption' sx={{ color: 'var(--darkgray)' }}>
							{moment(post.created_at).tz('America/New_York').fromNow()}
						</Typography>
					</Box>
					<Typography variant='body1' onClick={() => showPost()} sx={{width: '100%'}} >
						{post.text}
					</Typography>
				</Box>
			</Box>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', marginTop: '.5rem'}}>
				{buttons}
			</Box>
		</Paper>
	)
}

export default PostContainer;