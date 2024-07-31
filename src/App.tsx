import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { theme } from './styles/theme';
import HomePage from './pages/HomePage';
import Join from './pages/Join';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/join',
    element: <Join />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: 'test',
    children: [
      { index: true, element: <div>test</div> },
      { path: 'nesting', element: <div>/test/nesting</div> },
    ],
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
