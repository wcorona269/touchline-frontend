import { Box, Button, IconButton, InputAdornment, OutlinedInput, TextField, Typography, useTheme } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const AuthForm = ({fields, type, onSubmit}) => {
	const theme = useTheme();
	const [formState, setFormState] = useState({});
	const [isValid, setIsValid] = useState(true);
	const [errors, setErrors] = useState([]);
	const flask_errors = useSelector(state => state.session.errors)
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

			if (field === 'username') {
				const content = formState[field]
				var regex = /^[a-zA-Z0-9_]+$/;
				if (regex.test(content) === false) {
					result.push('Username can only contain alphanumeric characters & underscores')
				}
				if (content.length < 4) {
					result.push('Username must be at least 4 alphanumeric characters')
				}
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
							placeholder={field === 'password' ? 'password' : 'confirm password'}
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
				} else if (field === 'username' && type === 'signup') {
					const content = formState[field]
					const valid = !content?.includes(' ') && content?.length >= 4
					return (
						<OutlinedInput
							sx={{ width: 250 }}
							id="outlined-adornment-password"
							name={field}
							type={'text'}
							placeholder={'username (min. 4 characters)'}
							onChange={handleChange}
							endAdornment={
								content?.length > 0 &&
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle username validity"
										key={field}
										name={field}
										edge="end"
									>
										{
											valid ? 
											<CheckBoxIcon sx={{color: theme.palette.primary.main}} size='small' /> : 
											<CancelIcon sx={{color: theme.palette.error.main}} size='small'/>
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
				<Typography variant='body2' sx={{ width: 250, color: theme.palette.error.main, typography: theme.typography.bold }} key={error}>
					{error}
				</Typography>
			))}	
		</Box>
		<Button
			sx={{width: '100%'}}
			variant='contained'
			type="submit"
		>
			submit
		</Button>
		</form>
	)
}

export default AuthForm;
