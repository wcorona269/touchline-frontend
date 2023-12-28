import React from 'react';
import { AppBar, Box, Container, Typography, useTheme } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../actions/session_actions';
import AccountMenu from './account-menu';
import AboutMenu from './about-menu';
import { useNavigate } from 'react-router-dom';

const NavBar = ({ lightMode, setLightMode }) => {
	const currentUser = useSelector(state => state.session.user);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const theme = useTheme();

	const handleClick = () => {
		dispatch(logoutUser());
	}

	if (currentUser === null) return null;
	return (
		<AppBar  >
			<Container sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
				<Typography variant='h4' sx={{color: lightMode ? theme.palette.text.primary : theme.palette.primary.main }} onClick={() => navigate('/')} >
					touchline
				</Typography>
				<Box display={'flex'} flexDirection='row'>
					<AccountMenu lightMode={lightMode} setLightMode={setLightMode} handleClick={handleClick} />
					<AboutMenu lightMode={lightMode} setLightMode={setLightMode} handleClick={handleClick} />
				</Box>
			</Container>
		</AppBar>
	)
}

export default NavBar;