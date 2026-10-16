import { Box, CircularProgress, Paper } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStandings } from '../../../actions/standings_actions';
import Title from '../../util/title-util';
import StandingsTable from '../../league/standings-table';

const MiniLeagueTable = ({ match, homeTeam, awayTeam }) => {
	const dispatch = useDispatch();
	const leagueId = match?.league?.id;
	const season = match?.league?.season;
	const isLoading = useSelector(state => state.standings.isLoading);
	const standings = useSelector(state => state.standings?.standings?.[0]);
	const groups = standings?.league?.standings || [];
	const league_logo = standings?.league?.logo;
	const league_name = standings?.league?.name || '';

	useEffect(() => {
		dispatch(fetchStandings(leagueId, season))
	}, [dispatch, leagueId, season]);

	const isPlaying = (row) => row.team.name === homeTeam || row.team.name === awayTeam;
	// Group-stage competitions return one table per group; only the group with these teams is relevant.
	const relevantGroups = groups.length > 1 ? groups.filter(group => group.some(isPlaying)) : groups;

	// Cup competitions have no standings at all, so there's nothing to show.
	if (!isLoading && !relevantGroups.length) return null;

	return (
		<Paper>
			<Title variant='h6' content={`${league_name} Standings`} img={league_logo}/>
			{isLoading ?
				<Box sx={{ py: 8, display: 'grid', placeItems: 'center' }}>
					<CircularProgress />
				</Box> :
				relevantGroups.map((group, idx) => (
					<StandingsTable key={idx} rows={group} compact highlight={isPlaying} />
				))
			}
		</Paper>
	)
}

export default MiniLeagueTable;
