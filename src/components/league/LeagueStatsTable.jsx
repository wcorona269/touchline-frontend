import React from 'react';
import { useNavigate } from 'react-router-dom';
import NoDataMessage from '../util/no-data/no-data-message';
import { Link, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Avatar, useTheme, Typography } from '@mui/material';

const LeagueStatsTable = ({data, category}) => {
	const navigate = useNavigate()
	const theme = useTheme();
	const columns = ['Rank', 'Player', 'Club', 'Nationality', category];	
	if (!data.length) {
		return <NoDataMessage/>
	}
	return (
		<TableContainer>
			<Table size='small' aria-label='a dense table'>
				<TableHead sx={{backgroundColor: theme.palette.action.hover}} >
					<TableRow>
						{columns.map((column, idx) => {
							let width;
							if (idx === 0) width = 'fit-content';
							if (idx === 1) width = '50%';
							if (idx !== 0 && idx !== 1) width = 'auto';

							return (
								<TableCell sx={{ width: width }} align={idx === 1 || idx === 3 ? 'left' : 'center'  } key={idx} >
									<Typography variant='body1' sx={{ 
										fontFamily: theme.typography.bold,
										color: theme.palette.text.secondary
										}}>
										{column}
									</Typography>
								</TableCell>
							)
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((player, idx) => {
						let statistics = player['statistics'][0];
						const id = player.player.id;
						const club = statistics['team']['logo'];
						const icon = player['player']['photo'];
						const goals = statistics['goals']['total']
						const assists = statistics['goals']['assists']
						const name = player['player']['name']
						const nation = player['player']['nationality'];

						return (
							<TableRow key={idx} >
								<TableCell sx={{ fontFamily: theme.typography.bold }} align='center' >
									{idx + 1}
								</TableCell>
								<TableCell sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} ><Avatar sx={{ marginRight: '.25rem', height: '1.5rem', width: '1.5rem' }} src={icon} />
									<Link underline='hover' onClick={() => navigate(`/player/${id}`)} sx={{color: theme.palette.secondary.main, fontFamily: theme.typography.bold }} >
										{name}
									</Link>
								</TableCell>
								<TableCell align='center'>
									<Avatar sx={{ margin: 'auto', borderRadius: '50%', height: '1.5rem', width: '1.5rem' }} src={club} />
								</TableCell>
								<TableCell>
									{nation}
								</TableCell>
								<TableCell align='center' sx={{fontFamily: theme.typography.bold}}>
									{category === 'Goals' ? goals : assists}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}

export default LeagueStatsTable;