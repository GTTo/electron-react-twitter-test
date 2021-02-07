import { render, screen, fireEvent } from '@testing-library/react';
import Feed from './Feed';

test('renders title for the feed', () => {
  render(<Feed />);
  const feedTitle = screen.getByText(/The feed from/i);
  expect(feedTitle).toBeInTheDocument();
});

test('renders input for the default username', () => {
  render(<Feed />);
  expect(screen.getByRole('textbox', { name: 'The feed from:' })).toHaveValue('twitterdev');
});

test('renders input for other username', () => {
  render(<Feed />);
  const input = screen.getByRole('textbox', { name: 'The feed from:' });
  fireEvent.change(input, { target: { value: 'cesarbevia' } });
  
  expect(screen.getByRole('textbox', { name: 'The feed from:' })).toHaveValue('cesarbevia');
});

test('renders No tweets because there is no mock for feed', () => {
  render(<Feed />);
  const feedContent = screen.getByText(/No recent tweets found/i);
  expect(feedContent).toBeInTheDocument();
});
