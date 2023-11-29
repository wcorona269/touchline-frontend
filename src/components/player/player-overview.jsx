import React from 'react'
import shorthandMonthsOfYear from '../league/shorthandMonths';
import { Box, Grid, Paper, Table, TableBody, TableCell, Card, CardMedia, CardContent, TableContainer, TableRow, Typography, useTheme } from '@mui/material';
import Title from '../util/title-util';

const PlayerOverview = ({player}) => {
	const theme = useTheme();
	
	const displayBirthDate = (birthInfo) => {
		if (birthInfo === 'N/A') return 'N/A'

		let date = birthInfo?.date;
		if (!date) return 'N/A';
		let [year, month, day] = birthInfo.date.split('-');
		return `${day} ${shorthandMonthsOfYear[Number(month)]} ${year}`
	}

	const name = player.player.name || 'Name Unavailable';
	const fullName = `${player.player.firstname || name} ${player.player.lastname || ''}`
	const photo = player.player.photo;
	const age = player.player.age || 'N/A';
	const nationality = player.player.nationality || 'N/A';
	const birth = player.player.birth || 'N/A';
	const birthPlace = `${player.player.birth.place || 'N/A'}, ${player.player.birth.country || ''}`
	const height = player.player.height || 'N/A';
	const weight = player.player.weight || 'NA';

	return (
		<Paper elevation={1}>
			<Title variant='h6' content={name} back={true} button={true} />
			<Grid container sx={{padding: 1}} spacing={2}>
				<Grid item xs={4}>
					<Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
						<Card raised={true} sx={{height: 250}}>
							<CardMedia
								component="img"
								image={photo}
								alt={name}
							/>
							<CardContent>
								<Typography variant='h6'>
									{name}
								</Typography>
								<Typography variant='caption' sx={{color: theme.palette.text.secondary }} >
									{age} years old
								</Typography>
							</CardContent>
						</Card>
					</Box>
				</Grid >
				<Grid item xs={8}>
					<TableContainer sx={{ border: `1px solid ${theme.palette.divider}` }}>
						<Table size='small' aria-label='a dense table' >
							<TableBody>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold, backgroundColor: theme.palette.action.hover }} component='th' align='center' colSpan={2}>
										Personal Information
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>
										Full Name
									</TableCell>
									<TableCell>
										{fullName}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Age</TableCell>
									<TableCell>{age}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Nationality</TableCell>
									<TableCell>
										{nationality}
									</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Date of Birth</TableCell>
									<TableCell>{displayBirthDate(birth)}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Place of Birth</TableCell>
									<TableCell>{birthPlace}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Height</TableCell>
									<TableCell>{height}</TableCell>
								</TableRow>
								<TableRow>
									<TableCell sx={{ width: '40%', color: theme.palette.text.secondary, fontFamily: theme.typography.bold }} component='th'>Weight</TableCell>
									<TableCell>{weight}</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Grid>
		</Paper>
	)
}

export default PlayerOverview;