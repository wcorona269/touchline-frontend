import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LeagueHomeDashboard from './home/league-home-dashboard';
import LeagueTableDashboard from './league-table-dashboard'
import LeagueFixturesDashboard from './league-fixtures-dashboard'
import LeagueStatsDashboard from './league-stats-dashboard';
import { fetchCompetition } from '../../actions/api_actions';
import { Tabs, Tab, Grid, Paper, Typography, Box, useTheme } from '@mui/material';
import LoadingMessage from '../util/loading/loading-screen';
import NoDataMessage from '../util/no-data/no-data-message';
import ScrollToTopOnLoad from '../util/scroll-to-top-on-load';
import Title from '../util/title-util';
import SeasonSelect from '../util/season-select/season-select';
import { currentSeason } from '../util/season-select/seasons';

const LeagueShowPage = () => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const { id } = useParams();

	const leagues = useSelector(state => state?.leagues);
	const isLoading = useSelector(state => state?.leagues?.isLoading !== undefined ? state.leagues.isLoading : false);

	// Remember the picked season per league, so opening a different league starts on its current season.
	const [seasonPick, setSeasonPick] = useState({ id, season: currentSeason() });
	const season = seasonPick.id === id ? seasonPick.season : currentSeason();
	const setSeason = (newSeason) => setSeasonPick({ id, season: newSeason });
	const [selectedTab, setSelectedTab] = useState(0);

	const table = leagues['standings'];
	const top_scorers = leagues['top_scorers'];
	const top_assists = leagues['top_assists']; 
	const fixtures = leagues['fixtures'];
	const news = leagues['news'];

	fixtures?.sort((a, b) => {
		const dateA = new Date(a?.fixture?.date ?? 0);
		const dateB = new Date(b?.fixture?.date ?? 0);
		return dateA - dateB;
	});
	const uniqueDates = [...new Set(fixtures?.map(fixture => fixture.fixture.date.split('T')[0]))];

	useEffect(() => {
		dispatch(fetchCompetition(id, season))
	}, [dispatch, id, season]);

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [id]);

	const handleChange = (newValue) => {
		setSelectedTab(newValue);
	}
	const leagueInfo = table?.[0]?.league;
	// Data left over from a previously viewed league shouldn't flash under this league's URL.
	const isThisLeague = String(leagueInfo?.id) === String(id);

	if (isLoading && !isThisLeague) {
		return <LoadingMessage/>
	}

	const hasData = isThisLeague && table && top_scorers && top_assists;
	const { country, flag, logo, name } = leagueInfo || {};

	return (
		<Grid item xs={12} md={9}>
			<Box>
				<Paper sx={{ marginBottom: '1rem' }}>
					<Title variant='h5' content={name} img={logo} back={true} button={!!name} />
					<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 1, pr: 2 }}>
						<Tabs value={selectedTab} variant='scrollable' scrollButtons={false} sx={{ minWidth: 0 }}>
							<Tab label='Overview' onClick={() => handleChange(0)} />
							<Tab label='Fixtures' onClick={() => handleChange(1)} />
							<Tab label='Table' onClick={() => handleChange(2)} />
							<Tab label='Stats' onClick={() => handleChange(3)} />
						</Tabs>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: { xs: 2, sm: 0 }, pb: { xs: 1.5, sm: 0 } }}>
							{country && (
								<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
									{flag && <img alt='' src={flag} style={{ height: 14, width: 20, objectFit: 'cover', borderRadius: 3 }} />}
									<Typography variant='body2' sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>{country}</Typography>
								</Box>
							)}
							<SeasonSelect season={season} onChange={setSeason} />
						</Box>
					</Box>
				</Paper>
				{isLoading ? <LoadingMessage/> : !hasData ? <NoDataMessage/> : <>
					{selectedTab === 0 && <LeagueHomeDashboard name={name} logo={logo} news={news} fixtures={fixtures} uniqueDates={uniqueDates} table={table} top_scorers={top_scorers} />}
					{selectedTab === 1 && <LeagueFixturesDashboard name={name} logo={logo} fixtures={fixtures} uniqueDates={uniqueDates} />}
					{selectedTab === 2 && <LeagueTableDashboard name={name} logo={logo} table={table}  />}
					{selectedTab === 3 && <LeagueStatsDashboard name={name} logo={logo} top_scorers={top_scorers} top_assists={top_assists} />}
				</>}
			</Box>
		<ScrollToTopOnLoad/>
		</Grid>
	)
}

export default LeagueShowPage;