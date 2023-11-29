import { Typography, useTheme } from '@mui/material';
import React from 'react'

const NoDataMessage = () => {
	const theme = useTheme();

	return (
		<Typography sx={{ textAlign: 'center', fontFamily: theme.typography.bold, color: theme.palette.text.disabled, my: 5 }}>
			Not Found
			<br/>
			<br/>
			We apologize, this data is currently unavailable from the API.
		</Typography>
	)
}

export default NoDataMessage;