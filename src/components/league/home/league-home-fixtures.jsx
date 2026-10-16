import React from 'react'
import DisplayTime from '../../util/display-time';
import { formatDate } from '../../club/club-fixtures-table';
import { Box, Link, Paper, Typography, List, ListItem, ListItemButton, useTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Title from '../../util/title-util';
import { match_not_played } from '../match-card';

const HomeFixturesComponent = ({ fixtures, limit = 20 }) => {
	const theme = useTheme();
	const navigate = useNavigate();

	const displayTeams = (fixture) => {
		let result = [];
		let teams = fixture.teams;

		for (let team of ['home', 'away']) {
			const team_id = teams[team].id;
			const team_name = teams[team].name;
			const team_logo = teams[team].logo;
			const team_goals = fixture.goals[team] || 0
			const status = fixture.fixture.status.short;
			const winner = teams[team].winner;
			const started = !match_not_played.has(status);
			const num_goals = started ? team_goals : '-';

			result.push(
				<Box key={team} sx={{ display: 'flex', alignItems: 'center', gap: 1.25, py: 0.5 }}>
					<img alt='' src={team_logo} loading='lazy' style={{ width: 20, height: 20, objectFit: 'contain', flexShrink: 0 }} />
					<Link sx={{ color: theme.palette.text.primary, flex: 1, minWidth: 0, cursor: 'pointer' }} underline='hover' onClick={() => navigate(`/club/${team_id}`)}>
						<Typography variant='body2' noWrap sx={{ fontWeight: winner === true ? 700 : 500 }}>
							{team_name}
						</Typography>
					</Link>
					<Typography variant='body2' sx={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: started ? theme.palette.text.primary : theme.palette.text.disabled }}>
						{num_goals}
					</Typography>
				</Box>
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
			if (result.length === limit) {
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
						<Typography key={match_date} variant='caption' component='div' sx={{ px: 2, py: 1, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.palette.text.secondary, backgroundColor: theme.palette.action.hover }}>
							{day_name}, {formatDate(match_date)}
						</Typography>
					)
					match_dates.add(match_date.split('T')[0]);
				}
				result.push(
					<React.Fragment key={fixture.fixture.id}>
						{NewTitle}
						<ListItem divider disablePadding >
							<ListItemButton onClick={() => navigate(`/match/${fixture.fixture.id}`)} sx={{ borderRadius: 0, px: 2 }}>
								<Box sx={{ width: '100%', py: 0.5 }}>
									<Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>
										<DisplayTime match={fixture}/>
									</Typography>
									{displayTeams(fixture)}
								</Box>
							</ListItemButton>
						</ListItem>
					</React.Fragment>
				)
			}
		}

		return result;
	}

	const upcoming = fixtures ? displayUpcomingFixtures(fixtures) : [];
	if (!upcoming.length) return null;

	return (
		<Paper>
			<Title variant='h6' content='Upcoming Fixtures' />
			<List disablePadding>
				{upcoming}
			</List>
		</Paper>
	)
}

export default HomeFixturesComponent;