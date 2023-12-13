import {
	FETCH_ALL_POSTS_SUCCESS,
	FETCH_ALL_POSTS_REQUEST,
	FETCH_ALL_POSTS_FAILURE,
	FETCH_USER_POSTS_SUCCESS,
	FETCH_USER_POSTS_REQUEST,
	FETCH_USER_POSTS_FAILURE,
	FETCH_POST_REQUEST,
	FETCH_POST_SUCCESS,
	FETCH_POST_FAILURE,
	CREATE_POST_REQUEST,
	CREATE_POST_SUCCESS,
	CREATE_POST_FAILURE
} from '../actions/post_actions'

import {
	CREATE_COMMENT_SUCCESS
} from '../actions/comment_actions'

const initialState = {
	isLoading: false,
	error: null,
	posts: {},
	post: {},
	total_pages: 1,
	current_page: 1, 
	total_posts: 0
};

const postsReducer = (state = initialState, action) => {
	Object.freeze(state);
	let nextState = Object.assign({}, state);
	switch (action.type) {
		case FETCH_ALL_POSTS_REQUEST:
		case FETCH_POST_REQUEST:
		case CREATE_POST_REQUEST:
			return { ...nextState, isLoading: true, error: null };
		case FETCH_ALL_POSTS_SUCCESS:
			const newPosts = action.payload['posts']
			return { ...nextState, 
				isLoading: false, 
				error: null, 
				posts: {
					...nextState.posts,
					...newPosts
				}, // Concatenate old and new posts
				total_pages: action.payload['total_pages'],
				current_page: action.payload['current_page'],
				total_posts: action.payload['total_posts'],
			};
		case CREATE_POST_SUCCESS:
			const createdPost = action.payload['post']
			return {
				...nextState,
				isLoading: false,
				error: null,
				posts: {
					...nextState.posts,
					[createdPost.id]: createdPost
				}
			}
		case CREATE_COMMENT_SUCCESS:
			const createdComment = action.payload['comment']
			const postComments = nextState.post.comments
			return {
				...nextState,
				post: {
					...nextState.post,
					comments: [
						createdComment,
						...postComments,
					]
				}
			}
		case FETCH_ALL_POSTS_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload, posts: null };
		case FETCH_USER_POSTS_REQUEST:
			return { ...nextState, isLoading: true, error: null};
		case FETCH_USER_POSTS_SUCCESS:
			return { ...nextState, isLoading: false, error: null, posts: action.payload['posts']
			};
		case FETCH_USER_POSTS_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload, posts: null }
		case FETCH_POST_SUCCESS:
			return { ...nextState, isLoading: false, error: null, post: action.payload['post'] }
		case FETCH_POST_FAILURE:
		case CREATE_POST_FAILURE:
			return { ...nextState, isLoading: false, error: action.payload, post: null }
		default:
			return nextState;
	}
}

export default postsReducer;