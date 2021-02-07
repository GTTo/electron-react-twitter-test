import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the company name', () => {
  render(<App />);
  const companyName = screen.getByText(/Axosoft/i);
  expect(companyName).toBeInTheDocument();
});
