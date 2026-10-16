 import { Box, Button, CircularProgress, List, Paper, Typography } from '@mui/material'
import NewspaperIcon from '@mui/icons-material/Newspaper'
import React, { useEffect, useState } from 'react'
import Title from '../util/title-util'
import Article from './article'
import ScrollToTopOnLoad from '../util/scroll-to-top-on-load'
import { useSelector } from 'react-redux'
 
 const NewsIndex = ({ news, title, logo, variant }) => {
	 const [articleCount, setArticleCount] = useState(25);
	 const isLoading = useSelector(state => state.news?.isLoading);
	 const [showButton, setShowButton] = useState(true);
	 const [isLoadingMore, setIsLoadingMore] = useState(false)

	 useEffect(() => {
		 if (!!news.length && articleCount > news.length) {
			 setShowButton(false)
		 }
	 }, [articleCount, news]);

	 const displayNews = (articles) => {
		 let result = [];
		 let max = Math.min(articles.length, articleCount)

		 for (let i = 0; i < max; i++) {
			 result.push(<Article key={articles[i].link || i} article={articles[i]} />);
		 }
		 return (
			 <List disablePadding sx={{ width: '100%' }}>
				 {result}
			 </List>
		 )
	 }

	 const handleClick = () => {
		 setIsLoadingMore(true)
		 setTimeout(() => {
			 setIsLoadingMore(false)
			 setArticleCount(articleCount + 25)
		 }, 2000);
	 }

	 return (
		 <Paper sx={{ display: 'flex', flexDirection: 'column' }}>
			 <Title variant={variant ? variant : 'h5'} content={title} img={logo} />
			 {isLoading ?
				 <CircularProgress color='primary' sx={{ my: 6, mx: 'auto' }} /> :
				 !news?.length ?
					 <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, py: 6, px: 3, textAlign: 'center', color: 'text.secondary' }}>
						 <NewspaperIcon sx={{ fontSize: 40, opacity: 0.5 }} />
						 <Typography sx={{ fontWeight: 600, color: 'text.primary' }}>No stories right now</Typography>
						 <Typography variant='body2'>Check back soon for the latest headlines.</Typography>
					 </Box> :
					 <>
						 {displayNews(news)}
						 {showButton && (
							 <Button onClick={handleClick} disabled={isLoadingMore} sx={{ borderRadius: 0, py: 1.5 }}>
								 {isLoadingMore ? <CircularProgress size='1.25rem' /> : 'Load more stories'}
							 </Button>
						 )}
					 </>
			 }
			 <ScrollToTopOnLoad />
		 </Paper>
	 )
 }
 
 export default NewsIndex
 