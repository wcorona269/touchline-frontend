import React from 'react'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const SeasonSelect = ({season, showSeason, setShowSeason, handleSeasonChange, availableSeasons}) => {
	let seasons = availableSeasons;
	if (!seasons) {
		seasons = [
			2023,
			2022,
			2021,
			2020,
			2019,
			2018,
			2017,
			2016,
			2015
		]
	}

	const parseSeason = (season) => {
		let lastTwoDigits = season % 100;
		lastTwoDigits += 1;
		let seasonString = `${season}/${lastTwoDigits}`;
		return seasonString
	}
	
	const displayListOptions = (seasons) => {
		seasons.sort((a, b) => b - a)
		let result = [];

		for (let season of seasons) {
			let seasonString = parseSeason(season);

			result.push(
				<MenuItem
					key={seasonString}
					value={seasonString}
				>
					{seasonString}
				</MenuItem>
			)
		}

		return result;
	}

	return (
		<div>
			<FormControl sx={{ m: 1, width: 300 }}>
				<InputLabel id="demo-multiple-name-label">Season</InputLabel>
				<Select
					labelId="demo-multiple-name-label"
					id="demo-multiple-name"
					multiple
					value={[season]}
					onChange={handleSeasonChange}
					input={<OutlinedInput label="Name" />}
					MenuProps={MenuProps}
				>
					{displayListOptions(seasons)}
				</Select>
			</FormControl>
		</div>
	);
}

export default SeasonSelect