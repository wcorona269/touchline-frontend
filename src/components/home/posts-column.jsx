// import './posts-column.scss'
import React, { useEffect, useMemo } from 'react'
import { Button, Grid, Paper, Stack, Typography, CircularProgress } from '@mui/material'
import { fetchPosts, fetchReposts } from '../../actions/post_actions';
import LoadingMessage from '../util/loading/loading-screen';
import CreatePost from './create-post';
import PostContainer from './post-container';
import ScrollToTopOnLoad from '../util/scroll-to-top-on-load';
import { useDispatch, useSelector } from 'react-redux';
import HomeFixturesColumn from './home-fixtures-column';
import Title from '../util/title-util';
import TopStories from './top-stories';

const PostsTimeline = () => {
	const dispatch = useDispatch();
	const posts = useSelector(state => state.posts?.posts || []);
	const current_page = useSelector(state => state.posts?.current_page);
	const isPostsLoading = useSelector(state => state.posts.isLoading);
	const isRepostsLoading = useSelector(state => state.reposts.isLoading);
	const reposts = useSelector(state => state.reposts?.reposts || []);

	useEffect(() => {
		if (!isPostsLoading) {
			dispatch(fetchPosts())
		}
		if (!isRepostsLoading) {
			dispatch(fetchReposts())
		}
	}, []);

	const combinedPosts = useMemo(() => {
		const postsArray = Object.values(posts);
		const repostsArray = Object.values(reposts);
		return [...postsArray, ...repostsArray].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
	}, [posts, reposts]);

	const loadMorePosts = () => {
		dispatch(fetchPosts(current_page + 1));
		dispatch(fetchReposts(current_page + 1));
	};

	if (combinedPosts.length === 0 && (isPostsLoading || isRepostsLoading)) {
		return <LoadingMessage/>
	}

	return (
		<>
			<Grid item xs={6}>
				<Stack spacing={2}>
					<Paper elevation={1}>
						<Title variant='h5' content='Home'/>
						<CreatePost/>
					</Paper>
					{combinedPosts.map((item) => {
						if (item.post) {
							return (
								<PostContainer key={`repost-${item.id}`} repost={item} post={item.post} />
							)
						} else {
							return (
								<PostContainer key={`post-${item.id}`} post={item} />
							)
						}
					})}
					{
						!isPostsLoading && !isRepostsLoading ?
							<Button onClick={loadMorePosts} variant="outlined" sx={{ height: '3rem', width: '100%' }}>
								<Typography variant='subtitle1'>
									See More
								</Typography>
							</Button> :
							<Button variant="outlined" sx={{ height: '3rem', width: '100%' }} >
								<CircularProgress size='2rem' />
							</Button>
					}
				</Stack>
			</Grid>
			<Grid item xs={3} sx={{ position: 'sticky', top: -450 }}  >
				<Stack spacing={2}>
					<TopStories/>
					<HomeFixturesColumn />
				</Stack>
			</Grid>
			<ScrollToTopOnLoad/>
		</>
	)
}

export default PostsTimeline;