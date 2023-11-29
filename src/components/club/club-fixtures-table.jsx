import React from 'react'
import monthsOfYear from './monthsOfYear';
import { Grid } from '@mui/material';
import MatchCard from '../league/match-card';

export const formatDate = (date) => {
	const dateString = new Date(date);
	const month = dateString.getMonth();
	const day = dateString.getDate();
	const abbreviatedMonth = monthsOfYear[month].slice(0, 3);
	return `${abbreviatedMonth} ${day}`;
}

const ClubFixturesTable = ({fixtures}) => {
	const displayFixtures = (fixtures) => {
		let result = [];
		fixtures.forEach((fixture, idx) => {
			result.push(
				<MatchCard key={idx} fixture={fixture} league={true} />
				)
		})
		return result;
	}

	return (
		<Grid container spacing={1}>
			{displayFixtures(fixtures)}
		</Grid>
	)
}

export default ClubFixturesTable;