import { useTheme, Avatar, IconButton, Divider, Typography, Box, Button, Paper, Badge, Tooltip } from '@mui/material';
import React from 'react' 
import { useNavigate, useParams } from 'react-router-dom';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import Title from '../util/title-util';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { showModal } from '../../actions/modal_actions';

const UserShowPageHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch(); 
	const theme = useTheme();
	const { username } = useParams();
	const currentUser = useSelector(state => state.session.user?.username);
	const created_at = useSelector(state => state.users.users?.user?.created_at);
	const bio = useSelector(state => state.users.users?.user?.bio);
	const avatar_url = useSelector(state => state.users.users?.user?.avatar_url);
	const isCurrentUser = username === currentUser;

	const handleClick = () => {
		navigate(`/edit-profile/${currentUser}`)
	}

	const handleModal = () => {
		dispatch(showModal('photo'))
	}

	const displayAvatar = () => {
		if (!isCurrentUser) return (
			<Avatar sx={{ height: 100, width: 100, marginRight: 1 }} alt={username} src={avatar_url} />
			)
		return (
			<Badge
				overlap="circular"
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				badgeContent={
					<Tooltip title='Update Avatar'>
						<IconButton onClick={handleModal}>
							<AddAPhotoIcon size='small' sx={{color: theme.palette.text.secondary}}/>
						</IconButton>
					</Tooltip>
				}
			>
				<Avatar sx={{ height: 100, width: 100, marginRight: 1 }} alt={username} src={avatar_url} />
			</Badge>
		)
	}

	return (
		<Paper elevation={1}>
			<Title variant='h6' content={username} back={true} />
			<Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'left', alignItems: 'flex-end', padding: 2, gap: 1 }} >
				{displayAvatar()}
				<Box display='flex' flexDirection='column'>
					<Typography variant='h6'>
						{username}
					</Typography>
					<Typography variant='body2' sx={{ color: theme.palette.text.secondary }} >
						Joined {moment(created_at).fromNow()}
					</Typography>
				</Box>
				{
					isCurrentUser &&
					<Button onClick={handleClick} variant='contained' sx={{ marginLeft: 'auto', marginBottom: 'auto' }}>
						<ManageAccountsIcon />
						Edit Profile
					</Button>
				}
			</Box>
			<Typography variant='body1' sx={{padding: 2}}>
				{bio}
			</Typography>
			<Divider />
		</Paper>
	)
}

export default UserShowPageHeader;