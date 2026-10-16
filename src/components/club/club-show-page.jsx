import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchClub } from '../../actions/api_actions';
import LoadingMessage from '../util/loading/loading-screen';
import ClubNavBar from './club-nav-bar';
import ClubFixturesDashboard from './club-fixtures-dashboard';
import ClubSquadDashboard from './club-squad-dashboard';
import ClubStatsDashboard from './club-stats-dashboard';
import ClubHomeDashboard from './home/club-home-dashboard';
import { Grid, Paper } from '@mui/material';
import Title from '../util/title-util';
import { currentSeason } from '../util/season-select/seasons';
import FetchError from '../util/no-data/fetch-error';

const ClubShowPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state?.club?.isLoading ?? false);
	const error = useSelector(state => state?.club?.error);
	const [selectedTab, setSelectedTab] = useState(0);
	const club = useSelector(state => state.club.club);
	const fixtures = useSelector(state => state.club.fixtures);
	const squad = useSelector(state => state.club.squad);
	const stats = useSelector(state => state.club.stats);
	const news = useSelector(state => state.club.news);

	// Remember the picked season per club, so opening a different club starts on its current season.
	const [seasonPick, setSeasonPick] = useState({ id, season: currentSeason() });
	const season = seasonPick.id === id ? seasonPick.season : currentSeason();
	const setSeason = (newSeason) => setSeasonPick({ id, season: newSeason });

	const load = () => dispatch(fetchClub(id, season));

	useEffect(() => {
		dispatch(fetchClub(id, season));
	}, [dispatch, id, season]);

	useEffect(() => {
		window.scrollTo(0, 0)
	}, [id]);

	const clubInfo = club?.[0];
	// Data left over from a previously viewed club shouldn't flash under this club's URL.
	const isThisClub = String(clubInfo?.team?.id) === String(id);

	if (!isThisClub) {
		return (!isLoading && error) ?
			<Grid item xs={12} md={9}><FetchError onRetry={load} /></Grid> :
			<LoadingMessage/>
	}

	const name = clubInfo?.team?.name
	const logo = clubInfo?.team?.logo

	return (
		<Grid item xs={12} md={9}>
			<Paper sx={{ marginBottom: '1rem' }}>
				<Title variant='h5' content={name} img={logo} back={true} button={true} />
				<ClubNavBar club={club} selectedTab={selectedTab} setSelectedTab={setSelectedTab} season={season} setSeason={setSeason} />
			</Paper>
			{isLoading ? <LoadingMessage/> : error ? <FetchError onRetry={load} /> : <>
				{ selectedTab === 0 && <ClubHomeDashboard name={name} logo={logo} club={club} fixtures={fixtures} squad={squad} news={news} /> }
				{ selectedTab === 1 && <ClubFixturesDashboard fixtures={fixtures} name={name} logo={logo} /> }
				{ selectedTab === 2 && <ClubStatsDashboard stats={stats} name={name} logo={logo} /> }
				{ selectedTab === 3 && <ClubSquadDashboard name={name} logo={logo} squad={squad?.[0]?.players || []}  /> }
			</>}
		</Grid>
	)
}

export default ClubShowPage;