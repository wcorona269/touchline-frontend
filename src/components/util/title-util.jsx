import { Typography, useTheme, IconButton, Box, Card } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import FavoriteButton from './favorite-btn';
import ReadAllButton from './read-all-btn';

const Title = ({ variant, content, img, back, button=false, notifs=false }) => {
	const theme = useTheme();
	const navigate = useNavigate();
	let size = variant === 'h5' ? '1.75rem' : '1.375rem';
	let mr = variant === 'h5' ? '.75rem' : '.625rem'

	return (
		<Typography
			variant={variant}
			sx={{
				px: 2,
				py: variant === 'h5' ? 1.75 : 1.5,
				marginBottom: '0px !important',
				borderBottom: `1px solid ${theme.palette.divider}`,
				fontWeight: 700,
				fontSize: variant === 'h5' ? '1.25rem' : '1rem',
				minHeight: variant === 'h5' ? 60 : 52,
				display: 'flex',
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
		>
			<Box display='flex' alignItems='center'>
				{back &&
					<IconButton size='small' sx={{ ml: -0.5, marginRight: 1.25 }} onClick={() => navigate(-1)}>
						<ArrowBackIcon fontSize='small' />
					</IconButton>
				}
				{img && 
					<Card sx={{ height: size, width: size, m: 0, marginRight: mr, p: '3px', borderRadius: '8px', flexShrink: 0, backgroundColor: theme.palette.grey['100'] }}>
						<img alt='' src={img} style={{ height: '100%', width: '100%', objectFit: 'contain', display: 'block' }} />
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