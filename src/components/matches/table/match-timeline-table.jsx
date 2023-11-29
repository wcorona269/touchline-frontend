import React from 'react';
import { Box, Grid } from '@mui/material';
import Title from '../../util/title-util';
import MatchCard from '../../league/match-card';

const MatchFeedItem = ({nation, matches}) => {
	let flag;

	const displayMatches = (matches) => {
		let result = [];
		for (let match of matches) {
			if (flag === undefined) flag = match?.league?.flag;
			result.push(
				<MatchCard  fixture={match} league={true} />
			)
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

export default MatchFeedItem;