import React, { useState } from 'react'
import { Button, Paper } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Title from '../../util/title-util';
import StandingsTable from '../standings-table';

const PREVIEW_ROWS = 8;

const LeagueHomeTable = ({ table }) => {
	const [showMore, setShowMore] = useState(false);
	const rows = table?.[0]?.league?.standings?.[0];

	if (!rows?.length) return null;

	return (
		<Paper sx={{ marginBottom: 2 }}>
			<Title variant='h6' content='Table' />
			<StandingsTable rows={rows} compact limit={showMore ? undefined : PREVIEW_ROWS} />
			{rows.length > PREVIEW_ROWS && (
				<Button
					fullWidth
					onClick={() => setShowMore(!showMore)}
					endIcon={showMore ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					sx={{ borderRadius: 0, py: 1.25, color: 'text.secondary' }}
				>
					{showMore ? 'Show less' : 'Full table'}
				</Button>
			)}
		</Paper>
	)
}

export default LeagueHomeTable;
