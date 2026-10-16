//  import './post-container.scss';
import { alpha, Avatar, Box, Button, Link, Paper, Typography } from '@mui/material';
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
import { timeAgo } from '../util/time-ago';
import PostMenu from './post-menu';
import { postActionSx } from './post-action-sx';

const LIKE_COLOR = '#F43F5E';

const PostContainer = React.memo(({ post, repost }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const user_id = useSelector(state => state.session?.user?.id);
	const [postLikes, setPostLikes] = useState(0);
	const [reposts, setReposts] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [isReposted, setIsReposted] = useState(false);
	const avatar = post?.avatar_url;
	

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
		
		setPostLikes(post?.likes?.length)
		setReposts(post?.reposts?.length)
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
		<Button key={0} aria-label="comments" sx={postActionSx(theme, theme.palette.secondary.main)} onClick={() => showPost()}>
			<ChatBubbleOutlineIcon />
			{post.comments?.length}
		</Button>,
		<RepostButton key={1} handleRepost={handleRepost} reposts={reposts} isReposted={isReposted} setIsReposted={setIsReposted} post={post} user_id={user_id}  />,
		<Button key={2} aria-label="like" sx={postActionSx(theme, LIKE_COLOR, isLiked)} onClick={handleLike} >
			{isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
			{postLikes}
		</Button>,
	];

	return (
		<Paper key={post.id} sx={{ px: 2, pt: 2, pb: 1, transition: 'background-color .15s', '&:hover': { backgroundColor: alpha(theme.palette.text.primary, 0.015) } }}>
			{repost &&
				<Link onClick={() => navigate(`/user/${repost.user.username}`)} underline='hover' sx={{ color: theme.palette.text.secondary, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5, marginBottom: 1, marginLeft: '28px', cursor: 'pointer' }} variant='caption'>
					<RepeatIcon sx={{ fontSize: 15 }} />
					{repost.user.username} reposted
				</Link>
			}
			<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', gap: 1.5 }}>
				<Avatar sx={{ width: 42, height: 42, cursor: 'pointer' }} src={avatar} onClick={() => navigate(`/user/${post.username}`)} />
				<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0 }}>
					<Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '.5rem', minHeight: 24}}>
						<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'baseline', gap: '.5rem', minWidth: 0 }}>
							<Link underline='hover' noWrap onClick={() => navigate(`/user/${post.username}`)} sx={{ fontWeight: 700, fontSize: '0.95rem', color: theme.palette.text.primary, cursor: 'pointer' }}>
								{post.username}
							</Link>
							<Typography variant='caption' noWrap sx={{ color: theme.palette.text.disabled, fontSize: 13 }}>
								{timeAgo(post.created_at)}
							</Typography>
						</Box>
						<Box>
							{ post.user_id === user_id &&
								<PostMenu postId={post.id} />
							}
						</Box>
					</Box>
					<Typography variant='body1' onClick={() => showPost()} sx={{ width: '100%', mt: 0.25, cursor: 'pointer', overflowWrap: 'anywhere' }} >
						{post.text}
					</Typography>
					<Box sx={{ display: 'flex', flexDirection: 'row', gap: { xs: 2, sm: 4 }, mt: 1, ml: -1.25 }}>
						{buttons}
					</Box>
				</Box>
			</Box>
		</Paper>
	)
});

export default PostContainer;