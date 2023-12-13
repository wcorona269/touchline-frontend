import React from 'react';
import { Box, Grid } from '@mui/material';
import { top_leagues } from '../../home/live-fixtures-display';
import Title from '../../util/title-util';
import MatchCard from '../../league/match-card';

const MatchIndexListItem = ({nation, matches}) => {
	let flag;

	const displayMatches = (matches) => {
		let result = [];
		for (let match of matches) {
			if (flag === undefined) flag = match?.league?.flag;
			if (top_leagues.has(match?.league?.id)) {
				result.unshift(
					<MatchCard fixture={match} league={true} />
				)
			} else {
				result.push(
					<MatchCard fixture={match} league={true} />
				)
			}
		}
			
		return (
			<Box elevation={1}>
				<Title variant='h6' img={flag} content={nation} />
				<Grid container columns={8} spacing={1} sx={{padding: 2}}>
					{result}
				</Grid>
			</Box>
		)
	}

	return (
		<Box>
			{displayMatches(matches)}
		</Box>
	)
}

export default MatchIndexListItem;