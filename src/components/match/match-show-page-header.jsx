import React from 'react';
import DisplayTime from '../util/display-time';
import { Box, Link, Paper, Stack, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const MatchShowPageHeader = ({match}) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const leagueName = match?.league?.name;
	const leagueLogo = match?.league?.logo;
	const timeDisplay = <DisplayTime match={match}/>;

	const displayTeams = (teams) => {
		let result = [];

		for (let ele in teams) {
			const team = teams[ele]; 
			
			result.push(
				<Box key={team.id} sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
					<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'center' }}>
						<img alt='' src={team.logo} style={{height: '3rem', width: '3rem', marginRight: '.5rem'}} />
						<Typography variant='h6'>
							<Link underline='hover' onClick={() => navigate(`/club/${team.id}`)} sx={{ color: theme.palette.text.primary }}>
								{team.name}
							</Link>
						</Typography>
					</Box>
					<Typography variant='h4' >
						{match.goals[ele]}
					</Typography>
				</Box>
			)
		}

		return result;
	}
	
	return (
		<Paper elevation={1} sx={{ p: 3 }}>
			<Stack spacing={2} direction='column-reverse' >
				<Typography variant='subtitle1' sx={{ color: theme.palette.text.secondary, display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
					<img alt='' src={leagueLogo} style={{height: '1.5rem', width: '1.5rem', marginRight: '.5rem'}} />
					{leagueName}
				</Typography>
				{displayTeams(match.teams)}
				<Typography variant='subtitle1' sx={{color: theme.palette.text.secondary}} >
					{timeDisplay}
				</Typography>
			</Stack>
		</Paper>
	)
}

export default MatchShowPageHeader;