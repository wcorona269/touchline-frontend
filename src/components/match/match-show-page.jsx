import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchMatch } from '../../actions/api_actions';
import MatchShowPageHeader from './match-show-page-header';
import LoadingMessage from '../util/loading/loading-screen';
import NoDataMessage from '../util/no-data/no-data-message';
import { Box, Grid, Stack, Typography } from '@mui/material';
import Lineups from './match-info/lineups';
import MatchStats from './match-info/match-stats';
import EventsTimeline from './match-info/events-timeline'
import MatchInfoTable from './match-info/match-info-table';
import MiniLeagueTable from './match-info/mini-league-table';

const MatchShowPage = () => {
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.match.isLoading);
	const { id } = useParams();
	const match = useSelector(state => state.match.match);

	useEffect(()=> { dispatch(fetchMatch(id)) }, [])
	useEffect(() => {}, [isLoading])

	if (isLoading) return <LoadingMessage/>
	if (!match) return <NoDataMessage/>

	const homeTeam = match[0]?.teams?.home?.name;
	const awayTeam = match[0]?.teams?.away?.name;
	const homeLogo = match[0]?.teams?.home?.logo;
	const awayLogo = match[0]?.teams?.away?.logo;

	const header = (
		<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', px: 2, py: 1.5 }}>
			<Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }} >
				<img alt='' src={homeLogo} loading='lazy' style={{ width: 22, height: 22, objectFit: 'contain' }} />
				{homeTeam}
			</Typography>
			<Typography variant='body2' sx={{ display: 'flex', alignItems: 'center', gap: 1, fontWeight: 700 }} >
				{awayTeam}
				<img alt='' src={awayLogo} loading='lazy' style={{ width: 22, height: 22, objectFit: 'contain' }} />
			</Typography>
		</Box>
	)
	
	return (
		<>
			<Grid item xs={12} md={6}>
				<Box>
					<Stack spacing={2}>
						<MatchShowPageHeader match={match[0]}/>
						<MatchStats match={match[0]} header={header} />
						<EventsTimeline match={match[0]} header={header} />
						<Lineups lineups={match[0]?.lineups} header={header} />
					</Stack>
				</Box>
			</Grid>
			<Grid item xs={12} md={3} sx={{ position: {md: 'sticky'}, top: '-20rem' }}>
				<Stack spacing={2}>
					<MatchInfoTable match={match[0]} />
					<MiniLeagueTable match={match[0]} homeTeam={homeTeam} awayTeam={awayTeam} />
				</Stack>
			</Grid>
		</>
	)
}

export default MatchShowPage;