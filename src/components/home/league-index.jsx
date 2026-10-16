import React, { useEffect } from 'react';
import leaguesByCountry from './leaguesByCountry';
import { useTheme, Grid, Link, Stack, Typography, ButtonBase, Skeleton } from '@mui/material';
import Flag from '../util/country-flag';
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

const SHORT_NAMES = { 2: 'UCL', 3: 'UEL', 39: 'EPL', 253: 'MLS' };

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
			<TableCell key='nation' sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
				<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
					<Flag code={info['countryCode']} height='14' width='20' style={{ borderRadius: 3 }} />{name}
				</Box>
			</TableCell>
		];

		{
			Object.entries(info['leagues']).forEach(([league, id]) => {
				result.push(
					<TableCell key={id}>
						<Link underline='none' onClick={() => navigate(`/league/${id}`)} sx={{ color: theme.palette.text.secondary, fontWeight: 500, cursor: 'pointer', '&:hover': { color: theme.palette.primary.main } }} >
							{league}
						</Link>
					</TableCell>
				)
			})
		}

		while (result.length < 4) {
			result.push(
				<TableCell key={result.length} sx={{ color: theme.palette.text.disabled }}>—</TableCell>
			)
		}

		return (
			<TableRow key={name} hover>
				{result}
			</TableRow>
		)
	}

	const handleClick = (id) => {
		navigate(`/league/${id}`)
	}

	const listTopLeagues = () => {
		const tiles = (!top_leagues || isLoading) ?
			Array.from({ length: 8 }, (_, i) => <Skeleton key={i} variant='rounded' height={104} />) :
			Object.values(top_leagues).map(({ league: { id, name, logo } }) => (
				<ButtonBase
					key={id}
					onClick={() => handleClick(id)}
					sx={{
						flexDirection: 'column',
						gap: 1.25,
						py: 2,
						px: 1,
						borderRadius: '14px',
						border: `1px solid ${theme.palette.divider}`,
						transition: 'border-color .15s, background-color .15s, transform .15s',
						'&:hover': { borderColor: theme.palette.primary.main, backgroundColor: theme.palette.action.hover, transform: 'translateY(-2px)' },
					}}
				>
					<Box sx={{ width: 52, height: 52, borderRadius: '12px', backgroundColor: '#fff', display: 'grid', placeItems: 'center', p: 1 }}>
						<img alt='' src={logo} loading='lazy' style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
					</Box>
					<Typography noWrap sx={{ fontSize: 12.5, fontWeight: 600, maxWidth: '100%', color: theme.palette.text.secondary }}>
						{SHORT_NAMES[id] || name}
					</Typography>
				</ButtonBase>
			));

		return (
			<Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(4, 1fr)', md: 'repeat(8, 1fr)' }, gap: { xs: 1, sm: 1.5 }, p: 2 }}>
				{tiles}
			</Box>
		)
	}

	const headCell = { fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.palette.text.disabled };

	return (
		<Grid item xs={12} md={9}>
			<Box>
				<Stack spacing={2}>
					<Paper>
						<Title variant='h5' content='Top Leagues' />
						{listTopLeagues()}
					</Paper>
					<Paper>
						<Title variant='h6' content='All Leagues' />
						<TableContainer sx={{ maxWidth: '100%', overflowX: 'auto' }}>
							<Table sx={{ minWidth: 700, '& td, & th': { py: 1.25 }, '& tr:last-of-type td': { borderBottom: 'none' } }} size='small' >
								<TableHead>
									<TableRow>
										<TableCell sx={headCell}>Nation</TableCell>
										<TableCell sx={headCell} align="left">1st Division</TableCell>
										<TableCell sx={headCell} align="left">2nd Division</TableCell>
										<TableCell sx={headCell} align="left">3rd Division</TableCell>
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