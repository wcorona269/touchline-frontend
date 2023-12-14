import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTheme } from '@mui/material';
import DeletePostModal from './delete-post-modal';

const options = [
	// 'Copy Link',
	'Delete post'
];

const ITEM_HEIGHT = 48;

const PostMenu = ({postId}) => {
	const theme = useTheme()
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const [showModal, setShowModal] = React.useState(false);
	const handleShowModal = () => {setShowModal(true)}
	const handleCloseModal = () => {setShowModal(false)};
	
	const handleClick = (event) => {setAnchorEl(event.currentTarget)};
	
	const handleClose = (e) => {
		switch (e.target.innerText) {
			case 'Delete post':
				handleShowModal();
			default:
				break;
		}
		setAnchorEl(null);
	};

	return (
		<div>
			<DeletePostModal open={showModal} handleClose={handleCloseModal} postId={postId}  />
			<IconButton
				aria-label="more"
				id="long-button"
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
				size='small'
				sx={{m: 0, p: 0, color: theme.palette.text.disabled }}
			>
				<MoreHorizIcon size='small'/>
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: ITEM_HEIGHT * 4.5,
						width: '20ch',
					},
				}}
			>
				{options.map((option) => (
					<MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}

export default PostMenu;