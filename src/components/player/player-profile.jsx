import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchPlayer } from '../../actions/api_actions';
import PlayerOverview from './player-overview';
import PlayerStats from './player-stats';
import LoadingMessage from '../util/loading/loading-screen';
import NoDataMessage from '../util/no-data/no-data-message';
import FetchError from '../util/no-data/fetch-error';
import { Grid, Stack } from '@mui/material';

import HomeFixturesColumn from '../home/home-fixtures-column';

const PlayerProfile = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const player = useSelector(state => state.player?.player?.[0]);
	const isLoading = useSelector(state => state.player.isLoading);
	const error = useSelector(state => state.player.error);
	// const state = useSelector(state => state)

	useEffect(() => {
		dispatch(fetchPlayer(id))
		window.scrollTo(0, 0)
	}, [dispatch, id])

	if (!isLoading && error) {
		return <Grid item xs={12} md={9}><FetchError onRetry={() => dispatch(fetchPlayer(id))} /></Grid>
	}

	// Data left over from a previously viewed player shouldn't flash under this player's URL.
	if (isLoading || (player && String(player.player.id) !== String(id))) {
		return <LoadingMessage />
	}

	if (!player) {
		return <Grid item xs={12} md={9}><NoDataMessage /></Grid>
	}

	const statistics = player?.statistics;

	return (
		<>
			<Grid item xs={12} md={6}>
				<Stack spacing={2}>
					<PlayerOverview player={player} />
					<PlayerStats statistics={statistics} />
				</Stack>
			</Grid>
			<Grid item xs={12} md={3}>
				<HomeFixturesColumn />
			</Grid>
		</>
	)
}

export default PlayerProfile;