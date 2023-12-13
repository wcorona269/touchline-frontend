import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../../actions/news_actions';
import { Grid } from '@mui/material';
import NewsIndex from '../news/news-index';
import HomeFixturesColumn from './home-fixtures-column';

const NewsIndexContainer = () => {
	const dispatch = useDispatch();
	const news = useSelector(state => state.news?.news || []);
	const favorites = useSelector(state => state.favorites?.favorites) || [];

	useEffect(() => {
		let favNames = favorites.map(favorite => favorite.name)
		console.log({favNames})

		if (news.length === 0) {
			dispatch(fetchNews(favNames))
		}
	}, [])

	useEffect(() => {}, [news])

	return (
		<>
			<Grid item xs={6}>
				<NewsIndex news={news} title='News' /> 
			</Grid>
			<Grid item xs={3} sx={{ position: 'sticky', top: '3rem' }}>
				<HomeFixturesColumn/>
			</Grid>
		</>
	)
}

export default NewsIndexContainer;