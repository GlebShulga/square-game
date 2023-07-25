import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './redux';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  expect(getByText(/game/i)).toBeInTheDocument();
});
