import { JoinStyle } from './Join';
import AuthBackground from '@/components/auth/AuthBackground';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import { useAuth } from '@/hooks/useAuth';

export interface LoginProps {
  email: string;
  password: string;
}

function Login() {
  const { userLogin, loginError } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = (data) => {
    userLogin(data);
  };

  const handleClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <AuthBackground>
      <LoginStyle>
        <Link to='/'>
          <img
            src='/assets/images/logo-withLettudy.png'
            alt='logo'
            height={55}
          />
        </Link>
        <div className='container'>
          <h2>로그인</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <div className='form-group'>
                <label htmlFor='email'>이메일</label>
                <input
                  id='email'
                  type='text'
                  {...register('email', {
                    required: '이메일 및 비밀번호를 다시 입력해주세요.',
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: '이메일 및 비밀번호를 다시 입력해주세요.',
                    },
                  })}
                />
              </div>

              <div className='form-group'>
                <label htmlFor='password'>비밀번호</label>
                <input
                  id='password'
                  type='password'
                  {...register('password', {
                    required: '이메일 및 비밀번호를 다시 입력해주세요.',
                  })}
                />
                <div className='error-container'>
                  {(errors.email || errors.password || loginError) && (
                    <p className='error-text'>
                      이메일 및 비밀번호를 다시 입력해주세요.
                    </p>
                  )}
                </div>
              </div>

              <div className='login-button'>
                <Button type='submit' size='medium' onClick={handleClick}>
                  로그인
                </Button>
              </div>
              <div className='join-link'>
                아직 계정이 없으신가요?
                <span onClick={() => navigate('/join')}>가입하기</span>
              </div>
            </fieldset>
          </form>
        </div>
      </LoginStyle>
    </AuthBackground>
  );
}

export default Login;

export const LoginStyle = styled(JoinStyle)`
  .container {
    form {
      margin-top: 20px;
    }
    .error-container {
      min-height: 20px;
    }

    .error-text {
      text-align: center;
      margin-top: 12px;
    }

    .login-button {
      margin-top: 10px;
    }

    .join-link {
      margin-top: 10px;
      color: ${({ theme }) => theme.color_textGray};
      font-size: ${({ theme }) => theme.fontSize_xs};

      span {
        margin-left: 5px;
        color: ${({ theme }) => theme.color_key};
        cursor: pointer;
      }
    }
  }
`;
