import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom'
import { createFavorite, deleteFavorite } from '../../actions/favorite_actions';
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const FavoriteButton = ({ name }) => {
	const { id } = useParams();
	const location = useLocation();
	const dispatch = useDispatch();
	const user_favorites = useSelector(state => state.favorites?.favorites);
	const isLoading = useSelector(state => state.favorites?.isLoading);
	const user_id = useSelector(state => state.session?.user?.id)
	const [isFavorite, setIsFavorite] = useState(false);
	const target_type = location.pathname.split('/')[1].toUpperCase();

	useEffect(() => {
	}, [isFavorite])

	useEffect(() => {
		let fav_status = false;
		for (let favorite of user_favorites) {
			if (favorite.target_id === parseInt(id) && location.pathname.includes(favorite.target_type[0])) {
				fav_status = true;
			}
		}
		setIsFavorite(fav_status)
	}, [id, location.pathname, isLoading, isFavorite, user_favorites])

	const handleFavorite = () => {
		if (isFavorite === false) {
			const fav_info = {
				'user_id': user_id,
				'name': name,
				'target_id': id,
				'target_type': target_type,
			}
			dispatch(createFavorite(fav_info))
		} else {
			for (let favorite of user_favorites) {
				if (favorite.target_id === parseInt(id) && location.pathname.includes(favorite.target_type[0]) && favorite.name === name) {
					dispatch(deleteFavorite(favorite.id))
				}
			}
		}
		setIsFavorite(!isFavorite)
	}

	return isLoading === true ? null : (
		<Button 
			size='small' 
			variant={isFavorite ? 'outlined' : 'contained'}
			onClick={handleFavorite}
		>
			{isFavorite ?
				<>
					Favorited
				</> :
				<>
					<AddIcon size='small'/>
					Favorite
				</>
			}
		</Button>
	)
}

export default FavoriteButton;