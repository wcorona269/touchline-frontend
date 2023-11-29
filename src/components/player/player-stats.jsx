import React from 'react'
import NoDataMessage from '../util/no-data/no-data-message';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from '@mui/material';
import Title from '../util/title-util';
import YellowCard from '../../images/yellow.png'
import RedCard from '../../images/red.png'

const PlayerStats = ({statistics}) => {
	const theme = useTheme();

	if (!statistics.length) {
		return <NoDataMessage/>
	}

	const displayStats = (statistics) => {
		
		let result = [];

		let totals = {
			'apps': 0,
			'goals': 0,
			'assists': 0,
			'passes': 0,
			'dribbles': 0,
			'tackles': 0,
			'interceptions': 0,
			'yellow': 0,
			'red': 0,
		}

		for (let i of statistics) {
			const competition = i.league.name || 0;
			const apps = i.games.appearences || 0;
			const goals = i.goals.total || 0;
			const assists = i.goals.assists || 0;
			const passes = i.passes.total || 0;
			const dribbles = i.dribbles.success || 0;
			const tackles = i.tackles.total || 0;
			const interceptions = i.tackles.interceptions || 0;
			const yellow = i.cards.yellow || 0;
			const red = i.cards.red || 0;

			totals['apps'] += apps;
			totals['goals'] += goals;
			totals['assists'] += assists;
			totals['passes'] += passes;
			totals['dribbles'] += dribbles;
			totals['tackles'] += tackles;
			totals['interceptions'] += interceptions;
			totals['yellow'] += yellow;
			totals['red'] += red;

			result.push(
				<TableRow>
					<TableCell component='th' align='left' sx={{ padding:1 }} id='competition'>{competition}</TableCell>
					{/* <TableCell sx={{padding: 1}}  align='left' >{team}</TableCell> */}
					<TableCell sx={{padding: 1}} align='center' >{apps}</TableCell>
					<TableCell sx={{padding: 1}} align='center' >{goals}</TableCell>
					<TableCell sx={{padding: 1}} align='center' >{assists}</TableCell>
					<TableCell sx={{padding: 1}} align='center' >{passes}</TableCell>
					<TableCell sx={{padding: 1}} align='center' >{dribbles}</TableCell>
					<TableCell sx={{padding: 1}} align='center' >{tackles}</TableCell>
					<TableCell sx={{padding: 1}} align='center' >{interceptions}</TableCell>
					<TableCell sx={{padding: 1}} align='center' >{yellow}</TableCell>
					<TableCell sx={{padding: 1}} align='center' >{red}</TableCell>
				</TableRow>
			)
		}

		result.push(
			<TableRow sx={{backgroundColor: theme.palette.primary.main }}>
				<TableCell sx={{ padding: 1, fontFamily: theme.typography.bold }} id='competition'>Total</TableCell>
				{/* <TableCell sx={{ padding: 1, fontFamily: theme.typography.bold }} id='team'>-</TableCell> */}
				<TableCell align='center' sx={{ padding: 1, fontFamily: theme.typography.bold }}>{totals['apps']}</TableCell>
				<TableCell align='center' sx={{ padding: 1, fontFamily: theme.typography.bold }} >{totals['goals']}</TableCell>
				<TableCell align='center' sx={{ padding: 1, fontFamily: theme.typography.bold }} >{totals['assists']}</TableCell>
				<TableCell align='center' sx={{ padding: 1, fontFamily: theme.typography.bold }} >{totals['passes']}</TableCell>
				<TableCell align='center' sx={{ padding: 1, fontFamily: theme.typography.bold }} >{totals['dribbles']}</TableCell>
				<TableCell align='center' sx={{ padding: 1, fontFamily: theme.typography.bold }} >{totals['tackles']}</TableCell>
				<TableCell align='center' sx={{ padding: 1, fontFamily: theme.typography.bold }} >{totals['interceptions']}</TableCell>
				<TableCell align='center' sx={{ padding: 1, fontFamily: theme.typography.bold }} >{totals['yellow']}</TableCell>
				<TableCell align='center' sx={{ padding: 1, fontFamily: theme.typography.bold }} >{totals['red']}</TableCell>
			</TableRow>
		)


		return result;
	}

	return (
		<Paper elevation={1} >
			<Title variant='h6' content='Player Statistics' />
			<Table >
				<TableHead sx={{ backgroundColor: theme.palette.action.hover }}>
					<TableRow>
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' id='competition'>Competition</TableCell>
						{/* <TableCell sx={{ padding: 1, fontFamily: theme.typography.bold }} component='th' id='team'>Team</TableCell> */}
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' align='center' >App.</TableCell>
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' align='center' >G</TableCell>
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' align='center' >A</TableCell>
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' align='center' >Pas.</TableCell>
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' align='center' >Drib.</TableCell>
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' align='center' >Tack.</TableCell>
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' align='center' >Int.</TableCell>
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' align='center' >
							<img alt='yellow cards' src={YellowCard} style={{ height: '1.25rem', width: '1rem'}}/>
						</TableCell>
						<TableCell sx={{ color: theme.palette.text.secondary, padding: 1, fontFamily: theme.typography.bold }} component='th' align='center' >
							<img alt='red cards' src={RedCard} style={{ height: '1.25rem', width: '1rem'}}/>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{displayStats(statistics)}
				</TableBody>
			</Table>
		</Paper>
	)
}

export default PlayerStats;