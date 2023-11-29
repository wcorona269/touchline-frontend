import React, { useEffect, useState } from 'react'
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
	const posts = useSelector(state => state.users.users?.user?.posts);
	const reposts = useSelector(state => state.users.users?.user?.reposts);
	const isLoading = useSelector(state => state.users.isLoading);
	const [selectedTab, setSelectedTab] = useState(0);
	useEffect(() => {dispatch(fetchUserInfo(username))}, [username])

	const noPostsMessage = (
		<Container >
			<Typography textAlign='center' variant='h6' sx={{ color: theme.palette.text.disabled, padding: 5 }}>
				{username} hasn't posted yet.
			</Typography>
		</Container>
	)

	const displayPosts = () => {
		let result = [];

		if (isLoading) return;

		if (selectedTab === 0) {
			if (!posts?.length) return noPostsMessage;
			const sortedPosts = posts?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
			for (let post of sortedPosts) {
				result.push(
					<PostContainer post={post} />
				)	
			}
		} else {
			if (!reposts?.length) return noPostsMessage;
			const sortedReposts = reposts?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
			for (let i = 0; i < sortedReposts.length; i++) {
				result.push(<RepostContainer post={reposts[i]} idx={i} />)
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
							height={100}
							width='100%'
						/>
						:
					<Box>
						<Paper elevation={1}>
							<UserShowPageHeader/>
							<Tabs onChange={handleChange} value={selectedTab} variant='fullWidth'>
								<Tab label={'Posts'} />
								<Tab label={'Reposts'} />
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