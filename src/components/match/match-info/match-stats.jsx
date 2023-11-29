import React from 'react';
import NoDataMessage from '../../util/no-data/no-data-message';
import { Box, Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from '@mui/material';
import Title from '../../util/title-util';

const MatchStats = ({match, header}) => {
	const theme = useTheme();
	let stats = match.statistics;

	let combinedStats = {}

	for (let team of stats) {
		for (let category of team.statistics) {
			if (category.type in combinedStats) {
				combinedStats[category.type].push(category.value || 0);
			} else {
				combinedStats[category.type] = [];
				combinedStats[category.type].push(category.value || 0);
			}
		}
	}

	const percentageStringToInteger = (percentageString) => {
		if (Number.isInteger(percentageString)) return percentageString;
		const cleanedString = percentageString.replace(/%/g, '').trim();
		// Parse the cleaned string as an integer
		const intValue = parseInt(cleanedString, 10);
		return intValue;
	}

	const displayTeamStats = (combinedStats) => {
		let result = [];

		for (let key in combinedStats) {
			let homeStat = combinedStats[key][0];
			let awayStat = combinedStats[key][1]
			let homeValue = percentageStringToInteger(homeStat);
			let awayValue = percentageStringToInteger(awayStat);
			let percentageHome;
			let percentageAway;

			if (homeValue === 0 && awayValue === 0) {
				percentageHome = 0;
				percentageAway = 0
			} else if (homeValue === 0) {
				percentageHome = 0;
				percentageAway = 100;
			} else if (awayValue === 0) {
				percentageHome = 100;
				percentageAway = 0;
			} else {
				percentageHome = homeValue / (homeValue + awayValue) * 100
				percentageAway = awayValue / (homeValue + awayValue) * 100
			}

			const isHomeLeading = percentageHome > percentageAway;
			const isNonZeroStat = (homeValue !== 0 || awayValue !== 0);

			result.push(
				[
				<TableRow key={key}>
						<TableCell align='left' sx={{ width: 'auto', borderBottom: 'none' }}>
						<Typography variant='body1'>
							{homeStat}
						</Typography></TableCell>
						<TableCell align='center' sx={{ width: 'auto', borderBottom: 'none' }} >
						<Typography variant='body1' sx={{color: theme.palette.text.secondary}}>
							{key}
						</Typography>
					</TableCell>
					<TableCell align='right' sx={{ width: 'auto', borderBottom: 'none' }}>
						<Typography variant='body1'>
							{awayStat}
						</Typography>
					</TableCell>
				</TableRow>,
				<TableRow key={key + '_percentage'} sx={{height: 'fit-content', m: 0, p: 0 }}>
					<TableCell colSpan='3' sx={{ p: 0, m: 0 }}>
							{isNonZeroStat ? 
							<>
								<Box sx={{ backgroundColor: isHomeLeading ? theme.palette.primary.main : 'red' , display: 'inline-block', height: '.25rem', width:percentageHome + '%'}}></Box>
								<Box sx={{ backgroundColor: isHomeLeading? 'red': theme.palette.primary.main, display: 'inline-block', height: '.25rem', width:percentageAway + '%'}}></Box>
							</> :
								<>
									<Box sx={{ width: 50 + '%', height: '.25rem'}}></Box>
									<Box sx={{ width: 50 + '%', height: '.25rem'}}></Box>
								</>
							}
					</TableCell>
				</TableRow>
				]
			)
		}

		return result;
	}

	return (
		<Paper elevation={1} >
			<Title variant='h6' content='Match Stats'/>
			{!stats.length ? <NoDataMessage/> :
			<>
				{header}
				<Divider />
				<TableContainer>
					<Table size='small' aria-label='a dense table'>
						<TableBody>
							{displayTeamStats(combinedStats)}
						</TableBody>
					</Table>
				</TableContainer>
			</>
			}
		</Paper>
	)
}

export default MatchStats;