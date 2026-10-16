import { alpha, createTheme } from '@mui/material';

const FONT = "'Inter Variable', 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

const buildTheme = (lightMode) => {
	const mode = lightMode ? 'light' : 'dark';
	const background = lightMode ? '#F4F6F5' : '#0A0D0C';
	const paper = lightMode ? '#FFFFFF' : '#121716';
	const divider = lightMode ? 'rgba(10, 20, 16, 0.08)' : 'rgba(255, 255, 255, 0.07)';
	const primary = lightMode ? '#00A672' : '#00D68F';

	return createTheme({
		palette: {
			mode,
			primary: {
				main: primary,
				light: '#3DF0B0',
				dark: '#00895D',
				darker: '#0F2A20',
				contrastText: '#03130C',
			},
			secondary: {
				main: '#3BB8F0',
				light: '#84d6f0',
				dark: '#005c8f',
			},
			background: {
				default: background,
				paper,
				standard: background,
			},
			text: lightMode ? {
				primary: '#0D1512',
				secondary: 'rgba(13, 21, 18, 0.64)',
				disabled: 'rgba(13, 21, 18, 0.42)',
			} : {
				primary: '#ECF1EF',
				secondary: 'rgba(236, 241, 239, 0.64)',
				disabled: 'rgba(236, 241, 239, 0.40)',
			},
			divider,
			action: {
				hover: lightMode ? 'rgba(10, 20, 16, 0.04)' : 'rgba(255, 255, 255, 0.045)',
			},
		},
		shape: {
			borderRadius: 12,
		},
		typography: {
			fontFamily: FONT,
			h1: { fontWeight: 800, letterSpacing: '-0.04em' },
			h2: { fontWeight: 800, letterSpacing: '-0.035em' },
			h3: { fontWeight: 700, letterSpacing: '-0.03em' },
			h4: { fontWeight: 700, letterSpacing: '-0.025em' },
			h5: { fontWeight: 700, letterSpacing: '-0.02em' },
			h6: { fontWeight: 600, letterSpacing: '-0.015em' },
			subtitle1: { fontWeight: 600 },
			button: { fontWeight: 600, textTransform: 'none', letterSpacing: 0 },
			body1: { fontSize: '0.95rem', lineHeight: 1.55 },
		},
		components: {
			MuiCssBaseline: {
				styleOverrides: { body: { backgroundColor: background } },
			},
			MuiPaper: {
				defaultProps: { elevation: 0 },
				styleOverrides: {
					root: {
						backgroundImage: 'none',
					},
					rounded: {
						borderRadius: 16,
						border: `1px solid ${divider}`,
						overflow: 'hidden',
					},
				},
			},
			MuiCard: {
				defaultProps: { elevation: 0 },
			},
			MuiAppBar: {
				defaultProps: { elevation: 0, color: 'transparent' },
				styleOverrides: {
					root: {
						backgroundColor: alpha(background, 0.72),
						backdropFilter: 'saturate(180%) blur(16px)',
						WebkitBackdropFilter: 'saturate(180%) blur(16px)',
						borderBottom: `1px solid ${divider}`,
						borderRadius: 0,
					},
				},
			},
			MuiButton: {
				defaultProps: { disableElevation: true },
				styleOverrides: {
					root: { borderRadius: 999, paddingInline: 18 },
					containedPrimary: {
						'&:hover': { backgroundColor: lightMode ? '#00895D' : '#3DF0B0' },
					},
					outlined: { borderColor: divider },
				},
			},
			MuiIconButton: {
				styleOverrides: { root: { borderRadius: 10 } },
			},
			MuiListItemButton: {
				styleOverrides: { root: { borderRadius: 12 } },
			},
			MuiOutlinedInput: {
				styleOverrides: {
					root: {
						borderRadius: 12,
						backgroundColor: lightMode ? 'rgba(10, 20, 16, 0.03)' : 'rgba(255, 255, 255, 0.03)',
						'& .MuiOutlinedInput-notchedOutline': { borderColor: divider },
						'&:hover .MuiOutlinedInput-notchedOutline': { borderColor: alpha(primary, 0.5) },
					},
				},
			},
			MuiTab: {
				styleOverrides: { root: { textTransform: 'none', fontWeight: 600, fontSize: '0.95rem' } },
			},
			MuiTableCell: {
				styleOverrides: { root: { borderColor: divider } },
			},
			MuiChip: {
				styleOverrides: { root: { fontWeight: 600 } },
			},
			MuiDivider: {
				styleOverrides: { root: { borderColor: divider } },
			},
			MuiMenu: {
				styleOverrides: {
					paper: {
						border: `1px solid ${divider}`,
						backgroundColor: paper,
					},
				},
			},
			MuiTooltip: {
				styleOverrides: { tooltip: { borderRadius: 8, fontWeight: 500 } },
			},
			MuiSkeleton: {
				styleOverrides: { root: { borderRadius: 10 } },
			},
			MuiBadge: {
				styleOverrides: { badge: { fontWeight: 700 } },
			},
		},
	});
};

export default buildTheme;
