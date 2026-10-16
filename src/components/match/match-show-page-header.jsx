import React from 'react';
import DisplayTime from '../util/display-time';
import { alpha, Box, IconButton, Paper, Typography, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { match_not_played } from '../league/match-card';

const MatchShowPageHeader = ({ match }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { league, teams, goals } = match;
	const started = !match_not_played.has(match?.fixture?.status?.short);

	const team = (side) => (
		<Box
			onClick={() => navigate(`/club/${teams[side].id}`)}
			sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.25, flex: 1, minWidth: 0, cursor: 'pointer', '&:hover p': { color: theme.palette.primary.main } }}
		>
			<Box component='img' alt='' src={teams[side].logo} sx={{ width: { xs: 52, sm: 72 }, height: { xs: 52, sm: 72 }, objectFit: 'contain' }} />
			<Typography sx={{ fontWeight: 700, fontSize: { xs: '0.95rem', sm: '1.1rem' }, textAlign: 'center', transition: 'color .15s' }}>
				{teams[side].name}
			</Typography>
		</Box>
	);

	return (
		<Paper
			sx={{
				position: 'relative',
				px: { xs: 2, sm: 3 },
				pt: 2,
				pb: 3,
				background: `radial-gradient(80% 120% at 50% 0%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 60%), ${theme.palette.background.paper}`,
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
				<IconButton size='small' onClick={() => navigate(-1)} sx={{ ml: -0.5 }}>
					<ArrowBackIcon fontSize='small' />
				</IconButton>
				<Box
					onClick={() => navigate(`/league/${league.id}`)}
					sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer', minWidth: 0, color: theme.palette.text.secondary, '&:hover': { color: theme.palette.text.primary } }}
				>
					<Box sx={{ width: 22, height: 22, borderRadius: '6px', backgroundColor: '#fff', p: '2px', flexShrink: 0 }}>
						<img alt='' src={league.logo} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
					</Box>
					<Typography noWrap variant='body2' sx={{ fontWeight: 600 }}>
						{league.name}{league.round ? ` · ${league.round.replace('Regular Season - ', 'Matchweek ')}` : ''}
					</Typography>
				</Box>
				<Box sx={{ width: 30 }} />
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 3 } }}>
				{team('home')}
				<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, flexShrink: 0 }}>
					<Typography sx={{ fontWeight: 800, letterSpacing: '-0.04em', fontSize: { xs: '2.5rem', sm: '3.5rem' }, lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
						{started ? `${goals.home ?? 0} – ${goals.away ?? 0}` : 'vs'}
					</Typography>
					<Typography component='div' variant='caption' sx={{ fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: theme.palette.text.secondary }}>
						<DisplayTime match={match} />
					</Typography>
				</Box>
				{team('away')}
			</Box>
		</Paper>
	)
}

export default MatchShowPageHeader;
