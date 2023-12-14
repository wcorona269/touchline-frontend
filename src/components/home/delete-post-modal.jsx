import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useTheme } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deletePost } from '../../actions/post_actions';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 400,
	bgcolor: 'background.paper',
	border: '2px solid #000',
	boxShadow: 24,
	p: 4,
};

const DeletePostModal = ({postId, open, handleClose}) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleClick = () => {
		dispatch(deletePost(postId));
		handleClose()
	}

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box sx={style}>
					<Typography variant="h5"  sx={{fontFamily: theme.typography.bold, color: theme.palette.text.primary}}>
						Delete post?
					</Typography>
					<Typography variant='body2' sx={{color: theme.palette.text.secondary}} >
						This can't be undone and it will be removed from your profile.
					</Typography>
					<Button variant='contained' sx={{marginTop: 1, width: '100%'}} onClick={handleClick}>
						Delete Post
					</Button>
				</Box>
			</Modal>
		</div>
	);
}

export default DeletePostModal;