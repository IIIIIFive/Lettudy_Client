import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { theme } from './styles/theme';
import HomePage from './pages/HomePage';
import Join from './pages/Join';
import Login from './pages/Login';
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
      {
        path: 'join',
        element: <Join />,
      },
      {
        path: 'login',
        element: <Login />,
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
