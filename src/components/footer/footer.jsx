import { Box, Container, Grid, Link, Typography, useTheme } from '@mui/material';
import React from 'react';

const Footer = ({ lightMode }) => {
	const theme = useTheme();
	
	return (
		<Box elevation={1} sx={{
			background: lightMode ? theme.palette.primary.main : theme.palette.background.paper,
			borderRadius: '0px',
			width: "100%",
			height: "auto",
			paddingTop: "2rem",
			paddingBottom: "2rem",
		}}
		>
			<Container sx={{width: '100%'}}  >
				<Grid container direction='row' sx={{width: '50%', margin: 'auto'}} >
					<Grid item xs={6}>
						<Typography variant='h6' sx={{ fontFamily: theme.typography.light, color: theme.palette.text.secondary }} >
							Will Corona
						</Typography>
						<Typography variant='body1' >
							<Link target="_blank" href="https://www.linkedin.com/in/william-corona/" sx={{ fontFamily: theme.typography.light, color: theme.palette.text.secondary }} >
								<i style={{marginRight: '.5rem'}} className="fa-brands fa-linkedin"></i>
								LinkedIn
							</Link>
						</Typography>
						<Typography variant='body1' >
							<Link target="_blank" href="https://github.com/wcorona269" sx={{ fontFamily: theme.typography.light, color: theme.palette.text.secondary }} >
								<i style={{marginRight: '.5rem'}} className="fa-brands fa-square-github"></i>
								GitHub
							</Link>
						</Typography>
						<Typography variant='body1' >
							<Link target="_blank" href="https://will-corona.info/" sx={{ fontFamily: theme.typography.light, color: theme.palette.text.secondary }} >
								<i style={{marginRight: '.5rem'}} className="fa-solid fa-user"></i>
								Website
							</Link>
						</Typography>
					</Grid>
					<Grid item xs={6}>
						<Container>
							<Typography sx={{ fontFamily: theme.typography.light, color: theme.palette.text.secondary }} variant='h6'>
								About Me
							</Typography>
							<Typography sx={{ fontFamily: theme.typography.light, color: theme.palette.text.secondary }} variant='body1'>
								App Academy
							</Typography>
							<Typography sx={{ fontFamily: theme.typography.light, color: theme.palette.text.secondary }} variant='body1'>
								Soccer enjoyer
							</Typography>
							<Typography sx={{ fontFamily: theme.typography.light, color: theme.palette.text.secondary }} variant='body1'>
								Music enjoyer
							</Typography>
						</Container>
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

export default Footer