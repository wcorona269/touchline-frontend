import React, { useEffect } from 'react'
import { Typography, Container, useTheme, Button, Stack, Box, alpha } from '@mui/material';
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

	const buttonCss = { width: { xs: '100%', sm: 160 }, height: 48, fontSize: '1rem' }

	return (
		<Box
			sx={{
				position: 'fixed',
				inset: 0,
				display: 'grid',
				placeItems: 'center',
				background: `radial-gradient(60% 50% at 50% 35%, ${alpha(theme.palette.primary.main, 0.16)} 0%, transparent 70%), ${theme.palette.background.default}`,
			}}
		>
			<Container maxWidth='sm'>
				<Stack spacing={3} alignItems='center' textAlign='center'>
					<Typography variant='h1' sx={{ fontWeight: 800, letterSpacing: '-0.055em', lineHeight: 1, fontSize: { xs: '3.5rem', sm: '5rem', md: '6.5rem' } }}>
						touchline<Box component='span' sx={{ color: theme.palette.primary.main }}>.</Box>
					</Typography>
					<Typography sx={{ color: theme.palette.text.secondary, fontSize: { xs: '1.1rem', md: '1.35rem' }, maxWidth: 440 }}>
						The everything app for soccer. Live scores, tables, and the conversation, all in one place.
					</Typography>
					<Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ width: { xs: '100%', sm: 'auto' }, pt: 1 }}>
						<Button variant='contained' onClick={signupModal} sx={buttonCss}>
							Get started
						</Button>
						<Button variant='outlined' color='inherit' onClick={loginModal} sx={buttonCss}>
							Log in
						</Button>
					</Stack>
				</Stack>
			</Container>
		</Box>
	)
}

export default Welcome;