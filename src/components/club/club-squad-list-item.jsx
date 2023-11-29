import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

const ClubSquadListItem = ({player}) => {
	const navigate = useNavigate();

	return (
		<Card raised={true} onClick={() => navigate(`/player/${player.id}`)} sx={{ width: '100%', height: '250px', margin: '.5rem' }}>
			<img alt={player.name} src={player.photo} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}/>
			<CardContent>
				<Typography gutterBottom variant="subtitle1" component="div">
					{player.name}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Age: {player.age}
					<br></br>
					No: {player.number}
				</Typography>
			</CardContent>
			<CardActions>
			</CardActions>
		</Card>
	);
}

export default ClubSquadListItem;