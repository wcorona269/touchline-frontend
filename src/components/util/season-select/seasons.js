// European seasons start in late summer, so before July we're still in the season that began last year.
export const currentSeason = (now = new Date()) => (
	now.getMonth() >= 6 ? now.getFullYear() : now.getFullYear() - 1
);

export const recentSeasons = (count = 10) => {
	const latest = currentSeason();
	return Array.from({ length: count }, (_, i) => latest - i);
};

export const formatSeason = (season) => `${season}/${String((season + 1) % 100).padStart(2, '0')}`;
