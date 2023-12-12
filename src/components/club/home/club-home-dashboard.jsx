import { Box, Grid } from '@mui/material';
import React from 'react'
import ClubHomeInfo from './club-home-info';
import HomeFixturesComponent from '../../league/home/league-home-fixtures';
import NewsIndex from '../../news/news-index';

const ClubHomeDashboard = ({ name, logo, club, fixtures, squad, news }) => {
	return (
		<Box>
			<Grid spacing={2} container>
				<Grid item xs={8} >
					<NewsIndex news={news} title={`${name} News`} logo={logo} variant='h6' />
				</Grid>
				<Grid item xs={4} >
					<ClubHomeInfo club={club}  />
					<HomeFixturesComponent fixtures={fixtures} />
				</Grid>
			</Grid>
		</Box>
	)
}

export default ClubHomeDashboard;