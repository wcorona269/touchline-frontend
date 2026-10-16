import { Box, Divider, Link, List, ListItem, ListItemButton, Paper, Skeleton, Typography, useTheme } from '@mui/material';
import React, { useEffect } from 'react'
import Title from '../util/title-util';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTopStories } from '../../actions/news_actions';
import { articleUrl } from '../news/article';

const TopStories = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const top_stories = useSelector(state => state.news?.top_stories) || [];
	const isLoading = useSelector(state => state.news?.isLoading);

	useEffect(() => {
		if (!isLoading && !top_stories.length) {
			dispatch(fetchTopStories())
		}
	}, [])

	useEffect(() => {}, [top_stories])

	const displayTopStories = () => {
		let result = [];
		
		for (let i = 0; i < 5; i++) {
			const story = top_stories?.[i] ?? undefined
			const story_list_item = [];
			if (story === undefined) {
				if (!isLoading) break;
				story_list_item.push(
					<Skeleton key='skeleton' height={75} width={"100%"}/>
				)
			} else {
				let title = story?.title;
				let error_words = title.split('More')?.[1]
				let title_words = !!error_words ? error_words.split(' ') : title.split(' ')

				if (title_words?.length && title_words?.length > 10) {
					title = title_words.slice(0, 9).join(' ') + ' ...'
				} else {
					title = title_words.join(' ')
				}
				story_list_item.push(
					<Box sx={{display: 'flex', flexDirection: 'column', gap: 1, justifyContent: 'center'}}>
						<Typography sx={{ fontWeight: 600, fontSize: 13.5, lineHeight: 1.35, color: theme.palette.text.primary }}>
							{title}
						</Typography>
						<Typography sx={{ color: theme.palette.primary.main, fontSize: 11, fontWeight: 700 }} variant='caption'>
							{story.media}
						</Typography>
					</Box>
				)
			}
			result.push(
				<>
					<ListItem disablePadding key={i}>
						<ListItemButton
							sx={{ m: 0, maxHeight: 75 }}
							component='a'
							href={articleUrl(story?.link)}
							target="_blank"
							rel="noopener noreferrer"
						>
							{story_list_item}
						</ListItemButton>
					</ListItem>
					<Divider />
				</>
			)
		}
		return result;
	}

	if (!isLoading && !top_stories.length) return null;

	return (
		<Paper>
			<Title variant='h5' content='Top Stories'/>
			<List sx={{p: 0}}>
				{displayTopStories()}
			</List>
		</Paper>
	)
}

export default TopStories;