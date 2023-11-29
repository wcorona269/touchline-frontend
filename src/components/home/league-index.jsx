import React, { useEffect } from 'react';
import leaguesByCountry from './leaguesByCountry';
import { Container, useTheme, Grid, Link, Stack, Typography, Button, ListItem, ListItemButton, List, ButtonGroup, Skeleton } from '@mui/material';
import Flag from 'react-world-flags';
import { Box, Table, TableCell, TableHead, TableRow, Paper, TableContainer, TableBody } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Title from '../util/title-util';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaguesIndex } from '../../actions/api_actions';

const sortedLeaguesByCountry = Object.entries(leaguesByCountry)
	.sort((a, b) => a[0].localeCompare(b[0]))
	.reduce((acc, [key, value]) => {
		acc[key] = value;
			return acc;
	}, {})

const LeagueIndex = () =>  {
	const navigate = useNavigate();
	const theme = useTheme();
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.leagues.isLoading);
	const top_leagues = useSelector(state => state.leagues?.top_leagues)

	useEffect(() => {
		window.scrollTo(0, 0) 
		
		if (!isLoading) {
			dispatch(fetchLeaguesIndex())
		}
	}, [])

	const displayTableRow = (country, idx) => {
		const [name, info] = country;
		const result = [
			<TableCell sx={{display: 'flex', alignItems: 'center'}}><Flag code={info['countryCode']} height='14' width='20' style={{marginRight: '.25rem'}} />{name} </TableCell>
		];

		{
			Object.entries(info['leagues']).forEach(([league, id]) => {
				result.push(
					<TableCell>
						<Link underline='hover' onClick={() => navigate(`/league/${id}`)} sx={{ color: theme.palette.secondary.main }} >
							{league}
						</Link>
					</TableCell>
				)
			})
		}

		while (result.length < 4) {
			result.push(
				<TableCell>-</TableCell>
			)
		}

		return (
			<TableRow>
				{result}
			</TableRow>
		)
	}

	const handleClick = (id) => {
		navigate(`/league/${id}`)
	}

	const listTopLeagues = () => {
		let result = [];
		if (!top_leagues || isLoading) {
			for (let i = 0; i < 8; i++) {
				result.push(
					<Button variant='text' disablePadding elevation={3}
						sx={{
							mx: 2,
							backgroundColor: theme.palette.background.paper,
							borderColor: theme.palette.background.paper,
							color: theme.palette.text.secondary,
							padding: 0
						}}
					>
						<Skeleton variant="rectangular" height={80} width={75} />
					</Button>
				)
			}
		} else {
			const leagues = Object.values(top_leagues)
			leagues.forEach((league) => {
				const id = league['league']['id'];
				let name = league['league']['name'];
				const logo = league['league']['logo'];
				if (name === 'Premier League') name = 'EPL'
				if (name.split(' ').length > 2) {
					let words = name.split(' ')
					let name_str = '';
					for (let word of words) {
						name_str += word[0]
					}
					name = name_str
				}
	
	
				result.push(
					<Button variant='text' disablePadding onClick={() => handleClick(id)} elevation={3}
						sx={{
							backgroundColor: theme.palette.background.paper,
							borderColor: theme.palette.background.paper,
							color: theme.palette.text.secondary,
							padding: 0
						}}
					>
						<Paper sx={{height: '4rem', width: '4rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', p: 2}} >
							<img alt='' style={{ height: '2.5rem', width: '2.5rem', marginBottom: '.5rem' }} src={logo} title={name} />
							<Typography align='center' variant='subtitle2' sx={{ fontSize: 12, fontFamily: theme.typography.light, whiteSpace: 'nowrap' }}>
								{name}
							</Typography>
						</Paper>
					</Button>
				)
			});
		}
		return (
			<Container sx={{display: 'flex', flexDirection: 'column', padding: '1rem', gap: '1rem'}}> 
				<Box sx={{display: 'flex', flexDirection: 'row', gap: '.5rem' }}>
					<ButtonGroup>
						{result}
					</ButtonGroup>
				</Box>
			</Container>
		)
	}

	return (
		<Grid item xs={9}>
			<Box>
				<Paper elevation={0}>
					<Title variant='h5' content='Explore' />
				</Paper>
				<Stack spacing={2}>
					<Paper elevation={1}>
						<Title variant='h6' content='Top Leagues' />
						{listTopLeagues()}
					</Paper>
					<Paper elevation={1}>
						<Title variant='h6' content='All Leagues' />
						<TableContainer component={Paper}>
							<Table sx={{ minWidth: 700 }} size='small' >
								<TableHead>
									<TableRow sx={{backgroundColor: theme.palette.action.hover }}>
										<TableCell>Nation</TableCell>
										<TableCell align="left">1st Division</TableCell>
										<TableCell align="left">2nd Division</TableCell>
										<TableCell align="left">3rd Division</TableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{Object.entries(sortedLeaguesByCountry).map((country, idx) => (
										displayTableRow(country, idx)
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Paper>
				</Stack>
			</Box>
		</Grid>
	);
}

export default LeagueIndex;