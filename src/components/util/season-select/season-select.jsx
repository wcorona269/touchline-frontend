import React from 'react'
import { MenuItem, Select } from '@mui/material';
import { formatSeason, recentSeasons } from './seasons';

const SeasonSelect = ({ season, onChange, seasons = recentSeasons() }) => (
	<Select
		size='small'
		value={season}
		onChange={(e) => onChange(Number(e.target.value))}
		inputProps={{ 'aria-label': 'Season' }}
		MenuProps={{ PaperProps: { sx: { maxHeight: 320 } } }}
		sx={{ minWidth: 112, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}
	>
		{seasons.map((s) => (
			<MenuItem key={s} value={s}>{formatSeason(s)}</MenuItem>
		))}
	</Select>
);

export default SeasonSelect;
