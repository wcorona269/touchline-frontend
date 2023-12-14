import { Box, Container, Typography, useTheme } from '@mui/material'
import React from 'react'
import Title from '../util/title-util'

const PostShowPageError = () => {
	const theme = useTheme();
	return (
		<Container>
			<Box display='flex' alignItems='center'>
				<Typography variant='subtitle1' sx={{p: 5, margin: 'auto', color: theme.palette.text.secondary}}>
					We're sorry, this post could not be found.
				</Typography>
			</Box>
		</Container>
	)
}

export default PostShowPageError;