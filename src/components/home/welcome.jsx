import React, { useEffect } from 'react'
import {  Typography, Container, useTheme, Divider, Button, Stack } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { showModal } from '../../actions/modal_actions';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const currentUser = useSelector(state => state.session.user)

	useEffect(() => {
		if (currentUser !== null) {
			navigate('/home')
		}
	}, [currentUser])

	const loginModal = (e) => {
		dispatch(showModal('login'))
	}

	const signupModal = (e) => {
		dispatch(showModal('signup'))
	}

	useEffect(() => {
		// Disable scroll when the component mounts
		window.scrollTo(0, 0)
		document.body.style.overflow = 'hidden';

		// Re-enable scroll when the component unmounts
		// return () => {
			
		// };
	}, []);

	const buttonCss = { width: 150, fontFamily: theme.typography.bold, margin: 'auto' }

	return (
		<Container>
			<Stack spacing={2} alignItems='center'>
				<Typography variant='h1' sx={{ color: theme.palette.primary.main, fontSize: { xs: '3rem', sm: '4rem', md: '6rem' } }}>
					touchline
				</Typography>
				<Typography variant='h4' sx={{ color: theme.palette.primary.main, fontSize: { xs: '1.25rem', sm: '1.5rem', md: '2.125rem' } }} >
					The everything app for soccer.
				</Typography>
				<Divider/>
				<Button 
					variant='contained' 
					onClick={loginModal}
					sx={buttonCss}
				>
					Log in
				</Button>
				<Button 
					variant='outlined' 
					onClick={signupModal}
					sx={buttonCss}
				>
					Sign up
				</Button>
			</Stack>
		</Container>
	)
}

export default Welcome;