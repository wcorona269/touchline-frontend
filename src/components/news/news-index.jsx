 import { Box, Button, CircularProgress, List, Paper, Typography } from '@mui/material'
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
			 result.push(<Article article={articles[i]} idx={i} />);
		 }
		 return (
			 <List sx={{ width: '100%' }}>
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
		 <Paper elevation={1} sx={{ display: 'flex', flexDirection: 'column', minHeight: '40rem' }}>
			 <Title variant={variant ? variant : 'h5'} content={title} img={logo} />
			 <Box sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'column', width: '100%', minHeight: '40rem' }}>
				 {isLoading ?
					 <CircularProgress color='primary' sx={{ marginTop: '3rem', margin: 'auto' }} /> :
					 displayNews(news)
				 }
				 {isLoading || !showButton ? <></> :
					 !isLoadingMore ?
						 <Button onClick={handleClick} variant="outlined" sx={{ height: '3rem', width: '100%' }}>
							 <Typography variant='subtitle1'>
								 See More
							 </Typography>
						 </Button> :
						 <Button variant="outlined" sx={{ height: '3rem', width: '100%' }} >
							 <CircularProgress size='2rem' />
						 </Button>
				 }
			 </Box>
			 <ScrollToTopOnLoad />
		 </Paper>
	 )
 }
 
 export default NewsIndex
 