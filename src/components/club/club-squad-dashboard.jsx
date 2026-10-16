import React from 'react';
import ClubSquadListItem from './club-squad-list-item';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import Title from '../util/title-util';

const POSITION_ORDER = ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker'];

const ClubSquadDashboard = ({ name, logo, squad }) => {
	const theme = useTheme();
	const positions = [...new Set(squad.map(player => player.position))]
		.sort((a, b) => POSITION_ORDER.indexOf(a) - POSITION_ORDER.indexOf(b));

	return (
		<Paper sx={{ marginTop: '1rem' }}>
			<Title variant='h6' content={`${name} Squad`} img={logo} />
			<Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
				{positions.map(position => (
					<Box key={position}>
						<Typography variant='overline' sx={{ fontWeight: 700, color: theme.palette.text.secondary, display: 'block', mb: 1 }}>
							{position}s
						</Typography>
						<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))', gap: 1.5 }}>
							{squad.filter(player => player.position === position).map(player => (
								<ClubSquadListItem key={player.id} player={player} />
							))}
						</Box>
					</Box>
				))}
			</Box>
		</Paper>
	)
}

export default ClubSquadDashboard;
