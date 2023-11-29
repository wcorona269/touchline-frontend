import { Paper, Table, Link, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme, Box } from '@mui/material';
import React from 'react'
import Title from '../util/title-util';
import { useNavigate } from 'react-router-dom';

const MultiTableDashboard = ({ standings, name, logo }) => {
	const theme = useTheme()
	const navigate = useNavigate();

	const determineColumnWidth = (idx) => {
		if (idx === 0) return '10%';
		if (idx === 1) return '40%';
		return 'auto'
	}

	const displayIndividualTable = (table, idx) => {
		const leagueInfo = table[0].group || table[0].description;
		const columns = ['Pos', 'Club', 'MP', 'W', 'D', 'L', 'GF', 'GC', 'GD', 'Points'];

		return (
			<TableContainer sx={{marginTop: 2}}>
				<Typography variant='subtitle1' sx={{color: theme.palette.text.secondary}} >
					{leagueInfo}
				</Typography>
				<Table key={idx} size='small' aria-label='a dense table'>
					<TableHead>
						<TableRow>
							{columns.map((column, idx) => (
								<TableCell align={ idx === 1 ? 'left' : 'center' } component='th' key={idx} sx={{ width: determineColumnWidth(idx) }} >{column}</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{table.map((club, idx) => {
							const clubId = club['team']['id'];
							const rank = club['rank'];
							const clubName = club['team']['name'];
							const clubLogo = club['team']['logo'];
							const clubData = club['all'];
							const goalsDiff = club['goalsDiff'];
							const points = club['points'];

							return (
							<TableRow key={idx} >
								<TableCell align='center'>{rank}</TableCell>
								<TableCell align='left' >
									<Link onClick={() => navigate(`/club/${clubId}`)} sx={{ color: theme.palette.info.main }} >
										<Typography variant='body1' sx={{ display: 'flex', alignItems: 'center' }} >
											<img src={clubLogo} style={{height: '1.5rem', width: '1.5rem', marginRight: '.25rem'}} alt=''/>
											{clubName}
										</Typography>
									</Link>
								</TableCell>
								<TableCell align='center'>{clubData['played']}</TableCell>
								<TableCell align='center'>{clubData['win']}</TableCell>
								<TableCell align='center'>{clubData['lose']}</TableCell>
								<TableCell align='center'>{clubData['draw']}</TableCell>
								<TableCell align='center'>{clubData['goals']['for']}</TableCell>
								<TableCell align='center'>{clubData['goals']['against']}</TableCell>
								<TableCell align='center'>{goalsDiff}</TableCell>
								<TableCell align='center'>{points}</TableCell>
							</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		)
	}

	return (
		<Paper elevation={1} sx={{marginTop: 2}}>
			<Title variant='h6' content={`${name} Standings`} img={logo} />
			<Box sx={{padding: 2}}>
				{standings.map((group, idx) => (
					displayIndividualTable(group, idx)
				))}
			</Box>
		</Paper>
	)
}

export default MultiTableDashboard;