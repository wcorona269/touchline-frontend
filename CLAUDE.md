# touchline_prod/frontend — Touchline web client

React frontend for Touchline. Redux Toolkit for state, MUI (`@mui/material`, `@mui/joy`,
`@mui/icons-material`) + Emotion for UI components, axios for API calls.

## Layout

- `src/components/` — feature-organized: home/posts timeline, clubs, leagues, matches, players,
  user profile.
- `src/store/` — Redux store/reducers (`store.js`).
- `src/actions/` — API call layer, incl. `axios_instance.js`.

`/Users/Will2/Desktop/touchline_soccer/client` was an earlier iteration of this same frontend; it
has been removed as a superseded duplicate — this folder is the only copy.

## Known performance hotspots (not yet fixed)

- **No code-splitting**: `App.js` eagerly imports every route/page, producing a single ~5.6MB JS
  bundle. No `React.lazy`/`Suspense` anywhere in `src`.
- Three overlapping date libraries installed (`moment`+`moment-timezone`, `date-fns`, `dayjs`) —
  redundant bundle weight; pick one.
- `redux-logger` middleware is wired into the store unconditionally (`src/store/store.js`),
  including production builds.
- **Missing memoization**: `posts-column.jsx` re-sorts the entire combined posts+reposts list on
  every fetch (no `useMemo`); `PostContainer` isn't wrapped in `React.memo` so every post
  re-renders on any feed update; one render branch is missing a stable `key` entirely, the other
  uses array index as key.
- No list virtualization (`react-window` etc.) anywhere — timelines, standings tables, and
  fixture lists render every row into the DOM regardless of length.
- No `loading="lazy"` on any `<img>` (team/club logos, player photos, avatars, ~25 usages).
