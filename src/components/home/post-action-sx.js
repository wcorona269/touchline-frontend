import { alpha } from '@mui/material';

// Shared by the comment / repost / like buttons: muted until hovered or active, then tinted with the action's color.
export const postActionSx = (theme, color, active = false) => ({
	borderRadius: 999,
	minWidth: 0,
	px: 1.25,
	py: 0.5,
	gap: 0.75,
	fontSize: 13,
	fontWeight: 600,
	fontVariantNumeric: 'tabular-nums',
	color: active ? color : theme.palette.text.secondary,
	'& svg': { fontSize: 19 },
	'&:hover': { color, backgroundColor: alpha(color, 0.12) },
});
