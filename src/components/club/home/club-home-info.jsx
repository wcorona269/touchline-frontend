import React from 'react';
import { Typography, Paper, Box, Table, TableRow, TableCell, TableHead, TableContainer, TableBody } from '@mui/material';
import Title from '../../util/title-util';

const ClubHomeInfo = ({ club }) => {
	const clubInfo = club[0];
	let city = clubInfo.venue.city || 'N/A';
	let country = clubInfo.team.country || 'N/A';

	let clubDetails = {
		'Logo': clubInfo.team.logo || 'N/A',
		'Name': clubInfo.team.name || 'N/A',
		'Location': `${city}, ${country}`,
		'Founded': clubInfo.team.founded || 'N/A',
		'National': clubInfo.team.national || 'false',
		'Stadium': clubInfo.venue.name || 'N/A',
		'Capacity': clubInfo.venue.capacity || 'N/A',
		'Address': clubInfo.venue.address || 'N/A',
		'Image': clubInfo.venue.image || 'N/A',
		'Surface': clubInfo.venue.surface || 'N/A'
	}

	const displayTable = (clubDetails) => {
		let result = [];

		for (let key in clubDetails) {
			if (key === 'Image' || key === 'Logo') {
			} else {
				result.push(
					<TableRow key={key}>
						<TableCell component='th' align='left'>
							<Typography variant='body2' className='table-key' >
								{key}
							</Typography>
						</TableCell>
						<TableCell align='left'>
							<Typography variant='body2'>
								{clubDetails[key]}
							</Typography>
						</TableCell>
					</TableRow>
				)
			}
		}

		return result;
	}
	return (
		<Paper elevation={1}  sx={{paddingBottom: 1, marginBottom: 1}} >
			<Title variant='h6' content='Club Info' />
			<Box sx={{ display: 'flex', justifyContent: 'center', padding: '.5rem' }}>
				<Typography variant='caption' className='table-key'>
					{clubDetails['Stadium']}
				</Typography>
			</Box>
			<img alt='' src={clubDetails['Image']} style={{width: '90%', height: '90%', objectFit: 'cover', margin: 'auto', display: 'flex'}} />
			<TableContainer >
				<Table size='small' aria-label='a dense table'>
					<TableHead>
						<TableRow>
							<TableCell align='left' colSpan={2}>{clubDetails['name']}</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{displayTable(clubDetails)}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default ClubHomeInfo;