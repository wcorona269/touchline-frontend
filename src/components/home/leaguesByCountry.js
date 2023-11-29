// List all relevant countries and leagues
// Leagues point to their corresponding League ID in the API-Football database
// Country Codes are ISO-3166-1 standard. Used with country-flag-icons npm package

const leaguesByCountry = {
	'China': {
		leagues: {
			'Super League': 169,
		},
		countryCode: 'CN'
	},
	'Saudi Arabia': {
		leagues: {
			'Pro League': 307,
		},
		countryCode: 'SA'
	},
	'Japan': {
		leagues: {
			'J1 League': 98,
			'J2 League': 99,
		},
		countryCode: 'JP'
	},
	'Argentina': {
		leagues: {
			'Liga Profesional Argentina': 128,
			'Primera Nacional': 129,
		},
		countryCode: 'AR'
	},
	'England': {
		leagues: {
			'Premier League': 39,
			'Championship': 40,
			'League One': 41
		},
		countryCode: 'GB'
	},
	'Spain': {
		leagues: {
			'La Liga': 140,
			'Segunda Division': 141
		},
		countryCode: 'ES'
	},
	'Brazil': {
		leagues: {
			'Serie A': 71,
		},
		countryCode: 'BR'
	},
	'Germany': {
		leagues: {
			'Bundesliga': 78,
			'2. Bundesliga': 79,
			'3. Liga': 80
		},
		countryCode: 'DE'
	},
	'Italy': {
		leagues: {
			'Serie A': 135,
			'Serie B': 136
		},
		countryCode: 'IT'
	},
	'France': {
		leagues: {
			'Ligue 1': 61,
			'Ligue 2': 62
		},
		countryCode: 'FR'
	},
	'Netherlands': {
		leagues: {
			'Eredivisie': 88,
			'Eerste Divisie': 89
		},
		countryCode: 'NL'
	},
	'Portugal': {
		leagues: {
			'Primeira Liga': 94,
			'Segunda Liga': 95
		},
		countryCode: 'PT'
	},
	'Scotland': {
		leagues: {
			'Scottish Premiership': 179,
			'Scottish Championship': 180,
		},
		countryCode: 'GB'
	},
	'Belgium': {
		leagues: {
			'Jupiler Pro League': 144,
			'Challenger Pro League': 145
		},
		countryCode: 'BE'
	},
	'Turkey': {
		leagues: {
			'Süper Lig': 203,
			'TFF 1. Lig': 204
		},
		countryCode: 'TR'
	},
	'Russia': {
		leagues: {
			'Russian Premier League': 235,
			'First League': 236
		},
		countryCode: 'RU'
	},
	'Ukraine': {
		leagues: {
			'Ukrainian Premier League': 333,
			'Persha Liga': 334
		},
		countryCode: 'UA'
	},
	'Switzerland': {
		leagues: {
			'Swiss Super League': 207,
			'Challenge League': 208
		},
		countryCode: 'CH'
	},
	'Austria': {
		leagues: {
			'Tipico Bundesliga': 218,
			'2. Liga': 219
		},
		countryCode: 'AT'
	},
	'Greece': {
		leagues: {
			'Super League 1': 197,
			'Football League': 198
		},
		countryCode: 'GR'
	},
	'Denmark': {
		leagues: {
			'Superliga': 119,
			'1. Division': 120
		},
		countryCode: 'DK'
	},
	'Sweden': {
		leagues: {
			'Allsvenskan': 113,
			'Superettan': 114
		},
		countryCode: 'SE'
	},
	'Norway': {
		leagues: {
			'Eliteserien': 103,
			'1. Division': 104
		},
		countryCode: 'NO'
	},
	'Croatia': {
		leagues: {
			'Prva HNL': 210,
			'First NL': 211
		},
		countryCode: 'HR'
	},
	'Poland': {
		leagues: {
			'Ekstraklasa': 106,
			'I Liga': 107
		},
		countryCode: 'PL'
	},
	'USA': {
		leagues: {
			'Major League Soccer': 253
		},
		countryCode: 'US'
	},
	'Mexico': {
		leagues: {
			'Liga MX': 262,
			'Liga de Expansión MX': 263
		},
		countryCode: 'MX'
	},
	'Europe': {
		leagues: {
			'UEFA Champions League': 2,
			'UEFA Europa League': 3,
			'UEFA Europa Conference League': 848
		},
		countryCode: 'EU'
	},
};


export default leaguesByCountry;