import React, { useState } from 'react';
import { List, Pagination, Paper, Stack, Typography } from '@mui/material';
import { splitArticleIntoPages } from '../../news/sub-articles-timeline';
import Article from '../../news/article';
import Title from '../../util/title-util';
import NoDataMessage from '../../util/no-data/no-data-message';

const LeagueHomeNews = ({ name, logo, news }) => {
	const [page, setPage] = useState(1)

	const handleChange = (event, newValue) => {
		setPage(newValue);
	}

	const displayNews = (news) => {
		let result = [];
		if (!news) return <NoDataMessage/>
		news.forEach((article, idx) => {
			result.push(
				<Article article={article} idx={idx} />
			)
		})

		return result;
	}

	const articlesByPage = splitArticleIntoPages(news, 12);

	return (
		<Paper
			className='home-paper'
			id='league-home-news'
			elevation={1}
		>
			<Title variant='h6' content={`${name} News`} img={logo} />
			<List>
				{displayNews(articlesByPage[page])}
			</List>
			<Stack spacing={2} className='news-pagination'>
				<Typography>Page</Typography>
				<Pagination count={articlesByPage.length - 1} page={page} onChange={handleChange} variant="outlined" shape="rounded" />
			</Stack>
		</Paper>
	)
}

export default LeagueHomeNews