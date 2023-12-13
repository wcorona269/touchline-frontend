import React from 'react'
import PostContainer from './post-container';
import { Link, Paper, Typography, useTheme } from '@mui/material';
import RepeatIcon from '@mui/icons-material/Repeat';
import { useNavigate } from 'react-router-dom';

const RepostContainer = ({post, idx}) => {
	const theme = useTheme()
	const navigate = useNavigate();

	return (
		<Paper elevation={1} key={idx} style={{paddingTop: '1rem'}}>
			<Typography sx={{ fontFamily: theme.typography.bold, marginLeft: '1rem', display: 'flex', alignItems: 'center' }} variant='caption'>
				<Link onClick={() => navigate(`/user/${post.user.username}`)} underline='hover' sx={{ color: theme.palette.text.disabled, display: 'flex', alignItems: 'center' }}>
					<RepeatIcon sx={{ marginRight: '.25rem' }} fontSize='small' />
					Reposted by {post.user.username}
				</Link>
			</Typography>
			<PostContainer post={post.post}/>
		</Paper>
	)
}

export default RepostContainer;
