import { render, screen } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
});

test('loads saved tasks from localStorage instead of overwriting them', () => {
  localStorage.setItem(
    'react-task-manager-tasks',
    JSON.stringify([
      {
        id: 1,
        text: 'Saved task',
        category: 'Personal',
        completed: false,
        createdAt: '2026-01-01T00:00:00.000Z',
      },
    ])
  );

  render(<App />);

  expect(screen.getByText('Saved task')).toBeInTheDocument();
});
