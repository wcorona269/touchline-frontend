import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ArticleIcon from '@mui/icons-material/Article';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { alpha, Badge, BottomNavigation, BottomNavigationAction, List, ListItemButton, Paper, Typography, useTheme } from '@mui/material';
import PublicIcon from '@mui/icons-material/Public';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useSelector } from 'react-redux';

const menuItems = (username) => [
	{ tab: 0, path: 'home', label: 'Home', icon: HomeOutlinedIcon, activeIcon: HomeRoundedIcon },
	{ tab: 1, path: 'notifications', label: 'Notifications', icon: NotificationsNoneIcon, activeIcon: NotificationsIcon, badge: true },
	{ tab: 2, path: 'explore', label: 'Explore', icon: PublicIcon, activeIcon: TravelExploreIcon },
	{ tab: 3, path: 'matches', label: 'Matches', icon: SportsSoccerIcon, activeIcon: SportsSoccerIcon },
	{ tab: 4, path: 'news', label: 'News', icon: ArticleOutlinedIcon, activeIcon: ArticleIcon },
	{ tab: 5, path: `user/${username}`, label: 'My Profile', icon: PersonOutlineIcon, activeIcon: PersonIcon },
];

const HomeMenu = ({ selectedTab, handleTabSelect, unreadCount }) => {
	const theme = useTheme();
	const username = useSelector(state => state.session?.user?.username);

	return (
		<List disablePadding sx={{ display: { xs: 'none', md: 'flex' }, flexDirection: 'column', gap: 0.5 }}>
			{menuItems(username).map(({ tab, path, label, icon: Icon, activeIcon: ActiveIcon, badge }) => {
				const active = selectedTab === tab;
				return (
					<ListItemButton
						key={tab}
						onClick={() => handleTabSelect(tab, path)}
						sx={{
							gap: 1.75,
							py: 1.25,
							color: active ? theme.palette.primary.main : theme.palette.text.secondary,
							backgroundColor: active ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
							'&:hover': {
								color: active ? theme.palette.primary.main : theme.palette.text.primary,
								backgroundColor: active ? alpha(theme.palette.primary.main, 0.14) : theme.palette.action.hover,
							},
						}}
					>
						<Badge badgeContent={badge ? unreadCount : 0} color='primary'>
							{active ? <ActiveIcon /> : <Icon />}
						</Badge>
						<Typography sx={{ fontSize: '0.975rem', fontWeight: active ? 700 : 500 }}>{label}</Typography>
					</ListItemButton>
				)
			})}
		</List>
	)
}

// Phones get a fixed bottom tab bar instead of the sidebar list; profile stays reachable from the nav bar avatar.
export const MobileTabBar = ({ selectedTab, handleTabSelect, unreadCount }) => {
	const theme = useTheme();
	const username = useSelector(state => state.session?.user?.username);
	const items = menuItems(username).filter(item => item.tab !== 5);

	return (
		<Paper
			square
			sx={{
				display: { xs: 'block', md: 'none' },
				position: 'fixed',
				left: 0,
				right: 0,
				bottom: 0,
				zIndex: theme.zIndex.appBar,
				border: 'none',
				borderTop: `1px solid ${theme.palette.divider}`,
				borderRadius: 0,
				backgroundColor: alpha(theme.palette.background.default, 0.85),
				backdropFilter: 'saturate(180%) blur(16px)',
				paddingBottom: 'env(safe-area-inset-bottom)',
			}}
		>
			<BottomNavigation
				showLabels
				value={selectedTab}
				sx={{ backgroundColor: 'transparent', height: 64 }}
			>
				{items.map(({ tab, path, label, icon: Icon, activeIcon: ActiveIcon, badge }) => (
					<BottomNavigationAction
						key={tab}
						value={tab}
						label={label === 'Notifications' ? 'Alerts' : label}
						onClick={() => handleTabSelect(tab, path)}
						icon={
							<Badge badgeContent={badge ? unreadCount : 0} color='primary'>
								{selectedTab === tab ? <ActiveIcon /> : <Icon />}
							</Badge>
						}
						sx={{
							minWidth: 0,
							color: theme.palette.text.secondary,
							'& .MuiBottomNavigationAction-label': { fontSize: 11, fontWeight: 600, mt: 0.25 },
							'& .MuiBottomNavigationAction-label.Mui-selected': { fontSize: 11 },
						}}
					/>
				))}
			</BottomNavigation>
		</Paper>
	)
}

export default HomeMenu;
