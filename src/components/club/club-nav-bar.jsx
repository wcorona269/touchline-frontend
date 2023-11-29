import React from 'react'
import { Box, Tab, Tabs, Divider, Typography, useTheme } from '@mui/material';
import Flag from 'react-world-flags';

const ClubNavBar = ({club, selectedTab, setSelectedTab}) => {
	const clubInfo = club[0];
	const theme = useTheme();
	let name = clubInfo.team.name || 'N/A';
	let logo = clubInfo.team.logo || 'N/A';
	let country = clubInfo.team.country || 'N/A';
	
	const tabs = ['Home', 'Fixtures', 'Stats', 'Squad'];

	return (
		<>
			<Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between !important', width: '100%'}}>
				<Tabs value={selectedTab }>
					{tabs.map((tab, idx) => (
						<Tab label={tab} onClick={() => setSelectedTab(idx)} />
					))}
				</Tabs>
				<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginRight: '1rem' }} >
					<img style={{ height: '2rem', width: '2rem', marginRight: '.5rem' }} src={logo} alt='' />
					<Typography variant='subtitle1'>{name}</Typography>
					<Divider orientation="vertical" sx={{ mx: 2 }} />
					<Typography sx={{ color: theme.palette.text.secondary }} variant='body2'>{country}</Typography>
					<Flag code={country} height='20' />
				</Box>
			</Box>
			<Divider/>
		</>
	)
}

export default ClubNavBar;