import React, { useState } from 'react';
import { Tabs, Tab, Paper, Box } from '@mui/material';
import LeagueStatsTable from './LeagueStatsTable';
import Title from '../util/title-util';

const LeagueStatsDashboard = ({top_scorers, top_assists}) => {
	const [selectedTab, setSelectedTab] = useState(0);

	const handleChange = (event, newValue) => {
		setSelectedTab(newValue)
	}

	const leagueName = top_scorers[0].statistics[0].league.name
	const leagueLogo = top_scorers[0].statistics[0].league.logo;
	
	return (
		<Paper elevation={1} sx={{ mx: 'auto' }}>
			<Title variant='h6' content={`${leagueName} Stats`} img={leagueLogo} />
			<Box>
				<Tabs value={selectedTab} onChange={handleChange} >
					<Tab label='Goals'/>
					<Tab label='Assists'/>
				</Tabs>
				<Box>
					{
						selectedTab === 0 ? 
						<LeagueStatsTable data={top_scorers} category={'Goals'} /> :
						<LeagueStatsTable data={top_assists} category={'Assists'}/>
					}
				</Box>
			</Box>
		</Paper>
	)
}

export default LeagueStatsDashboard;