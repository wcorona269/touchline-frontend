
import React from 'react';
import { Box, TableContainer, Table, TableHead, TableCell, TableRow, useTheme, Paper } from '@mui/material';
import YellowCard from '../../images/yellow.png';
import RedCard from '../../images/red.png';
import Title from '../util/title-util';

const ClubStatsDashboard = ({ name, logo, stats }) => {
	const theme = useTheme(); 
	const headCell = { fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.palette.text.disabled, textAlign: 'center', whiteSpace: 'nowrap' };
	
	const displayTeamStats = (stats) => {
		let result = [];
		let totals = {
			'played': 0,
			'wins': 0,
			'losses': 0,
			'draws': 0,
			'goals_forced': 0,
			'goals_conceded': 0,
			'yellow_cards': 0,
			'red_cards': 0,
			'clean_sheets': 0,
		}

		for (let league of stats.filter(entry => entry?.league)) {
			const competition = league.league.name || 'N/A';
			const played = league.fixtures.played.total || 0;
			const wins = league.fixtures.wins.total || 0
			const losses = league.fixtures.loses.total || 0;
			const draws = league.fixtures.draws.total || 0;
			const logo = league.league.logo || null;
			const goalsForced = league.goals.for.total.total || 0;
			const goalsConceded = league.goals.against.total.total || 0;
			const goalDifference = goalsForced - goalsConceded;
			let yellowCards = 0;
			let redCards = 0;
			let cleanSheets = league.clean_sheet.total || 0;

			for (let key in league.cards.yellow) {
				let total = league.cards.yellow[key].total || 0;
				yellowCards += total;
			}

			for (let key in league.cards.red) {
				let total = league.cards.red[key].total || 0;
				redCards += total;
			}

			totals['played'] += played;
			totals['wins'] += wins;
			totals['losses'] += losses;
			totals['draws'] += draws;
			totals['goals_forced'] += goalsForced;
			totals['goals_conceded'] += goalsConceded;
			totals['yellow_cards'] += yellowCards;
			totals['red_cards'] += redCards;
			totals['clean_sheets'] += cleanSheets;

			result.push(
				<TableRow key={competition}>
					<TableCell sx={{ pl: 2, fontWeight: 600, whiteSpace: 'nowrap' }}>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
							<Box sx={{ width: 22, height: 22, borderRadius: '6px', backgroundColor: '#fff', p: '2px', flexShrink: 0 }}>
								<img alt='' src={logo} loading='lazy' style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}/>
							</Box>
							{competition}
						</Box>
					</TableCell>
					<TableCell>{played}</TableCell>
					<TableCell>{wins}</TableCell>
					<TableCell>{draws}</TableCell>
					<TableCell>{losses}</TableCell>
					<TableCell>{goalsForced}</TableCell>
					<TableCell>{goalsConceded}</TableCell>
					<TableCell>{goalDifference}</TableCell>
					<TableCell>{yellowCards}</TableCell>
					<TableCell>{redCards}</TableCell>
					<TableCell>{cleanSheets}</TableCell>
				</TableRow>
			)
		}

		result.push(
			<TableRow key='totals' id='totals' sx={{ backgroundColor: theme.palette.action.hover, '& td': { fontWeight: 800, color: theme.palette.text.primary, borderBottom: 'none' } }}>
				<TableCell sx={{ pl: 2 }}>All competitions</TableCell>
				<TableCell>{totals['played']}</TableCell>
				<TableCell>{totals['wins']}</TableCell>
				<TableCell>{totals['draws']}</TableCell>
				<TableCell>{totals['losses']}</TableCell>
				<TableCell>{totals['goals_forced']}</TableCell>
				<TableCell>{totals['goals_conceded']}</TableCell>
				<TableCell>{totals['goals_forced'] - totals['goals_conceded']}</TableCell>
				<TableCell>{totals['yellow_cards']}</TableCell>
				<TableCell>{totals['red_cards']}</TableCell>
				<TableCell>{totals['clean_sheets']}</TableCell>
			</TableRow>
		)
		return result;
	}


	return (
		<Paper sx={{marginTop: '1rem'}}>
			<Title variant='h6' content={`${name} Stats`} img={logo} />

			<TableContainer sx={{ overflowX: 'auto' }}>
			<Table size='small' sx={{ '& td': { py: 1.5, textAlign: 'center', fontVariantNumeric: 'tabular-nums', color: theme.palette.text.secondary }, '& td:first-of-type': { textAlign: 'left', color: theme.palette.text.primary } }}>
				<TableHead>
					<TableRow>
						<TableCell sx={{ ...headCell, pl: 2, textAlign: 'left' }}>Competition</TableCell>
						<TableCell sx={headCell}>MP</TableCell>
						<TableCell sx={headCell}>W</TableCell>
						<TableCell sx={headCell}>D</TableCell>
						<TableCell sx={headCell}>L</TableCell>
						<TableCell sx={headCell}>GF</TableCell>
						<TableCell sx={headCell}>GC</TableCell>
						<TableCell sx={headCell}>GD</TableCell>
						<TableCell sx={headCell}><img alt='yellow cards' src={YellowCard} style={{ width: '1rem', height: '1rem'}}/></TableCell>
							<TableCell sx={headCell}><img alt='red cards' src={RedCard} style={{ width: '1rem', height: '1rem' }} /></TableCell>
						<TableCell sx={headCell}>CS</TableCell>
					</TableRow>
				</TableHead>
				<tbody>
					{displayTeamStats(stats)}
				</tbody>
			</Table>
			</TableContainer>
		</Paper>
	)
}

export default ClubStatsDashboard;