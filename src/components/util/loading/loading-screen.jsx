import React from 'react'
import loadingGif from '../../../images/loading_gif.gif';
import { Box, Grid } from '@mui/material';
import Title from '../title-util';

const LoadingMessage = () => {
	return (
		<Grid item xs={9}>
			<Title variant='h5' content='Loading...' />
			<Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
				<img src={loadingGif} alt='' style={{display: 'flex', margin: 'auto', paddingTop: '3rem' }} />
			</Box>
		</Grid>
	)
}

export default LoadingMessage;