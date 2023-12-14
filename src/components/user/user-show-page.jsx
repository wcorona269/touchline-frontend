import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Paper, Box, Grid, Tabs, Tab, Container, Typography, Divider, useTheme, Skeleton, Stack } from '@mui/material';
import PostContainer from '../home/post-container';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserInfo } from '../../actions/user_actions';
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
	const isLoading = useSelector(state => state?.users?.isLoading);
	const [selectedTab, setSelectedTab] = useState(0);
	
	useEffect(() => {dispatch(fetchUserInfo(username))}, [username])
	useEffect(() => {}, [posts, reposts, likes])

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

	const displayPosts = () => {
		if (isLoading) return;
		let items = selectedTab === 0 ? posts : selectedTab === 1 ? reposts : likes;
		debugger;
		if (!items || Object.keys(items).length === 0) {
			return noResultMessage()
		}
		let result = []
		const sortedItems = Object.values(items)?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		for (let i = 0; i < sortedItems?.length || 0; i++) {
			if (selectedTab !== 1) {
				result.push(<PostContainer post={sortedItems[i]} />)
			} else {
				result.push(<RepostContainer post={sortedItems[i]} idx={i} />)
			}
		}
		
		return (
			<Stack spacing={2} sx={{paddingTop: 2}} >
				{result}
			</Stack>
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