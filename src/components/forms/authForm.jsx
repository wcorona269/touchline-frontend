import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography, useTheme } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useState } from 'react';

const AuthForm = ({fields, onSubmit}) => {
	const theme = useTheme();
	const [formState, setFormState] = useState({});
	const [isValid, setIsValid] = useState(true);
	const [errors, setErrors] = useState([]);
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
		}

		return result;
	}

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	console.log(formState)

	return (
		<form onSubmit={handleSubmit} style={{width: 'fit-content', display: 'flex', flexDirection: 'column', gap: 15}} >
			{fields.map((field) => {
				if (field === 'password' || field === 'confirmPassword') {
					const display = field === 'password' ? showPassword : showConfirmPassword
					return (
						<OutlinedInput
							id="outlined-adornment-password"
							name={field}
							type={display ? 'text' : 'password'}
							placeholder={field === 'password' ? 'Password' : 'Confirm password'}
							onChange={handleChange}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={field === 'password' ? handleClickShowPassword : handleClickShowConfirmPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{
											display ? <VisibilityOff /> : <Visibility />
										}
									</IconButton>
								</InputAdornment>
							}
						/>
					)
				} else {
					return (
						<TextField
						sx={{width: 250}}
						key={field}
						type={field === 'password' || field === 'confirmPassword' ? 'password' : 'text'}
						placeholder={field}
						name={field}
						value={formState[field] || ''}
						onChange={handleChange}
						/>
					)
				}
			})
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
