import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNews } from '../../actions/news_actions';
import { Typography, Box, List, Grid, Button, Paper } from '@mui/material';
import ScrollToTopOnLoad from '../util/scroll-to-top-on-load';
import CircularProgress from '@mui/material/CircularProgress';
import NewsIndex from '../news/news-index';
import { useState } from 'react';
import HomeFixturesColumn from './home-fixtures-column';
import Article from '../news/article';
import Title from '../util/title-util';

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