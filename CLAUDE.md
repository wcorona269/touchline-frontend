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

## Performance pass (done)

- Route-based code-splitting via `React.lazy`/`Suspense` in `App.js` — initial bundle dropped
  from ~1.57MB to ~187KB gzipped; each page now loads as its own chunk.
- `redux-logger` only loads in development (`src/store/store.js`), moved to devDependencies.
- Removed the unused `date-fns` dependency (never imported; `dayjs` stays as the MUI
  x-date-pickers adapter, `moment`/`moment-timezone` stay for actual date formatting).
- `posts-column.jsx` sort is memoized (`useMemo`), `PostContainer` wrapped in `React.memo`,
  stable `post-`/`repost-` prefixed keys instead of array index.
- `loading="lazy"` added to below-the-fold images (logos, squad photos, news images); left
  above-the-fold header icons eager.
- `user-show-page.jsx` (profile posts/reposts/likes tabs) now has a "See More" button per tab
  that fetches the next page from the backend's new pagination (`fetchMoreUserPosts`/
  `fetchMoreUserReposts`/`fetchMoreUserLikes` in `src/actions/user_actions.js`) and merges it into
  state, matching the merge pattern already used for the home timeline in `post_reducer.js`.

## Still unbounded (low risk, left as-is)

- No list virtualization (`react-window` etc.) — timelines, standings tables, and fixture lists
  still render every loaded row into the DOM. Lower priority since lists are already paginated/
  "load more"-gated rather than loading unbounded data up front.
- `my-favorites.jsx` renders `state.favorites.favorites` as a flat, untruncated chip list — left
  alone since favorites are a small, user-curated list in practice.
