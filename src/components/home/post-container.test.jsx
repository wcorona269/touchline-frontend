import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import PostContainer from './post-container';

const basePost = {
	id: 1,
	user_id: 7,
	username: 'alice',
	avatar_url: '',
	text: 'hello world',
	likes: [],
	comments: [],
	reposts: [],
	created_at: '2024-01-01 00:00:00',
};

function renderWithProviders(ui, { sessionUserId = null } = {}) {
	const store = configureStore({
		reducer: {
			session: (state = { user: sessionUserId ? { id: sessionUserId } : null }) => state,
		},
	});
	return render(
		<Provider store={store}>
			<MemoryRouter>{ui}</MemoryRouter>
		</Provider>
	);
}

describe('PostContainer', () => {
	it('renders the post author and text', () => {
		renderWithProviders(<PostContainer post={basePost} />);
		expect(screen.getByText('alice')).toBeInTheDocument();
		expect(screen.getByText('hello world')).toBeInTheDocument();
	});

	it('shows the "Reposted by" banner when a repost is passed', () => {
		const repost = { user: { username: 'bob' } };
		renderWithProviders(<PostContainer post={basePost} repost={repost} />);
		expect(screen.getByText(/Reposted by bob/)).toBeInTheDocument();
	});

	it('shows comment and like counts from the post', () => {
		const postWithEngagement = {
			...basePost,
			comments: [{ id: 1 }, { id: 2 }],
			likes: [{ id: 1, user_id: 99 }],
		};
		renderWithProviders(<PostContainer post={postWithEngagement} />);
		expect(screen.getByText('2')).toBeInTheDocument();
		expect(screen.getByText('1')).toBeInTheDocument();
	});
});
