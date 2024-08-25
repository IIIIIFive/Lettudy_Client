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
import CreateNote from './pages/CreateNote';
import NoteView from './pages/NoteView';
import ScrollToTop from './components/common/ScrollToTop';

import { queryClient } from './api/queryClient';
import { QueryClientProvider } from '@tanstack/react-query';
import EditNote from './pages/EditNote';

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
        <ScrollToTop />
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
        path: '/room/:roomId',
        element: <StudyRoom />,
      },
      {
        path: '/mypage',
        element: <MyPage />,
      },
      {
        path: '/room/:roomId/links',
        element: <LinkManager />,
      },
      {
        path: '/room/:roomId/create-note',
        element: <CreateNote />,
      },
      {
        path: '/room/:roomId/notes',
        element: <NoteView />,
      },
      {
        path: '/room/:roomId/notes/:noteId',
        element: <EditNote />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />

        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
