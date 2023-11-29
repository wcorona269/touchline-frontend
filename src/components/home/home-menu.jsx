import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArticleIcon from '@mui/icons-material/Article';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Badge, List, ListItem, ListItemButton, Typography, useTheme } from '@mui/material';
import ListItemContent from '@mui/joy/ListItemContent';
import PublicIcon from '@mui/icons-material/Public';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import React from 'react';
import Title from '../util/title-util';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSelector } from 'react-redux';

const HomeMenu = ({ selectedTab, handleTabSelect, unreadCount }) => {
	const theme = useTheme();
	const username = useSelector(state => state.session?.user?.username);
	
	const buttons = [
		<ListItem key={0} sx={{paddingLeft: '0px'}}>
			<ListItemButton onClick={() => handleTabSelect(0, 'home')} sx={{ color: selectedTab === 0 ? theme.palette.primary.main : theme.palette.text.primary }}>
				{ selectedTab === 0 ?
					<HomeRoundedIcon fontSize='large'/> : <HomeOutlinedIcon fontSize='large'/>
				}	
				<ListItemContent sx={{marginLeft: '.5rem'}}>
					<Typography sx={{ fontFamily: selectedTab === 0 ? theme.typography.bold : theme.typography.fontFamily }} variant='h5'>Home</Typography>
				</ListItemContent>
			</ListItemButton>
		</ListItem>,
		<ListItem key={1} sx={{ paddingLeft: '0px' }}>
			<ListItemButton onClick={() => handleTabSelect(1, 'notifications')} sx={{ color: selectedTab === 1 ? theme.palette.primary.main : theme.palette.text.primary }}>
				<Badge badgeContent={unreadCount} color='primary' >
					{ selectedTab === 1 ?
						<NotificationsIcon fontSize='large' /> : <NotificationsNoneIcon fontSize='large'/>
					}	
				</Badge>
				<ListItemContent sx={{marginLeft: '.5rem'}}>
					<Typography sx={{ fontFamily: selectedTab === 1 ? theme.typography.bold : theme.typography.fontFamily }} variant='h5'>Notifications</Typography>
				</ListItemContent>
			</ListItemButton>
		</ListItem>,
		<ListItem key={2} sx={{ paddingLeft: '0px' }}>
			<ListItemButton onClick={() => handleTabSelect(2, 'explore')} sx={{ color: selectedTab === 2 ? theme.palette.primary.main : theme.palette.text.primary }}>
			{ selectedTab === 2 ?
				<TravelExploreIcon fontSize='large'/> :
				<PublicIcon fontSize='large' />
			}	
				<ListItemContent sx={{marginLeft: '.5rem'}}>
					<Typography sx={{ fontFamily: selectedTab === 3 ? theme.typography.bold : theme.typography.fontFamily }} variant='h5'>Explore</Typography>
				</ListItemContent>
			</ListItemButton>
		</ListItem>,
		<ListItem key={3} sx={{ paddingLeft: '0px' }}>
			<ListItemButton onClick={() => handleTabSelect(3, 'matches')} sx={{ color: selectedTab === 3 ? theme.palette.primary.main : theme.palette.text.primary }}>
				<SportsSoccerIcon fontSize='large' />
				<ListItemContent sx={{marginLeft: '.5rem'}}>
					<Typography sx={{ fontFamily: selectedTab === 3 ? theme.typography.bold : theme.typography.fontFamily }} variant='h5'>Matches</Typography>
				</ListItemContent>
			</ListItemButton>
		</ListItem>,
		<ListItem key={4} sx={{ paddingLeft: '0px' }}>
			<ListItemButton onClick={() => handleTabSelect(4, 'news')} sx={{ color: selectedTab === 4 ? theme.palette.primary.main : theme.palette.text.primary }}>
				{ selectedTab === 4 ?
					<ArticleIcon fontSize='large'/> : <ArticleOutlinedIcon fontSize='large' />
				}	
				<ListItemContent sx={{marginLeft: '.5rem'}}>
					<Typography sx={{ fontFamily: selectedTab === 4 ? theme.typography.bold : theme.typography.fontFamily }} variant='h5'>News</Typography>
				</ListItemContent>
			</ListItemButton>
		</ListItem>,
		<ListItem key={5} sx={{ paddingLeft: '0px' }}>
			<ListItemButton onClick={() => handleTabSelect(5, `user/${username}`)} sx={{ color: selectedTab === 5 ? theme.palette.primary.main : theme.palette.text.primary }}>
				{ selectedTab === 5 ?
					<PersonIcon fontSize='large'/> : <PersonOutlineIcon fontSize='large' />
				}
				<ListItemContent sx={{marginLeft: '.5rem'}}>
					<Typography sx={{ 
						fontFamily: selectedTab === 5 ? theme.typography.bold : theme.typography.fontFamily,
						}} 
						variant='h5'
					>
							My Profile
					</Typography>
				</ListItemContent>
			</ListItemButton>
		</ListItem>,
	]

	return (
		<>
			<Title variant='h5' content='Dashboard' />
			<List>
				{buttons}
			</List>
		</>
	)
}

export default HomeMenu;