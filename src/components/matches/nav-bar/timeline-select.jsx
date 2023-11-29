import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import React, { useEffect } from 'react';

const TimelineSelect = ({onTabSelect, nations, selectedNation}) => {
	useEffect(() => {
	}, [selectedNation]);

	return (
		<Box sx={{ minWidth: 200 }}>
			<FormControl fullWidth>
				<InputLabel id="demo-simple-select-label">Country</InputLabel>
				<Select
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={selectedNation}
					label="Country"
					onChange={onTabSelect}
				>
					{nations.map(nation => (
						<MenuItem key={nation} value={nation}>{nation}</MenuItem>
					))}
				</Select>
			</FormControl>
		</Box>
	)
}

export default TimelineSelect;