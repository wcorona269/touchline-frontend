import React from 'react'
import NoDataMessage from '../util/no-data/no-data-message';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, useTheme } from '@mui/material';
import Title from '../util/title-util';
import YellowCard from '../../images/yellow.png'
import RedCard from '../../images/red.png'

const PlayerStats = ({statistics}) => {
	const theme = useTheme();
	const headCell = { fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.palette.text.disabled, whiteSpace: 'nowrap' };

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

		const byAppearances = [...statistics].sort((a, b) => (b.games.appearences || 0) - (a.games.appearences || 0));
		for (let i of byAppearances) {
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
				<TableRow key={competition + i.team.id}>
					<TableCell component='th' align='left' sx={{ pl: 2, fontWeight: 600, whiteSpace: 'nowrap', color: theme.palette.text.primary }} id='competition'>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
							<Box sx={{ width: 22, height: 22, borderRadius: '6px', backgroundColor: '#fff', p: '2px', flexShrink: 0 }}>
								<img alt='' src={i.league.logo} loading='lazy' style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
							</Box>
							{competition}
						</Box>
					</TableCell>
					{/* <TableCell sx={{padding: 1}}  align='left' >{team}</TableCell> */}
					<TableCell align='center' >{apps}</TableCell>
					<TableCell align='center' >{goals}</TableCell>
					<TableCell align='center' >{assists}</TableCell>
					<TableCell align='center' >{passes}</TableCell>
					<TableCell align='center' >{dribbles}</TableCell>
					<TableCell align='center' >{tackles}</TableCell>
					<TableCell align='center' >{interceptions}</TableCell>
					<TableCell align='center' >{yellow}</TableCell>
					<TableCell align='center' >{red}</TableCell>
				</TableRow>
			)
		}

		result.push(
			<TableRow key='totals' sx={{ backgroundColor: theme.palette.action.hover, '& td': { fontWeight: 800, color: theme.palette.text.primary, borderBottom: 'none' } }}>
				<TableCell sx={{ pl: 2 }} id='competition'>All competitions</TableCell>
				{/* <TableCell sx={{ padding: 1, fontWeight: 700 }} id='team'>-</TableCell> */}
				<TableCell align='center'>{totals['apps']}</TableCell>
				<TableCell align='center' >{totals['goals']}</TableCell>
				<TableCell align='center' >{totals['assists']}</TableCell>
				<TableCell align='center' >{totals['passes']}</TableCell>
				<TableCell align='center' >{totals['dribbles']}</TableCell>
				<TableCell align='center' >{totals['tackles']}</TableCell>
				<TableCell align='center' >{totals['interceptions']}</TableCell>
				<TableCell align='center' >{totals['yellow']}</TableCell>
				<TableCell align='center' >{totals['red']}</TableCell>
			</TableRow>
		)


		return result;
	}

	return (
		<Paper>
			<Title variant='h6' content='Season Statistics' />
			<TableContainer sx={{ overflowX: 'auto' }}>
			<Table size='small' sx={{ '& td, & th': { py: 1.25 }, '& td': { fontVariantNumeric: 'tabular-nums', color: theme.palette.text.secondary } }}>
				<TableHead>
					<TableRow>
						<TableCell sx={headCell} component='th' id='competition'>Competition</TableCell>
						{/* <TableCell sx={{ padding: 1, fontWeight: 700 }} component='th' id='team'>Team</TableCell> */}
						<TableCell sx={headCell} component='th' align='center' >App.</TableCell>
						<TableCell sx={headCell} component='th' align='center' >G</TableCell>
						<TableCell sx={headCell} component='th' align='center' >A</TableCell>
						<TableCell sx={headCell} component='th' align='center' >Pas.</TableCell>
						<TableCell sx={headCell} component='th' align='center' >Drib.</TableCell>
						<TableCell sx={headCell} component='th' align='center' >Tack.</TableCell>
						<TableCell sx={headCell} component='th' align='center' >Int.</TableCell>
						<TableCell sx={headCell} component='th' align='center' >
							<img alt='yellow cards' src={YellowCard} style={{ height: '1.25rem', width: '1rem'}}/>
						</TableCell>
						<TableCell sx={headCell} component='th' align='center' >
							<img alt='red cards' src={RedCard} style={{ height: '1.25rem', width: '1rem'}}/>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{displayStats(statistics)}
				</TableBody>
			</Table>
			</TableContainer>
		</Paper>
	)
}

export default PlayerStats;