import { Box, Grid, Paper, OutlinedInput, InputAdornment, Snackbar, Alert, IconButton, Skeleton, Stack, Button, InputLabel, useTheme } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import UserShowPageHeader from './user-show-page-header';
import HomeFixturesColumn from '../home/home-fixtures-column';
import Title from '../util/title-util';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { updateUser } from '../../actions/session_actions';
import { useNavigate } from 'react-router-dom';

const UserUpdatePage = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isLoading = useSelector(state => state.users.isLoading);
	const currentUsername = useSelector(state => state.session?.user?.username);
	const [open, setOpen] = useState(false)

	const [password, setPassword] = useState('');
	const [bio, setBio] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const isMatching = password === confirmPassword;
	const isValidLength = (password.length === 0 || password.length > 7);
	const isValidBio = bio.length > 0 && bio.length < 200
	let password_error;
	let bio_error;

	if (!isValidLength) password_error = 'Password must be at least 8 characters'
	if (!isMatching) password_error = 'Passwords Must Match';
	if (isValidLength && isMatching) password_error=''
	!isValidBio ? bio_error = 'Bio must be between 1 and 200 characters' : bio_error = ''

	const handleChange = (event) => {
		const { name, value } = event.target;
		if (name === 'password') setPassword(value);
		if (name === 'confirm') setConfirmPassword(value);
		if (name === 'bio') setBio(value);
	}

	const handleSubmit = () => {
		let userInfo = {
			'username': currentUsername,
			'password': password,
			'bio': bio
		}
		dispatch(updateUser(userInfo));
		setOpen(true);
		navigate(`/user/${currentUsername}`)
	}

	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<Grid item xs={6}>
				{
					isLoading ?
						<Skeleton
							animation="wave"
							height={100}
							width='100%'
						/>
						:
						<Paper elevation={1}>
							<UserShowPageHeader />
							<Box>
								<Title variant='h6' content='Edit Profile' />
								<Box sx={{ p: '1rem' }}>
									<Stack spacing={2} sx={{paddingTop: 2}}>
										<InputLabel>Bio (200 characters max)</InputLabel>
										<OutlinedInput
											id="outlined-adornment-password"
											type={'text'}
											multiline={'true'}
											minRows={2}
											name='bio'
											onChange={handleChange}
											helperText="Tell users about yourself"
										/>
										<Box sx={{ margin: 5, height: 10, color: theme.palette.error.main, fontFamily: theme.typography.bold }}>
											{bio_error}
										</Box>
										<InputLabel>New Password</InputLabel>
										<OutlinedInput
											id="outlined-adornment-password"
											type={showPassword ? 'text' : 'password'}
											name='password'
											value={password}
											onChange={handleChange}
											helperText="New password"
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
														edge="end"
													>
														{showPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
										/>
										<InputLabel>Confirm New Password</InputLabel>
										<OutlinedInput
											id="outlined-adornment-password"
											type={showConfirmPassword ? 'text' : 'password'}
											name='confirm'
											value={confirmPassword}
											onChange={handleChange}
											helperText="New password"
											endAdornment={
												<InputAdornment position="end">
													<IconButton
														aria-label="toggle password visibility"
														onClick={handleClickShowConfirmPassword}
														onMouseDown={handleMouseDownPassword}
														edge="end"
													>
														{showConfirmPassword ? <VisibilityOff /> : <Visibility />}
													</IconButton>
												</InputAdornment>
											}
										/>
										<Box sx={{margin: 5, height: 10, color: theme.palette.error.main, fontFamily: theme.typography.bold }}>
											{password_error}
										</Box>
										<Button variant='contained' disabled={!isMatching || !isValidLength || !isValidBio} onClick={handleSubmit} >
											Update Profile
										</Button>
									</Stack>
								</Box>
							</Box>
						</Paper>
				}
			</Grid>
			<Grid item xs={3}>
				<HomeFixturesColumn />
			</Grid>
			<Snackbar open={open} autoHideDuration={6000}>
				<Alert severity="success" sx={{ width: '100%' }}>
					Info updated successfully
				</Alert>
			</Snackbar>
		</>
	)
}

export default UserUpdatePage;