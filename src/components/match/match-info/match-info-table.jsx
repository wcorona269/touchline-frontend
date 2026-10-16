import { Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from '@mui/material'
import React from 'react'
import Title from '../../util/title-util'

const MatchInfoTable = ({ match }) => {
	const theme = useTheme();
	const leagueName = match?.league?.name;
	const date = match?.fixture?.date;
	const status = match?.fixture?.status?.long;
	const referee = match?.fixture?.referee;
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
		'Venue': venue
	}

	const displayTable = (matchInfo) => {
		let result = [];

		for (let key in matchInfo) {
			result.push(
				<TableRow key={key} sx={{ '&:last-of-type td, &:last-of-type th': { borderBottom: 'none' } }}>
					<TableCell component='th' sx={{ pl: 2, py: 1.25, width: 96, verticalAlign: 'top' }}>
						<Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
							{key}
						</Typography>
					</TableCell>
					<TableCell sx={{ pr: 2, py: 1.25 }}>
						<Typography variant='body2' sx={{ fontWeight: 600 }}>
							{matchInfo[key]}
						</Typography>
					</TableCell>
				</TableRow>
			)
		}

		return result;
	}

	return (
		<Paper>
			<Title variant='h6' content='Match Info' />
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