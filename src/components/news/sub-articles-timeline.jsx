import React, { useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const splitArticleIntoPages = (subArticles, articlesPerPage = 4) => {
	const result = [];
	for (let i = 0; i < subArticles.length; i+= articlesPerPage) {
		result.push(subArticles.slice(i, i + articlesPerPage))
	}
	return result;
}

const SubArticlesTimeline = ({subArticles, printArticles}) => {
	const [page, setPage] = useState(1);
	
	const handleChange = (event, newValue) => {
		setPage(newValue);
	}
	
	const articlesByPage = splitArticleIntoPages(subArticles);
	return (
		<>
			<div className='sub-articles'>
				<h1>More News</h1>
				{printArticles(articlesByPage[page])}
			</div>
			<p id='page-selector'>
				Page
			</p>
			<Stack spacing={2} className='news-pagination'>
				<Pagination count={articlesByPage.length - 1} page={page} onChange={handleChange} variant="outlined" shape="rounded"/>
			</Stack>
		</>
	)
} 

export default SubArticlesTimeline;