import { Typography, useTheme, IconButton, Box, Card } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './favorite-btn';
import ReadAllButton from './read-all-btn';

const Title = ({ variant, content, img, back, button=false, notifs=false }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	let size = variant === 'h5' ? '2rem' : '1.5rem';
	let mr = variant === 'h5' ? '1rem' : '.5rem'

	return (
		<Typography
			variant={variant}
			sx={{
				p: '1rem',
				marginBottom: '0px !important',
				borderBottom: `1px solid ${theme.palette.divider}`,
				fontFamily: theme.typography.bold,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Box display='flex' alignItems='center'>
				{back &&
					<IconButton sx={{ p: 0, m: 0, marginRight: 2 }} onClick={() => navigate(-1)}>
						<ArrowBackIcon />
					</IconButton>
				}
				{img && 
					<Card sx={{height: size, width: size, m: 0, marginRight: mr, backgroundColor: theme.palette.grey['100'] }}>
						<img alt='' src={img} style={{ height: size, width: size }} />
					</Card>
				}
				{content}
			</Box>
			<Box display='flex' alignItems='center'>
				{button && <FavoriteButton name={content}/> }
				{notifs && <ReadAllButton/>}
			</Box>
		</Typography>
	)
}

export default Title;