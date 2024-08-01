import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { theme } from './styles/theme';
import HomePage from './pages/HomePage';
import Header from './components/common/Header';
import MainLayout from './components/layout/MainLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <Header />
        <MainLayout>
          <Outlet />
        </MainLayout>
      </>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
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
