import { combineReducers } from "redux";
import usersReducer from "./users_reducer";
import uiReducer from "./ui_reducer";
import sessionReducer from "./session_reducer";
import clubReducer from "./club_reducer";
import leaguesReducer from "./leagues_reducer";
import matchReducer from "./match_reducer";
import matchesReducer from "./matches_reducer";
import playerReducer from "./player_reducer";
import newsReducer from "./news_reducer";
import postsReducer from "./post_reducer";
import notificationsReducer from "./notifications_reducer";
import repostsReducer from "./repost_reducer";
import standingsReducer from "./standings_reducer";
import favoritesReducer from "./favorite_reducer";

const rootReducer = combineReducers({
	users: usersReducer,
	session: sessionReducer,
	ui: uiReducer,
	club: clubReducer,
	leagues: leaguesReducer,
	favorites: favoritesReducer,
	match: matchReducer,
	matches: matchesReducer,
	player: playerReducer,
	news: newsReducer,
	posts: postsReducer,
	reposts: repostsReducer,
	standings: standingsReducer,
	notifications: notificationsReducer
});

export default rootReducer;