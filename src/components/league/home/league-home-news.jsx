import React, { useEffect, useState } from 'react';
import { List, Pagination, Paper, Stack, Typography } from '@mui/material';
import { splitArticleIntoPages } from '../../news/sub-articles-timeline';
import Article from '../../news/article';
import Title from '../../util/title-util';
import NoDataMessage from '../../util/no-data/no-data-message';

const LeagueHomeNews = ({ name, logo, news }) => {
	const [page, setPage] = useState(1)

	useEffect(() => {}, [news])

	const handleChange = (event, newValue) => {
		setPage(newValue);
	}

	const displayNews = (news) => {
		let result = [];
	
		if (!news || !news.length) return <NoDataMessage/>
		console.log(news)
		for (let i = 0; i < news.length; i++) {
			const article = news[i];
			result.push(
				<Article article={article} idx={i} />
			)
		}
		return result;
	}

	const articlesByPage = splitArticleIntoPages(news, 10);

	return (
		<Paper
			className='home-paper'
			id='league-home-news'
			elevation={1}
		>
			<Title variant='h6' content={`${name} News`} img={logo} />
			<List>
				{displayNews(news)}
			</List>
			{/* <Stack spacing={2} className='news-pagination'>
				<Typography>Page</Typography>
				<Pagination count={articlesByPage.length - 1} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
			</Stack> */}
		</Paper>
	)
}

export default LeagueHomeNews;