import { GlobalStyle } from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { theme } from './styles/theme';
import HomePage from './pages/HomePage';
import Join from './pages/Join';
import Login from './pages/Login';
import Header from './components/common/Header';
import MainLayout from './components/layout/MainLayout';
import StudyRoom from './pages/StudyRoom';
import MyPage from './pages/MyPage';
import LinkManager from './pages/LinkManager';
import Modals from './components/common/modals/Modals';

const router = createBrowserRouter([
  {
    path: 'join',
    element: <Join />,
  },

  {
    path: 'login',
    element: <Login />,
  },

  {
    path: '/',
    element: (
      <>
        <Modals />
        <MainLayout>
          <Header />
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
        path: '/room',
        element: <StudyRoom />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/room/links',
        element: <LinkManager />,
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
