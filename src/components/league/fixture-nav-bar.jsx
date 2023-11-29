import React, { useEffect } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import shorthandMonthsOfYear from './shorthandMonths';
import { Divider } from '@mui/material';

const FixtureNavBar = ({selectedDate, dates, handleChange, setSelectedDate}) => {
	useEffect(() => {
		if (!dates?.length) return;
		for (let idx = 0; idx < dates.length; idx++ ) {
			let date = dates[idx];
			let fullDate = new Date(date);
			let today = new Date();
	
			if (
				fullDate <= today &&
				(selectedDate === 0 || fullDate > new Date(dates[selectedDate]))
			) {
				setSelectedDate(idx);
			}
		}
	}, [dates])

	return (
		<Box >
			<Tabs
				value={selectedDate}
				onChange={handleChange}
				variant="scrollable"
				scrollButtons="auto"
				aria-label="scrollable auto tabs example"
			>
			{dates.map((date, idx) => {
				const dateInfo = date.split('-');
				const formattedDate = `${shorthandMonthsOfYear[Number(dateInfo[1]) - 1]} ${dateInfo[2]}`
				return (
					<Tab key={idx} label={formattedDate}/>
				)
			})}
			</Tabs>
			<Divider/>
		</Box>
	);
}

export default FixtureNavBar;