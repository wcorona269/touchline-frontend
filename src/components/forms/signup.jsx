import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, removeUserErrors } from '../../actions/session_actions';
import { showModal, closeModal } from '../../actions/modal_actions';
import AuthForm from './authForm';
import { Box, Link, Typography, useTheme } from '@mui/material';

const SignupForm = () => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const currentUser = useSelector(state => state.session.user);
	const errorMessage = useSelector(state => state.users.error);

	const fields = ['username', 'password', 'confirmPassword'];
	
	const onSubmit = (formData) => {
		dispatch(registerUser(formData));
	}

	const changeFormType = () => {
		dispatch(closeModal());
		dispatch(showModal('login'));
	}

	const boxCss = { width: 'fit-content', margin: 'auto', display: 'flex', flexDirection: 'column' }

	return (
		<Box sx={boxCss}>
			<Typography variant='h5' sx={{ color: theme.palette.primary.main, margin: 'auto', marginBottom: 2, fontFamily: theme.typography.bold }}>
				Sign up
			</Typography>
			<AuthForm
				fields={fields}
				type={'signup'}
				onSubmit={onSubmit}
			/>
			<Link underline='hover' variant='body2' sx={{ marginTop: 2, color: theme.palette.text.secondary}} onClick={() => changeFormType()}>
				Already have an account? Log in.
			</Link>
		</Box>
	)
}

export default SignupForm;