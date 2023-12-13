import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import { List, ListItem, Paper, useTheme } from '@mui/material';

const AboutMenu = ({ lightMode, setLightMode }) => {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = (event) => {
		setAnchorEl(null);
	};

	return (
		<>
			<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'right' }}>
				<Tooltip title="About">
					<IconButton
						onClick={handleClick}
						size="small"
						sx={{ ml: 1 }}
						aria-controls={open ? 'about-menu' : undefined}
						aria-haspopup="true"
						aria-expanded={open ? 'true' : undefined}
					>
						<InfoIcon/>
					</IconButton>
				</Tooltip>
			</Box>
			<Menu
				anchorEl={anchorEl}
				id="about-menu"
				open={open}
				onClose={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: 'background.paper',
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<Paper elevation={10} sx={{padding: 2, maxWidth: 250, height: 'fit-content' }}>
					<Typography variant='body2' sx={{lineHeight: '1.5'}}>
						My name is Will Corona and I am a graduate of the full-stack software engineering program at 
						<span style={{color: theme.palette.error.main, fontFamily: theme.typography.bold, marginLeft: '4px'}}>
							App Academy.
						</span>
						<br/>
						<br/>
						<span style={{ marginRight: '4px', color: theme.palette.primary.main, fontFamily: theme.typography.bold}}>
							touchline 
						</span>
						is a web app for soccer discussion, stats, and news.
						This project uses 
						<span style={{color: theme.palette.secondary.main, marginLeft: '4px', marginRight: '4px', fontFamily: theme.typography.bold}}>
							React, Redux, Material-UI, CSS and SASS
						</span>
						for frontend configuration, and
						<span style={{ color: theme.palette.secondary.main, marginLeft: '4px', marginRight: '4px', fontFamily: theme.typography.bold}}>
							Flask & SQLAlchemy
						</span>
						for the backend. This project also uses the
						<span style={{ color: theme.palette.secondary.main, marginLeft: '4px', marginRight: '4px', fontFamily: theme.typography.bold }}>
							API-Football by API-SPORTS
						</span> 
						for soccer data and the
						<span style={{ color: theme.palette.secondary.main, marginLeft: '4px', marginRight: '4px', fontFamily: theme.typography.bold }}>
							Python GoogleNews
						</span> 
						web scraping package for news.
						<br/>
						<br/>
						If you are a developer and would like to contribute to this project, please don't hesitate to reach out. My contact info is in the footer. Enjoy!
					</Typography>
				</Paper>
			</Menu>
		</>
	);
}

export default AboutMenu;