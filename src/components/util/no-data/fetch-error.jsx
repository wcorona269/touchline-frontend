import { Box, Button, Paper, Typography } from '@mui/material';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import React from 'react'

const FetchError = ({ onRetry }) => (
	<Paper sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, py: 6, px: 3, textAlign: 'center' }}>
		<CloudOffIcon sx={{ fontSize: 40, opacity: 0.5 }} />
		<Typography sx={{ fontWeight: 600 }}>Couldn't load this right now</Typography>
		<Typography variant='body2' sx={{ color: 'text.secondary', maxWidth: 360 }}>
			The football data provider is busy. This usually clears up within a minute.
		</Typography>
		{onRetry && (
			<Box sx={{ mt: 1 }}>
				<Button variant='outlined' onClick={onRetry}>Try again</Button>
			</Box>
		)}
	</Paper>
)

export default FetchError;
