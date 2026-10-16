import { Box, Paper, Typography, useTheme } from '@mui/material';
import React from 'react'
import Title from '../util/title-util';
import StandingsTable from './standings-table';

const MultiTableDashboard = ({ standings, name, logo }) => {
	const theme = useTheme();

	return (
		<Paper sx={{ marginTop: 2 }}>
			<Title variant='h6' content={`${name} Standings`} img={logo} />
			{standings.map((group, idx) => (
				<Box key={idx} sx={{ pt: 2, '&:not(:last-of-type)': { borderBottom: `1px solid ${theme.palette.divider}` } }}>
					<Typography variant='overline' sx={{ px: 2, fontWeight: 700, color: theme.palette.text.secondary }}>
						{group[0].group || group[0].description}
					</Typography>
					<StandingsTable rows={group} />
				</Box>
			))}
		</Paper>
	)
}

export default MultiTableDashboard;
