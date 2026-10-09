import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Button, Paper, Box, Grid, Tabs, Tab, Container, Typography, Divider, useTheme, Skeleton, Stack } from '@mui/material';
import { Virtuoso } from 'react-virtuoso';
import PostContainer from '../home/post-container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo, fetchMoreUserPosts, fetchMoreUserReposts, fetchMoreUserLikes } from '../../actions/user_actions';
import RepostContainer from '../home/repost-container';
import HomeFixturesColumn from '../home/home-fixtures-column';
import UserShowPageHeader from './user-show-page-header';

const UserShowPage = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const { username } = useParams();
	const posts = useSelector(state => state.users?.user?.posts);
	const reposts = useSelector(state => state.users.user?.reposts);
	const likes = useSelector(state => state.users?.user?.likes);
	const postsCurrentPage = useSelector(state => state.users?.user?.posts_current_page) || 1;
	const postsTotalPages = useSelector(state => state.users?.user?.posts_total_pages) || 1;
	const repostsCurrentPage = useSelector(state => state.users?.user?.reposts_current_page) || 1;
	const repostsTotalPages = useSelector(state => state.users?.user?.reposts_total_pages) || 1;
	const likesCurrentPage = useSelector(state => state.users?.user?.likes_current_page) || 1;
	const likesTotalPages = useSelector(state => state.users?.user?.likes_total_pages) || 1;
	const isLoading = useSelector(state => state?.users?.isLoading);
	const [selectedTab, setSelectedTab] = useState(0);

	useEffect(() => {dispatch(fetchUserInfo(username))}, [username])
	useEffect(() => {}, [posts, reposts, likes])

	const loadMore = () => {
		if (selectedTab === 0) {
			dispatch(fetchMoreUserPosts(username, postsCurrentPage + 1));
		} else if (selectedTab === 1) {
			dispatch(fetchMoreUserReposts(username, repostsCurrentPage + 1));
		} else {
			dispatch(fetchMoreUserLikes(username, likesCurrentPage + 1));
		}
	};

	const hasMore = selectedTab === 0 ? postsCurrentPage < postsTotalPages
		: selectedTab === 1 ? repostsCurrentPage < repostsTotalPages
		: likesCurrentPage < likesTotalPages;

	const noResultMessage = () => {
		const type = selectedTab === 0 ? 'posts' : selectedTab === 1 ? 'reposts' : 'likes';
		return (
			<Container >
				<Typography textAlign='center' variant='h6' sx={{ color: theme.palette.text.disabled, padding: 5 }}>
					{username} has no {type} yet.
				</Typography>
			</Container>
		)
	}

	const sortedItems = useMemo(() => {
		const items = selectedTab === 0 ? posts : selectedTab === 1 ? reposts : likes;
		if (!items) return [];
		return Object.values(items).sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
	}, [selectedTab, posts, reposts, likes]);

	const renderItem = (index, item) => (
		<Stack spacing={2} sx={{ paddingTop: index === 0 ? 2 : 0, paddingBottom: 2 }}>
			{selectedTab !== 1 ? <PostContainer post={item} /> : <RepostContainer post={item} />}
		</Stack>
	);

	const loadMoreFooter = () => (
		!isLoading && hasMore &&
			<Button onClick={loadMore} variant="outlined" sx={{ height: '3rem', width: '100%', marginTop: '.5rem' }}>
				<Typography variant='subtitle1'>
					See More
				</Typography>
			</Button>
	);

	const displayPosts = () => {
		if (isLoading) return;
		if (sortedItems.length === 0) {
			return noResultMessage()
		}

		return (
			<Virtuoso
				useWindowScroll
				data={sortedItems}
				itemContent={renderItem}
				components={{ Footer: loadMoreFooter }}
			/>
		)
	}

	const handleChange = (event, newValue) => {
		setSelectedTab(newValue);
	};
	
	return (
		<>
			<Grid item xs={6}>
				{
					isLoading ? 
						<Skeleton
							animation="wave"
							height={500}
							width='100%'
						/>
						:
					<Box>
						<Paper elevation={1}>
							<UserShowPageHeader/>
							<Tabs onChange={handleChange} value={selectedTab} variant='fullWidth'>
								<Tab label={'Posts'} />
								<Tab label={'Reposts'} />
								<Tab label={'Likes'} />
							</Tabs>
							<Divider/>
						</Paper>
						{displayPosts()}
					</Box>
				}
			</Grid>
			<Grid item xs={3} sx={{position: 'sticky', top: '3rem'}} >
				<HomeFixturesColumn/>
			</Grid>
		</>
	)
}

export default UserShowPage;