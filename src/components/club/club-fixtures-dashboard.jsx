import React from 'react'
import ClubFixturesTable from './club-fixtures-table';
import monthsOfYear from './monthsOfYear';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import Title from '../util/title-util';

const ClubFixturesDashboard = ({fixtures, name, logo}) => {
	const theme = useTheme()
	const fixturesSortedByDate = fixtures.sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));
	const monthsOfFixtures = new Set();
	let fixturesByDate = [];

	const determineNewMonth = (fixture) => {
		const dateString = fixture.fixture.date;
		const date = new Date(dateString);
		const year = date.getFullYear();
		const month = date.getMonth();

		const monthOfMatch = `${monthsOfYear[month]} ${year}`

		if (monthsOfFixtures.has(monthOfMatch)) {
			return [false, monthOfMatch];
		} else {
			monthsOfFixtures.add(monthOfMatch);
			return [true, monthOfMatch];
		}
	}

	for (let fixture of fixturesSortedByDate) {
		const [boolean, month] = determineNewMonth(fixture);
		if (boolean === true) {
			fixturesByDate.push([]);
			fixturesByDate[fixturesByDate.length - 1].push(month);
		}
		fixturesByDate[fixturesByDate.length - 1].push(fixture);
	}
	

	return (
		<Paper elevation={1} sx={{marginTop: '1rem'}}>
			<Title variant='h6' content={`${name} Fixtures`} img={logo} size='2rem' />
			{fixturesByDate.map(month_of_fixtures => {
				let month = month_of_fixtures.shift();
				return (
					<Box sx={{ p: 1 }}>
						<Box sx={{width: '100%'}}>
							<Typography variant='h6' sx={{py: 1, fontFamily: theme.typography.bold}}>
								{month}
							</Typography>
						</Box>
						<ClubFixturesTable fixtures={month_of_fixtures} />
					</Box>
				)
			})}
		</Paper>
	)
}

export default ClubFixturesDashboard;