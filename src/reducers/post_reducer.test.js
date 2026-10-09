import postsReducer from './post_reducer';
import {
	FETCH_ALL_POSTS_SUCCESS,
	CREATE_POST_SUCCESS,
	DELETE_POST_SUCCESS,
} from '../actions/post_actions';

describe('postsReducer', () => {
	it('merges a new page of posts into existing posts', () => {
		const state = {
			isLoading: false,
			error: null,
			posts: { 1: { id: 1, text: 'first' } },
			post: {},
			total_pages: 2,
			current_page: 1,
			total_posts: 15,
		};
		const next = postsReducer(state, {
			type: FETCH_ALL_POSTS_SUCCESS,
			payload: {
				posts: { 2: { id: 2, text: 'second' } },
				total_pages: 2,
				current_page: 2,
				total_posts: 15,
			},
		});
		expect(next.posts).toEqual({
			1: { id: 1, text: 'first' },
			2: { id: 2, text: 'second' },
		});
		expect(next.current_page).toBe(2);
	});

	it('adds a newly created post to the posts map', () => {
		const state = { isLoading: false, error: null, posts: {}, post: {} };
		const next = postsReducer(state, {
			type: CREATE_POST_SUCCESS,
			payload: { post: { id: 42, text: 'new post' } },
		});
		expect(next.posts[42]).toEqual({ id: 42, text: 'new post' });
	});

	it('removes a deleted post from the posts map', () => {
		const state = {
			isLoading: false,
			error: null,
			posts: { 1: { id: 1 }, 2: { id: 2 } },
			post: { id: 1 },
		};
		const next = postsReducer(state, {
			type: DELETE_POST_SUCCESS,
			payload: { postId: '1' },
		});
		expect(next.posts).toEqual({ 2: { id: 2 } });
		expect(next.post).toBeNull();
	});
});
