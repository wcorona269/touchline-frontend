import React from 'react'
import NoDataMessage from '../util/no-data/no-data-message';
import MultiTableDashboard from './multi-table-dashboard';
import { Paper } from '@mui/material'
import Title from '../util/title-util';
import StandingsTable from './standings-table';

const LeagueTableDashboard = ({ table, name, logo }) => {
	if (!table?.length) { return <NoDataMessage/> }
	const leagueInfo = table[0]['league'];
	const standings = leagueInfo['standings'];

	if (standings?.length > 1) {
		return <MultiTableDashboard standings={standings} name={name} logo={logo} />
	}

	if (!standings?.[0]?.length) {
		return <NoDataMessage/>
	}

	return (
		<Paper sx={{ mx: 'auto', marginTop: '1rem' }}>
			<Title variant='h6' content={`${leagueInfo.name} Table`} img={leagueInfo.logo} />
			<StandingsTable rows={standings[0]} />
		</Paper>
	)
}

export default LeagueTableDashboard
