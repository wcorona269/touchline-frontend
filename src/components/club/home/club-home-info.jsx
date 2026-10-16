import React, { useState } from 'react';
import { Typography, Paper, Box, Table, TableRow, TableCell, TableContainer, TableBody, useTheme } from '@mui/material';
import Title from '../../util/title-util';

// The API serves a small generic shield when it has no photo of a venue; real stadium photos are much larger.
const PLACEHOLDER_MAX_WIDTH = 200;

const ClubHomeInfo = ({ club }) => {
	const theme = useTheme();
	const clubInfo = club[0];
	const { team, venue } = clubInfo;
	const [showPhoto, setShowPhoto] = useState(false);

	const details = [
		['Founded', team.founded],
		['Location', [venue.city, team.country].filter(Boolean).join(', ')],
		['Stadium', venue.name],
		['Capacity', venue.capacity?.toLocaleString()],
		['Surface', venue.surface && venue.surface[0].toUpperCase() + venue.surface.slice(1)],
		['Address', venue.address],
	].filter(([, value]) => value);

	return (
		<Paper sx={{ marginBottom: 2 }}>
			<Title variant='h6' content='Club Info' />
			{venue.image && (
				<Box sx={{ position: 'relative', display: showPhoto ? 'block' : 'none' }}>
					<Box
						component='img'
						alt=''
						src={venue.image}
						loading='lazy'
						onLoad={(e) => setShowPhoto(e.currentTarget.naturalWidth > PLACEHOLDER_MAX_WIDTH)}
						sx={{ width: '100%', height: 150, objectFit: 'cover', display: 'block' }}
					/>
					<Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,.75), transparent 60%)', display: 'flex', alignItems: 'flex-end', p: 1.5 }}>
						<Typography sx={{ color: '#fff', fontWeight: 700 }}>{venue.name}</Typography>
					</Box>
				</Box>
			)}
			<TableContainer>
				<Table size='small'>
					<TableBody>
						{details.map(([label, value]) => (
							<TableRow key={label} sx={{ '&:last-of-type td': { borderBottom: 'none' } }}>
								<TableCell sx={{ pl: 2, py: 1.25, width: 96, verticalAlign: 'top' }}>
									<Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>{label}</Typography>
								</TableCell>
								<TableCell sx={{ pr: 2, py: 1.25 }}>
									<Typography variant='body2' sx={{ fontWeight: 600 }}>{value}</Typography>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	)
}

export default ClubHomeInfo;
