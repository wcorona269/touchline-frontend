import React from 'react';
import NoDataMessage from '../../util/no-data/no-data-message';
import { alpha, Box, Paper, Typography, useTheme } from '@mui/material';
import Title from '../../util/title-util';

// The API's stat names are inconsistent ("Shots insidebox", "expected_goals"); show the important ones first, readably.
const STAT_ORDER = [
	['Ball Possession', 'Possession'],
	['expected_goals', 'Expected goals (xG)'],
	['Total Shots', 'Total shots'],
	['Shots on Goal', 'Shots on target'],
	['Shots off Goal', 'Shots off target'],
	['Blocked Shots', 'Blocked shots'],
	['Shots insidebox', 'Shots inside box'],
	['Shots outsidebox', 'Shots outside box'],
	['Corner Kicks', 'Corners'],
	['Offsides', 'Offsides'],
	['Total passes', 'Passes'],
	['Passes accurate', 'Accurate passes'],
	['Passes %', 'Pass accuracy'],
	['Fouls', 'Fouls'],
	['Free Kicks', 'Free kicks'],
	['Yellow Cards', 'Yellow cards'],
	['Red Cards', 'Red cards'],
	['Goalkeeper Saves', 'Saves'],
	['goals_prevented', 'Goals prevented'],
];

const toNumber = (value) => {
	if (typeof value === 'number') return value;
	const parsed = parseFloat(String(value ?? 0).replace('%', ''));
	return Number.isNaN(parsed) ? 0 : parsed;
};

const MatchStats = ({ match, header }) => {
	const theme = useTheme();
	const stats = match.statistics;

	if (!stats?.length || stats.length < 2) {
		return (
			<Paper>
				<Title variant='h6' content='Match Stats'/>
				<NoDataMessage/>
			</Paper>
		)
	}

	const byType = (team) => Object.fromEntries(team.statistics.map(s => [s.type, s.value]));
	const home = byType(stats[0]);
	const away = byType(stats[1]);
	const known = new Set(STAT_ORDER.map(([type]) => type));
	const rows = [
		...STAT_ORDER.filter(([type]) => type in home || type in away),
		...Object.keys(home).filter(type => !known.has(type)).map(type => [type, type.replace(/_/g, ' ')]),
	];

	const bar = (value, total, leading, side) => (
		<Box sx={{ flex: 1, height: 6, borderRadius: '3px', backgroundColor: alpha(theme.palette.text.primary, 0.06), display: 'flex', justifyContent: side === 'home' ? 'flex-end' : 'flex-start', overflow: 'hidden' }}>
			<Box sx={{
				width: total ? `${(value / total) * 100}%` : 0,
				height: '100%',
				borderRadius: '3px',
				backgroundColor: leading ? theme.palette.primary.main : alpha(theme.palette.text.primary, 0.28),
				transition: 'width .4s ease',
			}} />
		</Box>
	);

	return (
		<Paper>
			<Title variant='h6' content='Match Stats'/>
			{header}
			<Box sx={{ px: 2, pb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
				{rows.map(([type, label]) => {
					const homeValue = toNumber(home[type]);
					const awayValue = toNumber(away[type]);
					const total = homeValue + awayValue;
					return (
						<Box key={type}>
							<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.75 }}>
								<Typography sx={{ fontWeight: homeValue > awayValue ? 800 : 500, fontVariantNumeric: 'tabular-nums', minWidth: 48 }}>{home[type] ?? 0}</Typography>
								<Typography variant='body2' sx={{ color: theme.palette.text.secondary, fontWeight: 500, textAlign: 'center' }}>{label}</Typography>
								<Typography sx={{ fontWeight: awayValue > homeValue ? 800 : 500, fontVariantNumeric: 'tabular-nums', minWidth: 48, textAlign: 'right' }}>{away[type] ?? 0}</Typography>
							</Box>
							<Box sx={{ display: 'flex', gap: 0.75 }}>
								{bar(homeValue, total, homeValue > awayValue, 'home')}
								{bar(awayValue, total, awayValue > homeValue, 'away')}
							</Box>
						</Box>
					);
				})}
			</Box>
		</Paper>
	)
}

export default MatchStats;
