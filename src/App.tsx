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
import HomepageLayout from './components/layout/HomepageLayout';
import MyPage from './pages/MyPage';

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
        <Header />
        <Outlet />
      </>
    ),
    children: [
      {
        index: true,
        element: (
          <HomepageLayout>
            <HomePage />
          </HomepageLayout>
        ),
      },
      {
        path: 'room',
        element: (
          <MainLayout>
            <StudyRoom />
          </MainLayout>
        ),
      },
      {
        path: '/mypage',
        element: <MyPage />,
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
