import React from 'react'
import NoDataMessage from '../../util/no-data/no-data-message';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, useTheme } from '@mui/material';
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
							<TableCell sx={{ fontFamily: theme.typography.bold, backgroundColor: theme.palette.action.hover, p: 1 }} >
								Coach
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={{p: 1}}>
								{coach}
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={{ fontFamily: theme.typography.bold, backgroundColor: theme.palette.action.hover, p: 1 }} >   
								Starting XI
							</TableCell>
						</TableRow>
						{eleven.map((player, idx) => (
							<TableRow key={idx}><TableCell sx={{p: 1}} >{player.player.name}</TableCell></TableRow>
						))}
						<TableRow>
							<TableCell sx={{ p: 1, fontFamily: theme.typography.bold, backgroundColor: theme.palette.action.hover }} >
								Bench
							</TableCell>
						</TableRow>
						{subs.map((sub, idx) => (
							<TableRow key={idx} >
								<TableCell sx={{ p: 1 }}>
									{sub.player.name}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		)
	})

	return (
		<Paper elevation={1} >
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