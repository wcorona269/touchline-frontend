import React from 'react';

// Renders a country flag via the flag-icons CSS sprite classes instead of
// react-world-flags, which embeds every country's SVG as a data URI directly
// in the JS bundle (~3.6MB). flag-icons only fetches the flag images actually
// rendered on the page, as regular static assets.
const CountryFlag = ({ code, height, width, style }) => {
	if (!code) return null;
	return (
		<span
			className={`fi fi-${code.toLowerCase()}`}
			style={{
				height: height ? `${height}px` : undefined,
				width: width ? `${width}px` : undefined,
				backgroundSize: 'cover',
				...style,
			}}
		/>
	);
};

export default CountryFlag;
