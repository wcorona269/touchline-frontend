import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TimelineMatchDisplay from './table/timeline-match-display';
import LoadingMessage from '../util/loading/loading-screen';
import { fetchMatches } from '../../actions/api_actions';
import NoDataMessage from '../util/no-data/no-data-message';
import { Grid } from '@mui/material';
import HomeFixturesColumn from '../home/home-fixtures-column';
import TopStories from '../home/top-stories';

const MatchFeedContainer = ({apiKey}) => {
	const dispatch = useDispatch();
	const matches = useSelector(state => state.matches.matches);
	const competitions = new Set();
	const isLoading = useSelector(state => state.matches.isLoading);
	const [date, setDate] = useState(new Date());
	
	useEffect(() => {
		const month = (date.getMonth() + 1).toString().padStart(2, '0');
		const year = (date.getFullYear()).toString()
		const day = (date.getDate()).toString().padStart(2, '0');
		const dateString = `${year}-${month}-${day}`

		dispatch(fetchMatches(dateString))
		window.scrollTo(0, 0);
	}, [date]);

	const sortMatches = () => {
		if (!matches) return {}
		let result = {};

		for (let match of matches) {
			let country = `${match.league.country}`
			if (country in result) {
				result[country].push(match)
			} else {
				result[country] = [];
				result[country].push(match);
			}
		}

		const keysArray = Object.keys(result);

		keysArray.sort();

		const sortedResult = {};
		for (const key of keysArray) {
			sortedResult[key] = result[key];
		}

		return sortedResult;
	}

	const sortedMatches = sortMatches();
	const listOfNations = ['All', ...Object.keys(sortedMatches)];
	const nationsSet = new Set(listOfNations);
	const [selectedNation, setSelectedNation] = useState(listOfNations[0]);

	const handleTabSelect = (e) => {
		const selectedValue = e.target.value
		setSelectedNation(selectedValue);	
	}
	
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [selectedNation])

	if (isLoading || !matches) {
		return (<LoadingMessage />)
	}

	if (matches.length === 0) {
		return <NoDataMessage/>
	}

	return (
		<>
			<Grid item xs={6}>
				<TimelineMatchDisplay 
					matches={sortedMatches} 
					competitions={competitions}
					selectedNation={selectedNation}
					setSelectedNation={setSelectedNation}
					nations={listOfNations}
					nationsSet={nationsSet}
					onTabSelect={handleTabSelect}
					setDate={setDate}
					date={date}
					/>
			</Grid>
			<Grid item xs={3} sx={{ position: 'sticky', top: '3rem' }}>
				<TopStories/>
			</Grid>
		</>
	)
}

export default MatchFeedContainer;