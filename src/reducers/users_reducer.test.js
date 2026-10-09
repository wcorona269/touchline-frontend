import usersReducer from './users_reducer';
import {
	FETCH_USER_INFO_REQUEST,
	FETCH_USER_INFO_SUCCESS,
	FETCH_MORE_USER_POSTS_SUCCESS,
	FETCH_MORE_USER_REPOSTS_SUCCESS,
	FETCH_MORE_USER_LIKES_SUCCESS,
	UPDATE_AVATAR_SUCCESS,
} from '../actions/user_actions';

const initialUser = {
	username: 'alice',
	posts: { 1: { id: 1, text: 'first' } },
	posts_total_pages: 2,
	posts_current_page: 1,
	reposts: {},
	reposts_total_pages: 0,
	reposts_current_page: 1,
	likes: {},
	likes_total_pages: 0,
	likes_current_page: 1,
};

describe('usersReducer', () => {
	it('replaces the whole user on FETCH_USER_INFO_SUCCESS', () => {
		const state = { user: null, isLoading: true, error: null };
		const next = usersReducer(state, {
			type: FETCH_USER_INFO_SUCCESS,
			payload: { user: initialUser },
		});
		expect(next.user).toEqual(initialUser);
		expect(next.isLoading).toBe(false);
	});

	it('sets isLoading on FETCH_USER_INFO_REQUEST', () => {
		const state = { user: null, isLoading: false, error: null };
		const next = usersReducer(state, { type: FETCH_USER_INFO_REQUEST });
		expect(next.isLoading).toBe(true);
	});

	it('merges a new page of posts into existing posts on FETCH_MORE_USER_POSTS_SUCCESS', () => {
		const state = { user: initialUser, isLoading: false, error: null };
		const next = usersReducer(state, {
			type: FETCH_MORE_USER_POSTS_SUCCESS,
			payload: {
				posts: { 2: { id: 2, text: 'second' } },
				posts_total_pages: 2,
				posts_current_page: 2,
			},
		});
		// old page-1 post is preserved, new page-2 post is added
		expect(next.user.posts).toEqual({
			1: { id: 1, text: 'first' },
			2: { id: 2, text: 'second' },
		});
		expect(next.user.posts_current_page).toBe(2);
		// reposts/likes from the same user-info payload are untouched
		expect(next.user.reposts).toEqual({});
	});

	it('merges a new page of reposts without touching posts', () => {
		const state = { user: initialUser, isLoading: false, error: null };
		const next = usersReducer(state, {
			type: FETCH_MORE_USER_REPOSTS_SUCCESS,
			payload: {
				reposts: { 5: { id: 5 } },
				reposts_total_pages: 1,
				reposts_current_page: 1,
			},
		});
		expect(next.user.reposts).toEqual({ 5: { id: 5 } });
		expect(next.user.posts).toEqual(initialUser.posts);
	});

	it('merges a new page of likes without touching posts/reposts', () => {
		const state = { user: initialUser, isLoading: false, error: null };
		const next = usersReducer(state, {
			type: FETCH_MORE_USER_LIKES_SUCCESS,
			payload: {
				likes: { 9: { id: 9 } },
				likes_total_pages: 1,
				likes_current_page: 1,
			},
		});
		expect(next.user.likes).toEqual({ 9: { id: 9 } });
		expect(next.user.posts).toEqual(initialUser.posts);
	});

	it('replaces the user with user_info on UPDATE_AVATAR_SUCCESS', () => {
		const state = { user: initialUser, isLoading: true, error: null };
		const updated = { ...initialUser, avatar_url: 'http://example.com/a.png' };
		const next = usersReducer(state, {
			type: UPDATE_AVATAR_SUCCESS,
			payload: { user_info: updated },
		});
		expect(next.user.avatar_url).toBe('http://example.com/a.png');
		expect(next.isLoading).toBe(false);
	});
});
