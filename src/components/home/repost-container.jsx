import React from 'react'
import PostContainer from './post-container';
import { Paper, Typography, useTheme } from '@mui/material';
import RepeatIcon from '@mui/icons-material/Repeat';

const RepostContainer = ({post, idx}) => {
	const theme = useTheme()

	return (
		<Paper elevation={1} key={idx} style={{paddingTop: '1rem'}}>
			<Typography sx={{marginLeft: '1rem', color: theme.palette.grey['500'], display: 'flex', alignItems: 'center' }} variant='caption'>
				<RepeatIcon sx={{ marginRight: '.25rem' }} fontSize='small' />
				Reposted by {post.user.username}
			</Typography>
			<PostContainer post={post.post}/>
		</Paper>
	)
}

export default RepostContainer;
