import React from 'react'
import YellowCard from '../../../images/yellow.png';
import RedCard from '../../../images/red.png';
import NoDataMessage from '../../util/no-data/no-data-message';
import { alpha, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import Title from '../../util/title-util';

const EventsTimeline = ({match, header }) => {
	const theme = useTheme();
	const events = match?.events;
	const homeTeam = match?.teams?.home?.name;

	let periods = 0;

	const determineEventImage = (event) => {
		if (event.type === 'Goal') {
			if (event.detail === 'Penalty') return [<SportsSoccerIcon size='small' sx={{color: theme.palette.success.light }} />, '(PK)' ]
			if (event.detail.includes('Normal')) return <SportsSoccerIcon size='small' />
			if (event.detail.includes('Own')) return [<SportsSoccerIcon size='small' sx={{ color: theme.palette.error.main }} />, 'OG']
			if (event.detail.includes('Missed')) return [<SportsSoccerIcon size='small' />, <CancelOutlinedIcon size='small'/> ]
		} else if (event.type === 'Card') {
			return (event.detail.includes('Yellow')) ? <img alt='yellow card' src={YellowCard} style={{ height: '1.25rem', width: '1rem', marginBottom: 'auto', marginTop: 'auto' }} /> :
			<img alt='red card' src={RedCard} style={{ height: '1.25rem', width: '1rem', marginBottom: 'auto', marginTop: 'auto' }} />
		} else if (event.type === 'subst' || event.type === 'Subst') {
			return <SwapHorizIcon size='small' />
		} else if (event.type === 'Var' || event.type === 'var') {
			return (event.detail === 'Goal cancelled') ? <CancelOutlinedIcon size='small' /> : 
			<CheckCircleOutlineOutlinedIcon size='small' />
		}
	}
	
	const determineNewPeriods = (elapsed, extraTime) => {
		let message;

		if (periods === 0) {
			periods += 1;
			message = 'First Half'
		} else if (periods === 1 && elapsed > 45 && extraTime === null) {
			periods += 1
			message = 'Second Half'
		} else if (periods === 2 && elapsed > 90 && extraTime === null) {
			periods += 1
			message = 'First Half ET'
		} else if (periods === 3 && elapsed > 105 && extraTime === null) {
			periods += 1
			message = 'Second Half ET'
		}
		
		return message === undefined ? '' : (
			<TableRow>
				<TableCell sx={{ py: 1, borderBottom: 'none', backgroundColor: theme.palette.action.hover }}>
					<Typography variant='caption' component='div' sx={{ color: theme.palette.text.secondary, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'center' }}>
						{message}
					</Typography>
				</TableCell>
			</TableRow>
		)
	}

	return (
		<Paper>
			<Title variant='h6' content='Match Timeline'/>
			{
				!events.length ? <NoDataMessage/> :
				<>
					{header}
				<TableContainer>
					<Table size='small' aria-label='a dense table' >
						<TableBody>
							{events.map((event, idx) => {
								const isHome = event.team.name === homeTeam;
								const elapsed = event.time.elapsed;
								const extraTime = event.time.extra;
								const player = event.player.name || 'N/A';
								const assist = event.assist.name || '';
								const isGoal = event.type === 'Goal' && !event.detail.includes('Missed');

								return (
									<>
										{determineNewPeriods(elapsed, extraTime)}
										<TableRow key={idx} sx={{ backgroundColor: isGoal ? alpha(theme.palette.primary.main, 0.07) : 'transparent' }}>
											<TableCell sx={{ px: 2, py: 1.25, display: 'flex', flexDirection: isHome ? 'row' : 'row-reverse', alignItems: 'center', gap: 1.25, '& svg': { fontSize: 20 } }}>
												<Typography variant='body2' sx={{ fontWeight: 700, color: theme.palette.text.secondary, minWidth: 40, textAlign: isHome ? 'left' : 'right', fontVariantNumeric: 'tabular-nums' }}>
													{extraTime === null ? `${elapsed}'` : `${elapsed}+${extraTime}'`}
												</Typography>
												{determineEventImage(event)}
												<Typography variant='body1' sx={{ fontWeight: isGoal ? 700 : 500 }} >
													{player}
												</Typography>
												<Typography variant='body2' sx={{ color: theme.palette.text.secondary }}>
													{assist}
												</Typography>
											</TableCell>
										</TableRow>
									</>
								)
							})}
						</TableBody>
					</Table>
				</TableContainer>
				</>
			}
		</Paper>
	)
}

export default EventsTimeline;