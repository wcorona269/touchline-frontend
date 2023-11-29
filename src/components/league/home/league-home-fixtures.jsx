import React from 'react'
import DisplayTime from '../../util/display-time';
import { formatDate } from '../../club/club-fixtures-table';
import { Box, Link, Paper, Grid, Typography, List, ListItem, ListItemButton, Divider, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Title from '../../util/title-util';
import { match_not_played } from '../match-card';

const HomeFixturesComponent = ({fixtures}) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const displayTeams = (fixture) => {
		let result = [];
		let teams = fixture.teams;

		for (let team of Object.keys(teams)) {
			const team_id = teams[team].id;
			const team_name = teams[team].name;
			const team_logo = teams[team].logo;
			const team_goals = fixture.goals[team] || 0
			const status = fixture.fixture.status.short;
			const winner = teams[team].winner;
			const started = !match_not_played.has(status);
			const num_goals = started ? team_goals : '-';

			result.unshift(
				<Grid container className={winner === true ? 'winning team' : ''}>
					<Grid item xs={2}>
							<img alt='' src={team_logo} />
					</Grid>
					<Grid item xs={9}>
						<Link sx={{color: theme.palette.text.primary}} underline='hover' onClick={() => navigate(`/club/${team_id}`)}>
							<Typography variant='body2' className={winner === true ? 'winning-team' : ''}>
								{team_name}
							</Typography>
						</Link>
					</Grid>
					<Grid item xs={1}>
						<Typography id='goal-display' variant='h6'>
							{num_goals}
						</Typography>
					</Grid>
				</Grid>
			)
		}

		return result;
	}

	const displayUpcomingFixtures = (fixtures) => {
		const match_dates = new Set()
		let result = []

		let today = new Date();
		today.setHours(0, 0, 0, 0);

		for (let fixture of fixtures) {
			if (result.length === 20) {
				break;
			}
			const match_date = fixture.fixture.date;
			const day_of_week = new Date(fixture.fixture.date).getDay();
			const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			const day_name = days[day_of_week];
			
			if (new Date(match_date) > today ) {
				let NewTitle;
				if (!match_dates.has(match_date.split('T')[0])) {
					NewTitle = (
						[<Typography variant="subtitle1" gutterBottom sx={{ margin: '0px', padding: '.5rem', paddingLeft: '1rem', backgroundColor: theme.palette.action.hover}}>
							{day_name}, {formatDate(match_date)}
						</Typography>,
						<Divider/>]
					)
					match_dates.add(match_date.split('T')[0]);
				}
				result.push(
					<>
						{NewTitle}
						<ListItem divider disablePadding >
							<ListItemButton>
								<Box className='home-fixture-li'>
									<Typography id='time-element' variant='body2'>
										<DisplayTime match={fixture}/>
									</Typography>
									{displayTeams(fixture)}
								</Box>
							</ListItemButton>
						</ListItem>
					</>
				)
			}
		}

		return result;
	}

	if (!fixtures) return <>
	</>

	return (
		<Paper
			className='home-paper'
			id='sticky-paper'
			elevation={1}
		>
			<Title variant='h6' content='Upcoming Fixtures' />
			<List sx={{p: 0, overflow: 'scroll'}}>
				{displayUpcomingFixtures(fixtures)}
			</List>
		</Paper>
	)
}

export default HomeFixturesComponent;