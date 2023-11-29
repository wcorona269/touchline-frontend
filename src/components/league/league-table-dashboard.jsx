import React, {useEffect} from 'react'
import NoDataMessage from '../util/no-data/no-data-message';
import MultiTableDashboard from './multi-table-dashboard';
import Typography from '@mui/material/Typography';
import { TableCell, TableRow, TableContainer, Table, TableHead, TableBody, Link, useTheme, Paper, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import Title from '../util/title-util';

const LeagueTableDashboard = ({table, name, logo }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	useEffect(() => {}, [table])
	if (!table?.length) { return <NoDataMessage/> }
	const leagueName = table[0]?.league?.name;
	const leagueLogo = table[0]?.league?.logo;
	
	let leagueInfo = table[0]['league'];
	let standings = leagueInfo['standings'];

	if (standings?.length > 1) {
		return <MultiTableDashboard standings={standings} name={name} logo={logo} />
	}

	standings = leagueInfo['standings'][0];

	if (!standings?.length) {
		return <NoDataMessage/>
	}

	const columns = ['', 'Club', 'MP', 'W', 'D', 'L', 'GF', 'GC', 'GD', 'Pts', 'Form'];

	const displayForm = (form) => {
		const symbols = {
			'W': 'yellowgreen',
			'D': 'green',
			'L': 'red'
		}

		return (
			<>
				{form.split('').map((symbol, index) => {
					return (
						<Paper 
						style={{ 
							textAlign: 'center',
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							fontSize: '8px',
							height: '1rem',
							width: '1rem',
							fontFamily: theme.typography.bold,
							backgroundColor: symbols[symbol]
						}} key={index}>
						{symbol}
						</Paper>
					)}
				)}
			</>
		);
	};

	if (!standings?.length) {
		return <NoDataMessage/>
	}

	return (
		<Paper elevation={1} sx={{ mx: 'auto', marginTop: '1rem'}}>
			<Title variant='h6' content={`${leagueName} Table`} img={leagueLogo} />
			<TableContainer>
				<Table size='small' aria-label='a dense table' >
					<TableHead>
						<TableRow>
							{columns.map((column, idx) => (
								<TableCell sx={{ paddingRight: idx === 0 ? 0 : 1, width: idx === 1 ? '100%' : 'auto', color: theme.palette.text.secondary }} key={idx} id={column}>
									<Typography variant='body1' sx={{fontFamily: theme.typography.bold}}>
										{column}
									</Typography>
								</TableCell>
								))}
						</TableRow>
					</TableHead>
					<TableBody className='league-table-body'>
						{standings.map((club, idx) => {
							const clubId = club['team']['id'];
							const rank = club['rank'];
							const clubName = club['team']['name'];
							const clubLogo = club['team']['logo'];
							const clubData = club['all'];
							const goalsDiff = club['goalsDiff'];
							const points = club['points'];
							const form = club['form']
														
							return (
								<TableRow key={idx} className='league-table-row'>
								<TableCell sx={{ paddingRight: 0, color: theme.palette.text.secondary}}>{rank}</TableCell>
								<TableCell sx={{ paddingLeft: 1 }} >
									<Link underline='hover' sx={{ color: theme.palette.secondary.main, display: 'flex', flexDirection: 'row' }} onClick={() => navigate(`/club/${clubId}`)} >
										<img src={clubLogo} style={{ height: '1.5rem', width: '1.5rem', marginRight: '.5rem' }} alt=''/>
										<Typography sx={{ fontFamily: theme.typography.bold }}  variant='body1'>{clubName}</Typography>
									</Link>
								</TableCell>
								<TableCell>
									<Typography align='center' sx={{fontFamily: theme.typography.light}} variant='body1'>
										{clubData['played']}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography align='center' sx={{fontFamily: theme.typography.light}} variant='body1'>
										{clubData['win']}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography align='center' sx={{fontFamily: theme.typography.light}} variant='body1'>
										{clubData['lose']}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography align='center' sx={{fontFamily: theme.typography.light}} variant='body1'>
										{clubData['draw']}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography align='center' sx={{fontFamily: theme.typography.light}} variant='body1'>
										{clubData['goals']['for']}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography align='center' sx={{fontFamily: theme.typography.light}} variant='body1'>
										{clubData['goals']['against']}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography align='center' sx={{fontFamily: theme.typography.light}} variant='body1'>
										{goalsDiff}
									</Typography>
								</TableCell>
								<TableCell>
									<Typography align='center' variant='body1'>
										{points}
									</Typography>
								</TableCell>
								<TableCell >
									<Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }} >
										{displayForm(form)}
									</Box>
								</TableCell>
							</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default LeagueTableDashboard

