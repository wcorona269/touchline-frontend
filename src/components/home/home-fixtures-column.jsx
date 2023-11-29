import { Box, CircularProgress, Paper } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchLiveMatches } from '../../actions/api_actions';
import LiveFixturesDisplay from './live-fixtures-display';
import Title from '../util/title-util';

const HomeFixturesColumn = () => {
	const dispatch = useDispatch();
	const matches = useSelector(state => state.matches?.live);
	const isLoading = useSelector(state => state.matches.isLoading);
	useEffect(() => {
		if (!isLoading && !matches) {
			dispatch(fetchLiveMatches())
		}
	}, [matches, isLoading])

	return (
		<Paper elevation={1} id='home-fixtures-paper' sx={{position: 'sticky !important', top: '2rem !important'}}>
			<Title variant='h5' content='Live Fixtures' />
			{ isLoading ?
				<Box sx={{height: '20rem', width: '100%', display: 'flex', alignItems: 'center' }}>
					<CircularProgress
						sx={{ margin: 'auto' }}
					/>
				</Box>
				  : <LiveFixturesDisplay matches={matches}/>
			}
		</Paper>
	)
}

export default HomeFixturesColumn;