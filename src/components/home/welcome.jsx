import React, { useEffect } from 'react'
import {  Typography, Container, useTheme, Divider, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { showModal } from '../../actions/modal_actions';

const Welcome = () => {
	const theme = useTheme();
	const dispatch = useDispatch();

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
				<Typography variant='h1' sx={{ color: theme.palette.primary.main }}>
					touchline
				</Typography>
				<Typography variant='h4' sx={{ color: theme.palette.primary.main }} >
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