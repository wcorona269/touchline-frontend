import { Box, Grid, List, ListItem, ListItemButton, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
export const top_leagues = new Set([1, 2, 3, 4, 5, 9, 15, 17, 39, 45, 48, 140, 143, 78, 529, 81, 61, 66, 94, 135, 137, 253, 257])

const LiveFixturesDisplay = ({ matches }) => {
	const theme = useTheme();
	useEffect(() => {}, [matches]);
	const navigate = useNavigate();

	const handleClick = (id) => {
		navigate(`/match/${id}`)
	}

	const displayMatch = (fixture) => {
		let result = [];
		let teams = fixture.teams;
		for (let team of Object.keys(teams)) {
			const team_name = teams[team].name;
			const team_logo = teams[team].logo;
			const team_id = teams[team].id;
			const winner = teams[team].winner;
			const num_goals = fixture.goals[team] || 0;
			result.unshift(
				<Grid container className={winner === true ? 'winning team' : ''} sx={{marginTop: '8px', marginBottom: '8px'}} key={team_id}>
					<Grid item xs={2}>
						<img alt='' src={team_logo} style={{display: 'flex', alignItems: 'center', justifyContent: 'left', height: '1.25rem', width: '1.25rem'}}/>
					</Grid>
					<Grid item xs={9}>
						<Typography variant='body2' className={winner === true ? 'winning-team' : ''}>
							{team_name}
						</Typography>
					</Grid>
					<Grid item xs={1}>
						<Typography id='goal-display' variant='body2'>
							{num_goals}
						</Typography>
					</Grid>
				</Grid>
			)}
		return (
			<ListItem disablePadding divider key={fixture.fixture.id}>
				<ListItemButton onClick={() => handleClick(fixture.fixture.id)} sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '6rem', justifyContent: 'space-around'}}>
					<Typography variant='caption' sx={{color: theme.palette.text.disabled, width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center' }}>
						<img alt='' src={fixture.league.flag} style={{ height: '.75rem', width: '1.25rem', marginRight: '.25rem' }} />
						{fixture.league.name}
					</Typography>
					<Grid container>
						<Grid item xs={11}>{result}</Grid>
						<Grid item xs={1}>
							<Typography variant='caption' sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.palette.text.disabled}}>
								{fixture.fixture.status.elapsed}'
							</Typography>
						</Grid>
					</Grid>
				</ListItemButton>
			</ListItem>
		);
	}

	const displayLiveMatches = (matches) => {
		if (!matches?.length) return (
			<Typography align='center' variant='subtitle1' sx={{ p: 2, color: theme.palette.text.disabled}}>
				No live matches at the moment.
			</Typography>
		)
		let matchesByCompetition = {};
		let result = [];

		for (let match of matches) {
			if (match.league.name in matchesByCompetition) {
				matchesByCompetition[match.league.name].push(match);
			}
			else {
				matchesByCompetition[match.league.name] = [];
				matchesByCompetition[match.league.name].push(match);
			}
		}

		for (let competition in matchesByCompetition) {
			let competitionMatches = [];
			let competition_id;
			for (let match of matchesByCompetition[competition]) {
				if (competition_id === undefined) competition_id = match?.league?.id;
				competitionMatches.push(
					displayMatch(match)
				)
			}

			if (top_leagues.has(competition_id)) {
				result.unshift(
					 <List sx={{padding: '0px'}} key={competition}>
						{competitionMatches}
					</List>
				)
			} else {
				result.push(
					 <List sx={{padding: '0px'}} key={competition}>
						{competitionMatches}
					</List>
				)
			}
		}
		return result;
	}


	return (
		<Box className='live-fixtures-display'>
			<Box sx={{maxHeight: '40rem', overflowY: 'scroll'}}>
				{displayLiveMatches(matches)}
			</Box>
		</Box>
	)
}

export default LiveFixturesDisplay;