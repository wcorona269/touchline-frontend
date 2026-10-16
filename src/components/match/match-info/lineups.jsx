import React from 'react'
import NoDataMessage from '../../util/no-data/no-data-message';
import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from '@mui/material';
import Title from '../../util/title-util';

const Lineups = ({ lineups, header }) => {
	const theme = useTheme();
	let result = [];
	lineups.forEach((lineup, idx) => {
		const coach = lineup.coach.name;
		const eleven = lineup.startXI;
		const subs = lineup.substitutes;

		result.push(
			<TableContainer>
				<Table size='small' aria-label='a dense table'>
					<TableBody>
						<TableRow>
							<TableCell sx={{ px: 2, py: 1, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.palette.text.secondary, backgroundColor: theme.palette.action.hover }} >
								Coach
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={{ px: 2, py: 1 }}>
								{coach}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={{ px: 2, py: 1, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.palette.text.secondary, backgroundColor: theme.palette.action.hover }} >   
								Starting XI
							</TableCell>
						</TableRow>
						{eleven.map((player, idx) => (
							<TableRow key={idx}><TableCell sx={{ px: 2, py: 1 }} ><Box component='span' sx={{ display: 'inline-block', width: 26, color: theme.palette.text.disabled, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{player.player.number}</Box>{player.player.name}</TableCell></TableRow>
						))}
						<TableRow>
							<TableCell sx={{ px: 2, py: 1, fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.palette.text.secondary, backgroundColor: theme.palette.action.hover }} >
								Bench
							</TableCell>
						</TableRow>
						{subs.map((sub, idx) => (
							<TableRow key={idx} >
								<TableCell sx={{ px: 2, py: 1 }}>
									<Box component='span' sx={{ display: 'inline-block', width: 26, color: theme.palette.text.disabled, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{sub.player.number}</Box>{sub.player.name}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		)
	})

	return (
		<Paper >
			<Title variant='h6' content='Lineups' />
			{
				!lineups.length ? <NoDataMessage/> :
				<>
					{header}
					<Grid container>
						<Grid item xs={6}>
							{result[0]}
						</Grid>
						<Grid item xs={6}>
							{result[1]}
						</Grid>
					</Grid>
				</>
			}
		</Paper>
	)
}

export default Lineups;