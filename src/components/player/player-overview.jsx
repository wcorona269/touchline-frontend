import React from 'react'
import shorthandMonthsOfYear from '../league/shorthandMonths';
import { alpha, Box, IconButton, Paper, Typography, useTheme } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import FavoriteButton from '../util/favorite-btn';
import { formatSeason } from '../util/season-select/seasons';

const PlayerOverview = ({ player }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const info = player.player;
	const statistics = player.statistics || [];
	// Show the player's club rather than their national team: the domestic entry with the most appearances.
	const clubEntries = statistics.filter(s => s.league.country !== 'World');
	const main = [...(clubEntries.length ? clubEntries : statistics)]
		.sort((a, b) => (b.games.appearences || 0) - (a.games.appearences || 0))[0];

	const name = info.name || 'Name Unavailable';
	const fullName = [info.firstname, info.lastname].filter(Boolean).join(' ');

	const birthDate = (() => {
		if (!info.birth?.date) return null;
		const [year, month, day] = info.birth.date.split('-');
		return `${Number(day)} ${shorthandMonthsOfYear[Number(month) - 1]} ${year}`;
	})();

	const facts = [
		['Age', info.age],
		['Nationality', info.nationality],
		['Born', [birthDate, info.birth?.place].filter(Boolean).join(' · ')],
		['Height', info.height],
		['Weight', info.weight],
	].filter(([, value]) => value);

	const sum = (pick) => statistics.reduce((total, s) => total + (pick(s) || 0), 0);
	const apps = sum(s => s.games.appearences);
	// Average rating across competitions, weighted by appearances.
	const ratedApps = sum(s => (s.games.rating ? s.games.appearences : 0));
	const rating = ratedApps ? sum(s => (s.games.rating ? parseFloat(s.games.rating) * s.games.appearences : 0)) / ratedApps : null;
	const tiles = [
		['Apps', apps],
		['Goals', sum(s => s.goals.total)],
		['Assists', sum(s => s.goals.assists)],
		['Rating', rating ? rating.toFixed(2) : '—'],
	];

	return (
		<Paper
			sx={{
				px: { xs: 2, sm: 3 },
				pt: 2,
				pb: 3,
				background: `radial-gradient(90% 120% at 0% 0%, ${alpha(theme.palette.primary.main, 0.1)} 0%, transparent 60%), ${theme.palette.background.paper}`,
			}}
		>
			<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
				<IconButton size='small' onClick={() => navigate(-1)} sx={{ ml: -0.5 }}>
					<ArrowBackIcon fontSize='small' />
				</IconButton>
				<FavoriteButton name={name} />
			</Box>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, sm: 3 } }}>
				<Box component='img' src={info.photo} alt={name} sx={{ width: { xs: 88, sm: 112 }, height: { xs: 88, sm: 112 }, borderRadius: '24px', objectFit: 'cover', flexShrink: 0, border: `1px solid ${theme.palette.divider}` }} />
				<Box sx={{ minWidth: 0 }}>
					<Typography sx={{ fontWeight: 800, letterSpacing: '-0.03em', fontSize: { xs: '1.6rem', sm: '2.1rem' }, lineHeight: 1.1 }}>
						{name}
					</Typography>
					{fullName && fullName !== name && (
						<Typography variant='body2' sx={{ color: theme.palette.text.secondary, mt: 0.5 }}>{fullName}</Typography>
					)}
					{main && (
						<Box
							onClick={() => navigate(`/club/${main.team.id}`)}
							sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, mt: 1.25, cursor: 'pointer', '&:hover span': { color: theme.palette.primary.main } }}
						>
							<img alt='' src={main.team.logo} style={{ width: 22, height: 22, objectFit: 'contain' }} />
							<Typography component='span' sx={{ fontWeight: 600, transition: 'color .15s' }}>{main.team.name}</Typography>
							{main.games.position && (
								<Typography component='span' variant='body2' sx={{ color: theme.palette.text.secondary }}>· {main.games.position}</Typography>
							)}
						</Box>
					)}
				</Box>
			</Box>
			<Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, mt: 3 }}>
				{tiles.map(([label, value]) => (
					<Box key={label} sx={{ borderRadius: '14px', border: `1px solid ${theme.palette.divider}`, backgroundColor: theme.palette.action.hover, py: 1.5, textAlign: 'center' }}>
						<Typography sx={{ fontWeight: 800, fontSize: { xs: '1.3rem', sm: '1.6rem' }, fontVariantNumeric: 'tabular-nums', lineHeight: 1.1 }}>{value}</Typography>
						<Typography variant='caption' sx={{ color: theme.palette.text.secondary, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</Typography>
					</Box>
				))}
			</Box>
			{main?.league?.season && (
				<Typography variant='caption' sx={{ display: 'block', mt: 1, color: theme.palette.text.disabled }}>
					{formatSeason(main.league.season)} season, all competitions
				</Typography>
			)}
			<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2.5 }}>
				{facts.map(([label, value]) => (
					<Box key={label} sx={{ px: 1.5, py: 0.75, borderRadius: '10px', border: `1px solid ${theme.palette.divider}` }}>
						<Typography component='span' variant='body2' sx={{ color: theme.palette.text.secondary }}>{label} </Typography>
						<Typography component='span' variant='body2' sx={{ fontWeight: 600 }}>{value}</Typography>
					</Box>
				))}
			</Box>
		</Paper>
	)
}

export default PlayerOverview;
