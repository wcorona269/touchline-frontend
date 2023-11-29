import { Box } from '@mui/material';
import React from 'react'
import CreateComment from './create-comment';
import CommentContainer from './comment-container';

const CommentSection = ({ comments, post }) => {
	return (
		<Box className='post-comment-section' sx={{ marginTop: '1rem', paddingBottom: '1rem' }}>
			<CreateComment post={post} />
			{comments.map((comment, idx) => {
				return (
					<CommentContainer comment={comment} key={idx}/>
				)
			})}
		</Box>
	)
}

export default CommentSection;