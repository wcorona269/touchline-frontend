# Touchline Soccer

## Introduction
Touchline Soccer is a social app for soccer discussion, statistics, news, and more. Users can also create a 'Favorite' list, adding their preferred clubs, players, or leagues to personalize their news feed based on their favorites. This repo is for the Frontend component of the application. Check out the backend repo [here](https://github.com/wcorona269/touchline-backend)!

## Technologies Used
- Python3 Flask backend
- Flask-SQLAlchemy
- PostgreSQL database
- React frontend (w/ React Hooks)
- [Material UI (open-source React component library)](https://mui.com/material-ui/).
- [Microsoft Azure](https://azure.microsoft.com/en-us/free/search/?&ef_id=_k_CjwKCAiAvoqsBhB9EiwA9XTWGWVAR1v-vuXLENa1sVdRTF6c_nJk6PMWjKZ8j7xN2FZD5aGZMGdFnhoCFMAQAvD_BwE_k_&OCID=AIDcmm5edswduu_SEM__k_CjwKCAiAvoqsBhB9EiwA9XTWGWVAR1v-vuXLENa1sVdRTF6c_nJk6PMWjKZ8j7xN2FZD5aGZMGdFnhoCFMAQAvD_BwE_k_&gad_source=1&gclid=CjwKCAiAvoqsBhB9EiwA9XTWGWVAR1v-vuXLENa1sVdRTF6c_nJk6PMWjKZ8j7xN2FZD5aGZMGdFnhoCFMAQAvD_BwE)
	- Frontend - Azure Web App
	- Backend - Azure Web App + Database
	- Photo Storage - Azure Container Blobs
- [API-SPORTS FOOTBALL-API](https://api-sports.io/)
- [Google News Python Package](https://pypi.org/project/GoogleNews/)

## Features

### Splash Page - User Authentication
- Sign up & Log in functionality.
![](https://github.com/wcorona269/touchline-frontend/blob/main/public/gifs/auth.gif)

### Update User
- Logged in users can change their profile picture, bio, and password.
![](https://github.com/wcorona269/touchline-frontend/blob/main/public/gifs/user%20update.gif)

### Light & Dark Themes
- Logged in users can choose between light or dark mode
![](https://github.com/wcorona269/touchline-frontend/blob/main/public/gifs/theme.gif)

### Posts, Comments, Likes & Reposts.
- Logged in users can access CRUD funtionality for posts, comments, likes, and reposts
- Twitter-style social media timeline
- Home page includes top soccer news and a live match feed
![](https://github.com/wcorona269/touchline-frontend/blob/main/public/gifs/post%20crud.gif)

### Match Show Page
- Detailed profile pages for games across the world
- Match stats, events, lineups, and more
![](https://github.com/wcorona269/touchline-frontend/blob/main/public/gifs/match%20show%20page.gif)

### League Show Page
- Detailed profile pages for soccer leagues
- Statistics, match information, and league-specific data
![](https://github.com/wcorona269/touchline-frontend/blob/main/public/gifs/league%20show%20page.gif)

### Matches Index
- Search for all football matches globally
- Filter by date and country
![](https://github.com/wcorona269/touchline-frontend/blob/main/public/gifs/matches%20index.gif)

### Club & Player Show Pages
- Profile pages for soccer clubs & Players
- Club-specific information, achievements, and player roster
- Individual player profile pages
- Player statistics, performance history, and achievements
![](https://github.com/wcorona269/touchline-frontend/blob/main/public/gifs/club%20and%20player%20show.gif)

### Favorite Model
- Users can add their favorite clubs, players, or leagues to their profiles
- Personalized news feed based on the user's favorites

## Code Sample
### Home Page
```
import React, { useEffect, useState } from 'react';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import {  Box, Container, Grid, Paper, SpeedDial, Stack } from '@mui/material';
import HomeMenu from './home-menu';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNotifications } from '../../actions/notification_actions';
import { fetchFavorites } from '../../actions/favorite_actions';
import UserFavorites from './my-favorites';

const Home = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch()
	const [selectedTab, setSelectedTab] = useState(0);
	const isFavoritesLoading = useSelector(state => state.favorites.isLoading)
	const username = useSelector(state => state.session.user?.username);
	const user_id = useSelector(state => state.session?.user?.id);	
	const isNotificationsLoading = useSelector(state => state.notifications.isLoading)
	const notifications = useSelector(state => state.notifications?.notifications)
	const [unreadCount, setUnreadCount] = useState();
	
	useEffect(() => {
		if (!isFavoritesLoading) {
			dispatch(fetchFavorites(user_id))
		}
		if (!isNotificationsLoading) {
			dispatch(fetchNotifications(user_id))
		}
	}, [user_id])

	useEffect(() => {
		document.body.style.overflow = 'visible';
	}, [])

	useEffect(() => {
		if (location.pathname.includes('home')) {
			setSelectedTab(0)
		} else if (location.pathname.includes('notifications')) {
			setSelectedTab(1)
		} else if (location.pathname.includes('matches')) {
			setSelectedTab(3)
		} else if (location.pathname.includes('news')) {
			setSelectedTab(4)
		} else if (location.pathname.includes(username)) {
			setSelectedTab(5)
		} else {
			setSelectedTab(2)
		}

		window.scrollTo(0, 0)
	}, [location])

	useEffect(() => {
		let count = 0;
		if (!notifications || typeof notifications !== 'object') return; 
		let notifs = Object.values(notifications)
		if (notifications) {
			for (let notif of notifs) {
				if (notif.read === false) count += 1;
			}
		}
		setUnreadCount(count)
	}, [notifications])

	const handleTabSelect = (value, location) => {
		setSelectedTab(value);
		navigate(`/${location}`)
	}

	return (
		<Container className='home-container' sx={{paddingBottom: '5rem'}}>
			<Grid container alignItems='flex-start' spacing={2}>
				<Grid item xs={3} sx={{position: 'sticky', top: '2rem'}}>
					<Stack spacing={2}>
						<Box>
							<HomeMenu 
								unreadCount={unreadCount}
								selectedTab={selectedTab}
								handleTabSelect={handleTabSelect}
							/>
						</Box>
						<Paper elevation={1}>
							<UserFavorites/>
						</Paper>
					</Stack>
				</Grid>
				<Outlet/>
			</Grid>
		</Container>
	)
}

export default Home;
```

## Getting Started

### Prerequisites
- Python3 installed
- Node.js and npm installed
- API key from [API-SPORTS FOOTBALL-API](https://api-sports.io/)

### Installation
1. Clone the frontend repository: `git clone https://github.com/your-username/touchline-frontend.git`
2. Clone the backend repository: `git clone https://github.com/your-username/touchline-backend.git`
5. Install frontend dependencies: `npm install`
4. Install backend dependencies: `pip install -r requirements.txt`
6. Set up your API key in the appropriate configuration file
7. Run the application:
   - Backend: `flask run`
   - Frontend: `npm start`
