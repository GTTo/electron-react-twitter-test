import { render, screen } from '@testing-library/react';
import Tweet from './Tweet';

test('renders title for the feed', () => {
  render(<Tweet text='a test text for tweeting' date='06/02/2021'/>);
  const text = screen.getByText(/a test text for tweeting/i);
  expect(text).toBeInTheDocument();
  const date = screen.getByText(new Date('06/02/2021').toLocaleDateString());
  expect(date).toBeInTheDocument();
});
