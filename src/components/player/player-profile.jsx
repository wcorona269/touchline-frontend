import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPlayer } from '../../actions/api_actions';
import PlayerOverview from './player-overview';
import PlayerStats from './player-stats';
import LoadingMessage from '../util/loading/loading-screen';
import NoDataMessage from '../util/no-data/no-data-message';
import { Grid, Stack } from '@mui/material';

import HomeFixturesColumn from '../home/home-fixtures-column';

const PlayerProfile = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const player = useSelector(state => state.player?.player?.[0]);
	const isLoading = useSelector(state => state.player.isLoading);
	// const state = useSelector(state => state)

	useEffect(() => { if (!isLoading) { dispatch(fetchPlayer(id)) } }, [])
	useEffect(() => { }, [isLoading])


	if (isLoading) {
		return <LoadingMessage />
	}

	if (!player) {
		return <NoDataMessage />
	}

	const statistics = player?.statistics;

	return (
		<>
			<Grid item xs={6}>
				<Stack spacing={2}>
					<PlayerOverview player={player} />
					<PlayerStats statistics={statistics} />
				</Stack>
			</Grid>
			<Grid item xs={3}>
				<HomeFixturesColumn />
			</Grid>
		</>
	)
}

export default PlayerProfile;