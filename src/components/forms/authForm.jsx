import { Box, Button, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';

const AuthForm = ({fields, onSubmit}) => {
	const theme = useTheme();
	const [formState, setFormState] = useState({});
	const [isValid, setIsValid] = useState(true);
	const [errors, setErrors] = useState([]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({ ...prevState, [ name ]: value }));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors(validateFields());
		if (isValid === true) {
			onSubmit(formState);
		}
	}

	const isValidEmail = (email) =>  {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email);
	}

	const validateFields = () => {
		let result = []
		setIsValid(true);
		for (let field of fields) {
			if (!formState[field]) {
				setIsValid(false);
				result.push('All fields must be filled out');
				break;
			}

			if (field === 'password' && !!formState[field] && !(formState[field].length >= 8)) {
				setIsValid(false);
				result.push('Password must be at least 8 characters')
				break;
			}
			
			if (field === 'confirmPassword' && !!formState['password'] && formState[field] !== formState['password']) {
				setIsValid(false);
				result.push("Passwords don't match")
				break;
			}

			if (field === 'email' && !isValidEmail(formState[field])) {
				setIsValid(false);
				result.push('Please enter a valid email')
				break;
			}
		}

		return result;
	}

	return (
		<form onSubmit={handleSubmit} style={{width: 'fit-content', display: 'flex', flexDirection: 'column', gap: 15}} >
			{fields.map((field) => (
				<TextField
					sx={{width: 250}}
					key={field}
					type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
					placeholder={field}
					name={field}
					value={formState[field] || ''}
					onChange={handleChange}
				/>
			))
		}
		<Box className='auth-error-message'>
			{errors.map((error) => (
				<Typography variant='body2' sx={{ color: theme.palette.error.main, typography: theme.typography.bold }} key={error}>
					{error}
				</Typography>
			))}	
		</Box>
		<Button
			sx={{width: '100%'}}
			variant='contained'
			type="submit"
			// disabled={!isValid}
		>
			submit
		</Button>
		</form>
	)
}

export default AuthForm;
