import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const AccountMenu = ({ lightMode, setLightMode }) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
	const username = useSelector(state => state?.session?.user?.username);
	const avatar_url = useSelector(state => state?.session?.user?.avatar_url);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (event) => {
		const name = event.currentTarget.getAttribute('name');
		if (name === 'profile') {
			navigate(`/user/${username}`)
		}
		if (name === 'logout') {
			dispatch(logoutUser());
			navigate('/welcome')
		}
		setAnchorEl(null);
	};

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
				<Typography sx={{ minWidth: 100 }}>{username}</Typography>
				<Tooltip title="Account settings">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 2 }}
						aria-controls={open ? 'account-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<Avatar sx={{ width: 32, height: 32 }} src={avatar_url}/>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="account-menu"
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem sx={{ paddingLeft: 1, display: 'flex', flexDirection: 'row', alignItems: 'center' }} onClick={() => setLightMode(!lightMode)} >
					{ lightMode ? <LightModeIcon sx={{ padding: 1, margin: 'auto' }} size='small'/> : 
						<DarkModeIcon size='small' sx={{ padding: 1, margin: 'auto' }} /> }
					<Box>
						{ lightMode ? 'Light Mode' : 'Night Mode' }
					</Box>
				</MenuItem>
				<MenuItem onClick={handleClose} name='profile' >
					<Avatar src={avatar_url} /> My Profile
				</MenuItem>
				<MenuItem onClick={handleClose} name='logout' >
					<ListItemIcon>
						<Logout fontSize="small" />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	);
}

export default AccountMenu;