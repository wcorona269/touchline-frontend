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

const ClubShowPage = () => {
	const { id } = useParams();
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.club.isLoading);
	const [selectedTab, setSelectedTab] = useState(0);
	const club = useSelector(state => state.club.club);
	const fixtures = useSelector(state => state.club.fixtures);
	const squad = useSelector(state => state.club.squad);
	const stats = useSelector(state => state.club.stats);
	const news = useSelector(state => state.club.news);

	useEffect(() => {
		let season = '2023/24'
		let formattedSeason = season.split('/')[0]
		if (!isLoading) {
			dispatch(fetchClub(id, formattedSeason));
		}
		window.scrollTo(0, 0)
	}, [id]);

	if (isLoading || !club) {
		return <LoadingMessage/>	
	}

	const clubInfo = club[0];
	const name = clubInfo?.team?.name
	const logo = clubInfo?.team?.logo

	return (
		<Grid item xs={9}>
			<Paper sx={{ marginBottom: '1rem' }} elevation={1}>
				<Title variant='h5' content={name} img={logo} back={true} button={true} />
				<ClubNavBar  club={club} selectedTab={selectedTab} setSelectedTab={setSelectedTab}/>
			</Paper>
			{ selectedTab === 0 && <ClubHomeDashboard name={name} logo={logo} club={club} fixtures={fixtures} squad={squad} news={news} /> }
			{ selectedTab === 1 && <ClubFixturesDashboard fixtures={fixtures} name={name} logo={logo} /> }
			{ selectedTab === 2 && <ClubStatsDashboard stats={stats} name={name} logo={logo} /> }
			{ selectedTab === 3 && <ClubSquadDashboard name={name} logo={logo} squad={squad[0].players}  /> }
		</Grid>
	)
}

export default ClubShowPage;