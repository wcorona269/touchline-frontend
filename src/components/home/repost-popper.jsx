import React, { useState, forwardRef, useEffect } from 'react';
import RepeatIcon from '@mui/icons-material/Repeat';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import { useSpring, animated } from '@react-spring/web';
import { Button, useTheme } from '@mui/material';

const Fade = forwardRef(function Fade(props, ref) {
	const { in: open, children, onEnter, onExited, ...other } = props;
	const style = useSpring({
		from: { opacity: 0 },
		to: { opacity: open ? 1 : 0 },
		onStart: () => {
			if (open && onEnter) {
				onEnter();
			}
		},
		onRest: () => {
			if (!open && onExited) {
				onExited();
			}
		},
	});

	return (
		<animated.div ref={ref} style={style} {...other}>
			{children}
		</animated.div>
	);
});

Fade.propTypes = {
	children: PropTypes.element,
	in: PropTypes.bool,
	onEnter: PropTypes.func,
	onExited: PropTypes.func,
};

const RepostButton = ({ handleRepost, reposts, isReposted, setIsReposted, user_id, post }) => {
	const theme = useTheme()
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	useEffect(() => {
		if (!post?.reposts) return;
		for (let repost of post?.reposts) {
			if (repost.id === user_id) {
				setIsReposted(true)
			}
		}
	}, [])

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
		setOpen((previousOpen) => !previousOpen);
	};

	const canBeOpen = open && Boolean(anchorEl);
	const id = canBeOpen ? 'spring-popper' : undefined;

	return (
		<div>
			<Button aria-describedby={id} type="button" onClick={handleClick} aria-label="favorite" size="large" sx={{ borderRadius: '1rem', width: 'fit-content', color: isReposted ? theme.palette.primary.main : theme.palette.grey['700'] }} >
				<RepeatIcon sx={{ marginRight: '.25rem' }} fontSize='medium' />
				{reposts}
			</Button>
			<Popper id={id} open={open} anchorEl={anchorEl} transition onMouseLeave={() => setOpen(false)}>
				{({ TransitionProps }) => (
					<Fade {...TransitionProps}>
						<Box>
							<Button onClick={() => handleRepost()} sx={{ border: 1, p: 1, px: 2, bgcolor: 'background.paper' }}>
								{ isReposted ? 'Undo Repost' : 'Repost' }
							</Button>
						</Box>
					</Fade>
				)}
			</Popper>
		</div>
	);
}

export default RepostButton;