import React, { useEffect, useState } from 'react';
import MatchFeedItem from './match-timeline-table';
import TimelineSelect from '../nav-bar/timeline-select';
import { Box, Tabs,Tab, Paper, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import monthsOfYear from '../../club/monthsOfYear';
import Title from '../../util/title-util';

export const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const MatchFeed = ({matches, selectedNation, setSelectedNation, date, setDate, nations, nationsSet, onTabSelect }) => {
	const [showAll, setShowAll] = useState(true);
	let matchesList;

	const dayOfWeek = daysOfWeek[new Date(date).getDay()]
	const month = monthsOfYear[new Date(date).getMonth()]
	const dateNumber = new Date(date).getDate();
	const formatted_date_string = `${dayOfWeek}, ${month.slice(0, 3)} ${dateNumber}`

	useEffect(() => {
		if (selectedNation !== 'All') {
			setShowAll(false)
		} else {
			setShowAll(true)
		}
	}, [selectedNation])


	if (showAll === false) {
		matchesList = {};
		for (let key in matches) {
			if (key.includes(selectedNation)) {
				matchesList[key] = matches[key];
			}
		}
	} else {
		matchesList = matches;
	}

	const displayMatchesList = () => {
		let result = []
		for (let key in matchesList) {
			result.push(<MatchFeedItem nation={key} matches={matchesList[key]}/>)
		}

		return result;
	}

	const filter_options = ['All', 'World', 'China', 'England', 'France', 'Germany', 'Portugal', 'Spain', 'USA']

	return (
		<Box>
			<Paper elevation={1} 
				sx={{ position: 'sticky', top: '0', display: 'flex', flexDirection: 'column', zIndex: '100'}}
			>
				<Title variant='h5' content='Matches' />
				<Box sx={{display: 'flex', flexDirection: 'row', gap: '.5rem', justifyContent: 'left', margin: '1rem', marginBottom: '0px' }}>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DatePicker
							label={formatted_date_string}
							views={['day']}
							date={date}
							onChange={(newValue) => setDate(newValue['$d'])}
						/>
					</LocalizationProvider>
					<TimelineSelect nations={nations} onTabSelect={onTabSelect} selectedNation={selectedNation}/>
				</Box>
				<Box>
					<Tabs
						value={selectedNation}
						variant='fullWidth'
					>
					{filter_options.map(value => {
						let result = [];

						if (nationsSet.has(value)) {
							result.push(<Tab value={value} label={value} onClick={() => setSelectedNation(value)} />)
						}
						
						return result;
					})}
					</Tabs>
				</Box>
			</Paper>
			<Stack spacing={2} sx={{paddingTop: 2}}>
				{displayMatchesList()}
			</Stack>
		</Box>
	)
}

export default MatchFeed;