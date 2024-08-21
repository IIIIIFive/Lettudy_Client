import { useEffect, useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { User } from '@/model/user.model';
import { useNavigate } from 'react-router-dom';
import { getMyPage } from '../api/auth.api';

export function useUserData() {
  const [user, setUser] = useState<User | null>(null);
  const { isLoggedIn } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login');
    } else if (user === null) {
      const fetchUserData = async () => {
        try {
          const userData = await getMyPage();
          if (userData) {
            setUser(userData);
          } else {
            navigate('/login');
          }
        } catch (err) {
          console.error('마이페이지 오류가 발생했습니다.');
          navigate('/login');
        }
      };
      fetchUserData();
    }
  }, [isLoggedIn, navigate, user]);

  return { user, setUser };
}
