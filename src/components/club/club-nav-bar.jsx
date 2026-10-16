import React from 'react'
import { Box, Tab, Tabs, Typography, useTheme } from '@mui/material';
import SeasonSelect from '../util/season-select/season-select';

const ClubNavBar = ({ club, selectedTab, setSelectedTab, season, setSeason }) => {
	const theme = useTheme();
	const country = club[0].team.country;
	const tabs = ['Overview', 'Fixtures', 'Stats', 'Squad'];

	return (
		<Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 1, pr: 2 }}>
			<Tabs value={selectedTab} variant='scrollable' scrollButtons={false} sx={{ minWidth: 0 }}>
				{tabs.map((tab, idx) => (
					<Tab key={tab} label={tab} onClick={() => setSelectedTab(idx)} />
				))}
			</Tabs>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, pl: { xs: 2, sm: 0 }, pb: { xs: 1.5, sm: 0 } }}>
				{country && (
					<Typography variant='body2' sx={{ color: theme.palette.text.secondary, fontWeight: 500 }}>{country}</Typography>
				)}
				<SeasonSelect season={season} onChange={setSeason} />
			</Box>
		</Box>
	)
}

export default ClubNavBar;
