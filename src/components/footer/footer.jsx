import { Box, Container, Link, Typography, useTheme } from '@mui/material';
import React from 'react';

const links = [
	{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/william-corona/', icon: 'fa-brands fa-linkedin' },
	{ label: 'GitHub', href: 'https://github.com/wcorona269', icon: 'fa-brands fa-github' },
	{ label: 'Website', href: 'https://will-corona.info/', icon: 'fa-solid fa-globe' },
];

const Footer = () => {
	const theme = useTheme();

	return (
		<Box
			component='footer'
			sx={{
				borderTop: `1px solid ${theme.palette.divider}`,
				backgroundColor: theme.palette.background.default,
				py: 4,
				// Clear the fixed mobile tab bar.
				pb: { xs: 12, md: 4 },
			}}
		>
			<Container sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2 }}>
				<Box>
					<Typography sx={{ fontWeight: 800, letterSpacing: '-0.045em', fontSize: '1.25rem' }}>
						touchline<Box component='span' sx={{ color: theme.palette.primary.main }}>.</Box>
					</Typography>
					<Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
						Built by Will Corona · App Academy alum · soccer &amp; music enjoyer
					</Typography>
				</Box>
				<Box sx={{ display: 'flex', gap: 2.5 }}>
					{links.map(({ label, href, icon }) => (
						<Link
							key={label}
							href={href}
							target='_blank'
							rel='noopener noreferrer'
							underline='none'
							sx={{ display: 'flex', alignItems: 'center', gap: 0.75, fontSize: '0.9rem', fontWeight: 500, color: theme.palette.text.secondary, '&:hover': { color: theme.palette.primary.main } }}
						>
							<i className={icon} />
							{label}
						</Link>
					))}
				</Box>
			</Container>
		</Box>
	)
}

export default Footer
