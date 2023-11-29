import React from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../actions/session_actions';
import AuthForm from './authForm';
import { showModal, closeModal } from '../../actions/modal_actions';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, useTheme } from '@mui/material';

const LoginForm = (props) => {
	const theme = useTheme();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const fields = ['email', 'password'];

	const onSubmit = (formData) => {
		dispatch(loginUser(formData)).then(() => {navigate('/home')})
	}

	const changeFormType = () => {
		dispatch(closeModal());
		dispatch(showModal('signup'));
	}

	const boxCss = { width: 'fit-content', margin: 'auto', display: 'flex', flexDirection: 'column' }

	return (
		<Box sx={boxCss}>
			<Typography variant='h5' sx={{color: theme.palette.primary.main,margin:'auto', marginBottom: 2, fontFamily: theme.typography.bold}}>
				Log in
			</Typography>
			<AuthForm
				fields={fields}
				onSubmit={onSubmit}
			/>
			<Typography variant='body2' sx={{ marginTop: 2, color: theme.palette.text.secondary }} onClick={() => changeFormType()}>Don't have an account? Sign up.</Typography>
		</Box>
	);
}

export default LoginForm;