import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LoginProps } from '../pages/Login';
import {
  join,
  login,
  checkEmail,
  getMyPage as fetchMyPage,
  deleteUser as apiDeleteUser,
} from '../api/auth.api';
import { JoinProps } from '../pages/Join';
import { useState } from 'react';
import { requestPermission } from '@/firebase/requestPermission';

export const useAuth = () => {
  const navigate = useNavigate();
  const { storeLogin, storeLogout } = useAuthStore();
  const [loginError, setLoginError] = useState<string | null>(null);

  const userLogin = async (data: LoginProps) => {
    try {
      const res = await login(data);
      storeLogin(res.token);
      navigate('/');
      await requestPermission();
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('이메일 및 비밀번호를 다시 입력해주세요.');
    }
  };

  const userLogout = () => {
    storeLogout();
    navigate('/login');
  };

  const userJoin = async (data: JoinProps) => {
    try {
      const res = await join(data);
      console.log('Join response:', res);
      alert('회원가입이 완료되었습니다.');
      navigate('/login');
    } catch (err) {
      console.error('Join error:', err);
    }
  };

  const verifyEmail = async (email: string) => {
    try {
      await checkEmail(email);
      return true;
    } catch (err) {
      console.error('Email verification error:', err);
      return false;
    }
  };

  const getMyPage = async () => {
    try {
      return await fetchMyPage();
    } catch (err) {
      console.error('Get MyPage error:', err);
    }
  };

  const userQuit = async () => {
    try {
      await apiDeleteUser();
      storeLogout();
      alert('회원 탈퇴가 완료되었습니다.');
      navigate('/login');
    } catch (err) {
      console.error('Quit error:', err);
    }
  };

  return {
    loginError,
    userLogin,
    userJoin,
    verifyEmail,
    getMyPage,
    userLogout,
    userQuit,
  };
};
