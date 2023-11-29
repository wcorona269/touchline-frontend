import './league-home.scss'
import { Grid } from '@mui/material';
import HomeFixturesComponent from './league-home-fixtures';
import LeagueHomeNews from './league-home-news';
import LeagueHomeStats from './league-home-stats';
import LeagueHomeTable from './league-home-table';
import React from 'react';

const LeagueHomeDashboard = ({ name, logo, news, fixtures, uniqueDates, table, top_scorers }) => {
	return (
		<Grid container spacing={2}>
			<Grid item xs={8}>
				<LeagueHomeNews news={news} table={table} name={name} logo={logo} />
			</Grid>
			<Grid item xs>
				<LeagueHomeTable table={table} />
				<LeagueHomeStats top_scorers={top_scorers} />
				<HomeFixturesComponent fixtures={fixtures} uniqueDates={uniqueDates}/>
			</Grid>
		</Grid>
	)
}

export default LeagueHomeDashboard;