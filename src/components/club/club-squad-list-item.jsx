import * as React from 'react';
import { Box, ButtonBase, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClubSquadListItem = ({ player }) => {
	const navigate = useNavigate();
	const theme = useTheme();

	return (
		<ButtonBase
			onClick={() => navigate(`/player/${player.id}`)}
			sx={{
				flexDirection: 'column',
				alignItems: 'stretch',
				textAlign: 'left',
				borderRadius: '14px',
				overflow: 'hidden',
				border: `1px solid ${theme.palette.divider}`,
				transition: 'border-color .15s, transform .15s',
				'&:hover': { borderColor: theme.palette.primary.main, transform: 'translateY(-2px)' },
			}}
		>
			<Box sx={{ position: 'relative', aspectRatio: '1', backgroundColor: theme.palette.action.hover }}>
				<Box component='img' alt={player.name} src={player.photo} loading='lazy' sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
				{player.number != null && (
					<Box sx={{ position: 'absolute', top: 8, left: 8, minWidth: 26, height: 26, px: 0.75, borderRadius: '8px', display: 'grid', placeItems: 'center', fontSize: 12, fontWeight: 800, color: '#fff', backgroundColor: 'rgba(0,0,0,.6)', backdropFilter: 'blur(4px)' }}>
						{player.number}
					</Box>
				)}
			</Box>
			<Box sx={{ px: 1.25, py: 1 }}>
				<Typography noWrap sx={{ fontWeight: 700, fontSize: '0.9rem' }}>{player.name}</Typography>
				{player.age && <Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>Age {player.age}</Typography>}
			</Box>
		</ButtonBase>
	);
}

export default ClubSquadListItem;
