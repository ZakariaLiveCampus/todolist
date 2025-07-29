import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('affiche la page liste des tâches', () => {
    render(<App />);
    expect(screen.getByText(/Liste des tâches/i)).toBeInTheDocument();
  });
});
