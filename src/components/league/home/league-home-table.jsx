import React, { useEffect, useState } from 'react'
import {Paper, Button, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import Title from '../../util/title-util';

const LeagueHomeTable = ({table}) => {
	const [showMore, setShowMore] = useState(false);

	useEffect(() => {
	}, [showMore])

	const handleChange = () => {
		setShowMore(!showMore)
	}

	const displayTable = (table) => {
		let result = [];
		let standings = table[0].league.standings[0];
		let table_size = !showMore ? 6 : standings.length;


		for (let i = 0; i < table_size; i++) {
			const logo = standings[i].team.logo;
			const team_id = standings[i].team.id;
			const team = standings[i].team.name;
			const played = standings[i].all.played;
			const points = standings[i].points;

			result.push(
				<TableRow key={i}>
					<TableCell component="th" scope="row">
						<Typography variant='body2' id='team-name'>
							<Link to={`/club/${team_id}`}>
								<img alt='' src={logo} />
								{team}
							</Link>
						</Typography>
					</TableCell>
					<TableCell align="center">{played}</TableCell>
					<TableCell align="center">{points}</TableCell>
				</TableRow>
			)
		}

		return result;
	}

	if (table[0].league.standings[0]?.team?.logo === undefined) {
		return;
	}

	
	return (
		<Paper className='home-paper' id='league-home-table' elevation={6}>
			<Title variant='h6' content='Table'/>
			<div
				style={{
					height: showMore ? '700px' : '250px',
					overflow: 'hidden',
					transition: 'height 0.3s ease-in-out',
					display: 'flex',
					alignItems: 'flex-start',
					justifyContent: 'center'
				}}
			>
				<TableContainer>
					<Table size='small' aria-label='a dense table'>
						<TableHead>
							<TableRow>
								<TableCell align='left'>Team</TableCell>
								<TableCell align='center'>MP</TableCell>
								<TableCell align='center'>P</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{displayTable(table)}
						</TableBody>
					</Table>
				</TableContainer>
			</div>
			<Button variant="outlined" startIcon={!showMore ? <ArrowDropDownIcon/> : <ArrowDropUpIcon/>} onClick={handleChange} className='show-more-button'>
				{!showMore ? 'Show More' : 'Show Less'}
			</Button>
		</Paper>
	)
}

export default LeagueHomeTable;