import React from 'react';
import DisplayTime from '../util/display-time';
import { Box, Grid, Typography, Paper, useTheme, ListItemButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const match_not_played = new Set([
	'TBD',
	'NS',
	'PST',
	'CANC',
	'ABD',
	'AWD',
	'WO',
]);

const MatchCard = ({fixture, key, league}) => {
	const theme = useTheme()
	if (!key) {
		key = fixture.fixture.id
	}
	const navigate = useNavigate();
	const status = fixture.fixture.status.short;
	const competition = fixture.league.name;
	let started = !match_not_played.has(status);

	const displayTeams = (fixture) => {
		let result = [];
		let teams = fixture.teams;

		for (let team of Object.keys(teams)) {
			const team_name = teams[team].name;
			const team_logo = teams[team].logo;
			const winner = teams[team].winner;
			let num_goals

			if (started) {
				num_goals = fixture.goals[team] || 0
			} else {
				num_goals = '-'
			}

			result.unshift(
				<Grid container className={winner === true ? 'winning team' : ''}>
					<Grid item xs={10} align='left' sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
						<img alt='' src={team_logo} style={{height: '2rem', width: '2rem', marginRight: '.25rem'}} />
						<Typography variant='body2' sx={{ flexShrink: 1, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis'}} >
							{team_name}
						</Typography>
					</Grid>
					<Grid item xs={2} sx={{display: 'flex'}}>
						<Typography variant='h6' sx={{margin: 'auto'}}>
							{num_goals}
						</Typography>
					</Grid>
				</Grid>
			)
		}

		return result;
	}
	
	return (
		<Grid item xs={4} >
			<Paper elevation={10} key={key} sx={{width: '100%', color: theme.palette.text.primary }}>
				<ListItemButton variant='text' sx={{width: '100%', height: '100%'}} onClick={() => navigate(`/match/${fixture.fixture.id}`)}>
					<Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: '.5rem' }}>
						<Typography align='left' sx={{color: theme.palette.text.disabled }} variant='body2'>
							<DisplayTime match={fixture} />
						</Typography>
						{displayTeams(fixture)}
						{ !!league && 
							<Typography align='left' display='flex' alignItems='center' sx={{color: theme.palette.text.disabled }} variant='body2'>
								{competition}
							</Typography>
						 }
					</Box>
				</ListItemButton>
			</Paper>	
		</Grid>
	)
}

export default MatchCard;