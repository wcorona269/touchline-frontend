import { Box, CircularProgress, Link, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchStandings } from '../../../actions/standings_actions';
import { useNavigate } from 'react-router-dom';
import Title from '../../util/title-util';
import NoDataMessage from '../../util/no-data/no-data-message';

const MiniLeagueTable = ({ match, homeTeam, awayTeam }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();
	const leagueId = match?.league?.id;
	const isLoading = useSelector(state => state.standings.isLoading);
	const standings = useSelector(state => state.standings?.standings?.[0]);
	const standings_data = standings?.league?.standings || [];
	const league_logo = standings?.league?.logo;
	const league_name = standings?.league?.name || '';
	

	useEffect(() => {
		dispatch(fetchStandings(leagueId))
	}, []);

	useEffect(() => {}, [isLoading])

	const displayTable = (standings, group=false) => {
		if (!standings.length) {
			return (
				<Box sx={{p: 2}}>
					<NoDataMessage/>
				</Box>
			)
		}
		let result = []; 
		let thead = [];
		let tbody = [];

		if (standings.length > 1 && Array.isArray(standings[0])) {
			for (let i = 0; i < standings.length; i++) {
				let sub_table = displayTable(standings[i], true)
				result.push(sub_table);
			}
		} else {
			if (group === true) {
				result.push(
					<Box sx={{ p: 1, backgroundColor: theme.palette.action.hover }}>
						<Typography variant='body2' sx={{ fontFamily: theme.typography.bold, color: theme.palette.text.secondary }}>
							{standings[0]?.group}
						</Typography>
					</Box>
				)
			} else {
				standings = standings[0];
			}

			thead.push(
				<TableRow>
					<TableCell component='th' sx={{ p: 1, width: '5%', fontFamily: theme.typography.bold }}>
						Pos
					</TableCell>
					<TableCell component='th' sx={{ p: 1, width: '85%', fontFamily: theme.typography.bold }}>
						Team
					</TableCell>
					<TableCell component='th' sx={{ p: 1, width: '5%', fontFamily: theme.typography.bold }}>
						MP
					</TableCell>
					<TableCell component='th' sx={{ p: 1, width: '5%', fontFamily: theme.typography.bold }}>
						P
					</TableCell>
				</TableRow>
			)
			
			standings.forEach((ele, idx) => {
				let isPlayingTeam = ele['team']['name'] === homeTeam || ele['team']['name'] === awayTeam;

				tbody.push(
					<TableRow key={idx} sx={{ backgroundColor: isPlayingTeam ? theme.palette.action.hover : '' }}>
						<TableCell align='left' sx={{ p: 1 }}>
							<Typography variant='body2'>
								{ele['rank']}
							</Typography>
						</TableCell>
						<TableCell align='left' sx={{p:1 }}>
							<Typography variant='body2'>
								<Link underline='hover' sx={{ color: theme.palette.info.main, fontFamily: isPlayingTeam ? theme.typography.bold : theme.typography.ubuntu  }} onClick={() => navigate(`/club/${ele['team']['id']}`)}>
									{ele['team']['name']}
								</Link>
							</Typography>
						</TableCell>
						<TableCell align='center' sx={{ p: 1 }}>
							<Typography variant='body2'>
								{ele['all']['played']}
							</Typography>
						</TableCell>
						<TableCell align='center' sx={{ p: 1 }}>
							<Typography variant='body2'>
								{ele['points']}
							</Typography>
						</TableCell>
					</TableRow>
				)
			})
		}

		return (
			<>
				{result}
				<TableContainer>
					<Table>
						<TableHead>
							{thead}
						</TableHead>
						<TableBody>
							{tbody}
						</TableBody>
					</Table>
				</TableContainer>
			</>
		)
	}

	return (
		<Paper elevation={1}>
			<Title variant='subtitle1' content={`${league_name} Standings`} img={league_logo}/>
			{ isLoading ?
				<Box sx={{ height: '20rem', width: '100%', display: 'flex', alignItems: 'center' }}>
					<CircularProgress
						sx={{ margin: 'auto' }}
					/>
				</Box> :
				<>
					{displayTable(standings_data)}
				</>
			}
		</Paper>
	)
}

export default MiniLeagueTable;