import { Box, Grid } from '@mui/material';
import React from 'react'
import ClubHomeInfo from './club-home-info';
import HomeFixturesComponent from '../../league/home/league-home-fixtures';
import NewsIndex from '../../news/news-index';

const ClubHomeDashboard = ({ name, logo, club, fixtures, squad, news }) => {
	return (
		<Box>
			<Grid spacing={2} container>
				<Grid item xs={12} md={7} >
					<NewsIndex news={news} title={`${name} News`} logo={logo} variant='h6' />
				</Grid>
				<Grid item xs={12} md={5} >
					<ClubHomeInfo club={club}  />
					<HomeFixturesComponent fixtures={fixtures} limit={5} />
				</Grid>
			</Grid>
		</Box>
	)
}

export default ClubHomeDashboard;