import React from 'react';
import { useNavigate } from 'react-router-dom';
import { alpha, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';

// The API describes qualification/relegation spots in free text, e.g. "Promotion - Champions League (League phase)".
const ZONES = [
	{ match: /champions league/i, color: '#3B82F6' },
	{ match: /europa league/i, color: '#F59E0B' },
	{ match: /conference/i, color: '#14B8A6' },
	{ match: /relegation/i, color: '#EF4444' },
	{ match: /promotion/i, color: '#22C55E' },
	{ match: /.+/, color: '#A78BFA' },
];

const zoneColor = (description) => description ? ZONES.find(z => z.match.test(description))?.color : null;

const zoneLabel = (description) => description.replace(/^Promotion\s*-\s*/i, '').replace(/\s*\(.*?\)\s*$/, '');

const FORM_COLORS = { W: '#22C55E', D: '#94A3B8', L: '#EF4444' };

const FormPills = ({ form }) => (
	<Box sx={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
		{(form || '').split('').slice(-5).map((result, idx) => (
			<Box
				key={idx}
				sx={{
					width: 20,
					height: 20,
					borderRadius: '6px',
					display: 'grid',
					placeItems: 'center',
					fontSize: 10,
					fontWeight: 800,
					color: '#fff',
					backgroundColor: FORM_COLORS[result] || 'transparent',
				}}
			>
				{result}
			</Box>
		))}
	</Box>
);

// `compact` shows just club / played / goal difference / points, for sidebars and dashboards.
const StandingsTable = ({ rows, compact = false, limit, highlight }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	const visibleRows = limit ? rows.slice(0, limit) : rows;

	const hideOnMobile = { display: { xs: 'none', sm: 'table-cell' } };
	const columns = [
		{ key: 'played', label: 'P', get: r => r.all.played },
		{ key: 'win', label: 'W', get: r => r.all.win, full: true, mobile: hideOnMobile },
		{ key: 'draw', label: 'D', get: r => r.all.draw, full: true, mobile: hideOnMobile },
		{ key: 'lose', label: 'L', get: r => r.all.lose, full: true, mobile: hideOnMobile },
		{ key: 'for', label: 'GF', get: r => r.all.goals.for, full: true, mobile: hideOnMobile },
		{ key: 'against', label: 'GA', get: r => r.all.goals.against, full: true, mobile: hideOnMobile },
		{ key: 'gd', label: 'GD', get: r => r.goalsDiff, gd: true },
	].filter(c => !compact || !c.full);

	const headCell = {
		fontSize: 11,
		fontWeight: 700,
		letterSpacing: '0.06em',
		textTransform: 'uppercase',
		color: theme.palette.text.disabled,
		borderBottom: `1px solid ${theme.palette.divider}`,
		py: 1.25,
	};
	const numCell = {
		textAlign: 'center',
		fontVariantNumeric: 'tabular-nums',
		color: theme.palette.text.secondary,
		px: { xs: 0.5, sm: 1 },
	};

	const zones = new Map();
	visibleRows.filter(r => r.description).forEach(r => {
		if (!zones.has(zoneLabel(r.description))) zones.set(zoneLabel(r.description), zoneColor(r.description));
	});

	return (
		<>
			<TableContainer sx={{ overflowX: 'auto' }}>
				<Table size='small' sx={{ '& td, & th': { borderBottom: 'none' } }}>
					<TableHead>
						<TableRow>
							<TableCell sx={{ ...headCell, width: 44, pl: 2 }}>#</TableCell>
							<TableCell sx={{ ...headCell, width: '100%' }}>Club</TableCell>
							{columns.map(c => (
								<TableCell key={c.key} sx={{ ...headCell, ...numCell, ...c.mobile }}>{c.label}</TableCell>
							))}
							<TableCell sx={{ ...headCell, ...numCell, pr: 2 }}>Pts</TableCell>
							{!compact && <TableCell sx={{ ...headCell, ...hideOnMobile, textAlign: 'right', pr: 2 }}>Form</TableCell>}
						</TableRow>
					</TableHead>
					<TableBody>
						{visibleRows.map((row) => {
							const color = zoneColor(row.description);
							const highlighted = highlight?.(row);
							return (
								<TableRow
									key={row.team.id}
									hover
									onClick={() => navigate(`/club/${row.team.id}`)}
									sx={{
										cursor: 'pointer',
										...(highlighted && { backgroundColor: alpha(theme.palette.primary.main, 0.1) }),
										'&:not(:last-of-type) td': { borderBottom: `1px solid ${theme.palette.divider}` },
									}}
								>
									<TableCell sx={{ pl: 2, py: 1.25 }}>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
											<Box sx={{ width: 3, height: 18, borderRadius: '2px', backgroundColor: color || 'transparent' }} />
											<Typography variant='body2' sx={{ fontWeight: 600, color: theme.palette.text.secondary, fontVariantNumeric: 'tabular-nums' }}>
												{row.rank}
											</Typography>
										</Box>
									</TableCell>
									<TableCell>
										<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, minWidth: 0 }}>
											<img src={row.team.logo} loading='lazy' alt='' style={{ width: 22, height: 22, objectFit: 'contain', flexShrink: 0 }} />
											<Typography variant='body2' noWrap sx={{ fontWeight: 600, color: theme.palette.text.primary }}>
												{row.team.name}
											</Typography>
										</Box>
									</TableCell>
									{columns.map(c => {
										const value = c.get(row);
										const gdColor = value > 0 ? '#22C55E' : value < 0 ? '#EF4444' : theme.palette.text.secondary;
										return (
											<TableCell key={c.key} sx={{ ...numCell, ...c.mobile, ...(c.gd && { color: gdColor, fontWeight: 600 }) }}>
												{c.gd && value > 0 ? `+${value}` : value}
											</TableCell>
										);
									})}
									<TableCell sx={{ ...numCell, pr: 2, fontWeight: 800, color: theme.palette.text.primary }}>
										{row.points}
									</TableCell>
									{!compact && (
										<TableCell sx={{ ...hideOnMobile, pr: 2 }}>
											<FormPills form={row.form} />
										</TableCell>
									)}
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</TableContainer>
			{!compact && zones.size > 0 && (
				<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, px: 2, py: 1.5, borderTop: `1px solid ${theme.palette.divider}` }}>
					{[...zones].map(([label, color]) => (
						<Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
							<Box sx={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: color }} />
							<Typography variant='caption' sx={{ color: theme.palette.text.secondary }}>{label}</Typography>
						</Box>
					))}
				</Box>
			)}
		</>
	);
};

export default StandingsTable;
