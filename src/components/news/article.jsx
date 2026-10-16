import React, { useState } from 'react';
import { Box, ListItem, ListItemButton, Typography, useTheme } from '@mui/material';
import moment from 'moment';

// Older scraped articles stored links without a scheme; RSS articles have full URLs.
export const articleUrl = (link = '') => (/^https?:\/\//.test(link) ? link : `https://${link}`);

const Article = ({ article }) => {
	const theme = useTheme();
	const [showImage, setShowImage] = useState(!!article.img);

	const displayTitle = (title) => {
		let error_words = title.split('More')?.[1]
		return !!error_words ? error_words : title
	}

	return (
		<ListItem divider disablePadding>
			<ListItemButton
				component='a'
				href={articleUrl(article.link)}
				target='_blank'
				rel='noopener noreferrer'
				sx={{ borderRadius: 0, px: 2, py: 1.75, gap: 2, alignItems: 'flex-start' }}
			>
				<Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, minWidth: 0, flex: 1 }}>
					<Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: theme.palette.text.secondary }}>
						<Typography variant='caption' sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
							{article.media}
						</Typography>
						{(article.published || article.date) && (
							<Typography variant='caption'>· {article.published ? moment(article.published).fromNow() : article.date}</Typography>
						)}
					</Box>
					<Typography
						sx={{
							fontWeight: 600,
							fontSize: '1rem',
							lineHeight: 1.35,
							display: '-webkit-box',
							WebkitLineClamp: 2,
							WebkitBoxOrient: 'vertical',
							overflow: 'hidden',
						}}
					>
						{displayTitle(article.title)}
					</Typography>
				</Box>
				{showImage && (
					<Box
						component='img'
						src={article.img}
						alt=''
						loading='lazy'
						onError={() => setShowImage(false)}
						sx={{ width: 96, height: 72, objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }}
					/>
				)}
			</ListItemButton>
		</ListItem>
	)
}

export default Article;
