import React from 'react';

const DisplayTime = ({ match }) => {
	const formatTime = (timeString, userTimeZone) => {
		const date = new Date(timeString);
		const options = {
			hour: 'numeric',
			minute: 'numeric',
			hour12: true,
			timeZone: userTimeZone
		};

		const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
		return formattedTime;
	}

	const displayTime = (match) => {

		if (match.fixture.status.short === 'FT') {
			return <p>Final</p>
		}
		if (match.fixture.status.elapsed !== null) {
			return <p>{match.fixture.status.elapsed} '</p>
		}

		if (match.fixture.status.short === 'NS') {
			const timeString = match.fixture.date;
			const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
			const formattedTime = formatTime(timeString, userTimeZone);

			return (
				<p>
					{formattedTime}
				</p>
			)
		}

		return <p>{match.fixture.status.short}</p>
	}

	return (
		<>
			{displayTime(match)}
		</>
	)
}

export default DisplayTime;