import './league-home.scss'
import { Grid } from '@mui/material';
import HomeFixturesComponent from './league-home-fixtures';
import LeagueHomeStats from './league-home-stats';
import LeagueHomeTable from './league-home-table';
import React from 'react';
import NewsIndex from '../../news/news-index';

const LeagueHomeDashboard = ({ name, logo, news, fixtures, uniqueDates, table, top_scorers }) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={12} md={7}>
				<LeagueHomeTable table={table} />
				<NewsIndex news={news} title={`${name} News`} logo={logo} variant='h6' />
			</Grid>
			<Grid item xs={12} md={5}>
				<LeagueHomeStats top_scorers={top_scorers} />
				<HomeFixturesComponent fixtures={fixtures} uniqueDates={uniqueDates}/>
			</Grid>
		</Grid>
	)
}

export default LeagueHomeDashboard;