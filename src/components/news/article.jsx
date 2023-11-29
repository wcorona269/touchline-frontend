import { useTheme } from '@mui/material';
import React from 'react';
import { ListItem, ListItemButton, Grid, Box, Typography } from '@mui/material';

const Article = ({article, idx}) => {
	const theme = useTheme()
	
	return (
		<ListItem divider disablePadding key={idx}>
			<ListItemButton
				sx={{height: 125}}
				component="a"  // Set the component prop to 'a' to make it act like an anchor tag
				href={`https://${article.link}`} // Specify the URL of the article
				target="_blank" // Open the link in a new tab
				rel="noopener noreferrer" // Recommended for security to add rel attribute
			>
				<Grid container>
					<Grid item xs={9}>
						<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
							<Typography variant='caption' sx={{ color: theme.palette.text.disabled }}>
								{article.media}
							</Typography>
							<Typography variant='subtitle1' className='home-article-title'>
								{article.title}
							</Typography>
							<Typography variant='caption' sx={{ color: theme.palette.text.disabled }}>
								{article.date}
							</Typography>
						</Box>
					</Grid>
					<Grid item xs={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
						<img alt='' src={article.img} style={{ width: '60%', margin: 'auto' }} />
					</Grid>
				</Grid>
			</ListItemButton>
		</ListItem>
	)
}


export default Article;