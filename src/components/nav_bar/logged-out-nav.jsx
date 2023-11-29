import React from 'react'
import { showModal } from '../../actions/modal_actions';
import { useDispatch } from 'react-redux';
import { Button, Stack, useTheme } from '@mui/material';


const LoggedOutNav = () => {
	const dispatch = useDispatch();
	const theme = useTheme(); 

	const loginModal = (e) => {
		dispatch(showModal('login'))
	}
	
	const signupModal = (e) => {
		dispatch(showModal('signup'))
	}

	return (
		<div className='logged-out-nav' >
			<Stack spacing={1} direction='row'>
				<Button variant='contained' size='small' sx={{ fontFamily: theme.typography.bold }} onClick={() => loginModal()}>
					log in
				</Button>
				<Button variant='outlined' size='small' sx={{ fontFamily: theme.typography.bold }} onClick={() => signupModal()}>
					Sign up
				</Button>
			</Stack>
		</div>
	)
}

export default LoggedOutNav