import { Box, Chip, Typography, useTheme } from '@mui/material'
import React from 'react'
import Title from '../util/title-util'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserFavorites = () => {
	const favorites = useSelector(state => state.favorites?.favorites);
	const theme = useTheme();
	const navigate = useNavigate();

	const handleClick = (favorite) => {
		navigate(`/${favorite.target_type}/${favorite.target_id}`)
	}

	const displayFavorites = () => {
		let result = [];

		if (!favorites.length) {
			return (
				<Typography align='center' variant='subtitle2' sx={{ color: theme.palette.text.disabled, m: 3 }} >
					Add favorites by visiting a club, league, or player profile page for easy access here.
				</Typography>
			) 
		}

		for (let favorite of favorites) {
			result.push(
				<Chip 
					variant='outlined' 
					color='primary'
					label={favorite.name}
					onClick={() => handleClick(favorite)}
					sx={{m: .5}}
				/>
			)
		}
		return result;
	}

	if (!favorites) return null;
	return (
		<Box>
			<Title variant='h5' content='My Favorites'/>
			<Box sx={{p: 1}}>
				{displayFavorites()}
			</Box>
		</Box>
	)
}

export default UserFavorites