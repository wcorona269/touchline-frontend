import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from '@mui/material'
import React from 'react'
import Title from '../../util/title-util'

const MatchInfoTable = ({ match }) => {
	const theme = useTheme();
	const leagueName = match?.league?.name;
	const date = match?.fixture?.date;
	const status = match?.fixture?.status?.long;
	const referee = match?.fixture?.referee;
	const time_zone = match?.fixture?.timezone;
	const venue = match?.fixture?.venue?.name;
	const country = match?.league?.country;
	const round = match?.league?.round;

	const matchInfo = {
		'Date': new Date(date).toDateString(),
		'Country': country,
		'League': leagueName, 
		'Round': round,
		'Referee': referee,
		'Status': status,
		'Timezone': time_zone,
		'Venue': venue
	}

	const displayTable = (matchInfo) => {
		let result = [];

		for (let key in matchInfo) {
			result.push(
				<TableRow>
					<TableCell component='th' sx={{padding: 1}}>
						<Typography variant='body2' sx={{fontFamily: theme.typography.bold}}>
							{key}
						</Typography>
					</TableCell>
					<TableCell sx={{padding: 0, color: theme.palette.text.secondary }}>
						<Typography variant='body2'>
							{matchInfo[key]}
						</Typography>
					</TableCell>
				</TableRow>
			)
		}

		return result;
	}

	return (
		<Paper elevation={1}>
			<Title variant='h5' content='Match Info' />
			<TableContainer>
				<Table size="small" aria-label="a dense table">
					<TableBody>
						{displayTable(matchInfo)}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default MatchInfoTable;