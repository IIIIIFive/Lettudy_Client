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

export const useAuth = () => {
  const navigate = useNavigate();
  const { storeLogin, storeLogout } = useAuthStore();

  const userLogin = async (data: LoginProps) => {
    try {
      const res = await login(data);
      storeLogin(res.token);
      alert('로그인이 완료되었습니다.');
      navigate('/');
    } catch (err) {
      console.error('Login error:', err);
      alert('로그인에 실패하였습니다.');
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
      alert('회원가입에 실패하였습니다.');
    }
  };

  const verifyEmail = async (email: string) => {
    try {
      const res = await checkEmail(email);
      alert(res.message);
      return true;
    } catch (err) {
      console.error('Email verification error:', err);
      alert('이미 존재하는 이메일입니다.');
      return false;
    }
  };

  const getMyPage = async () => {
    try {
      return await fetchMyPage();
    } catch (err) {
      console.error('Get MyPage error:', err);
      throw err;
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
      alert('회원 탈퇴에 실패하였습니다.');
    }
  };

  return { userLogin, userJoin, verifyEmail, getMyPage, userLogout, userQuit };
};
