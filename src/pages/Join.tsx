import { useRef, useState, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import AuthBackground from '@/components/auth/AuthBackground';
import { useAuth } from '../hooks/useAuth';

export interface JoinProps {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

function Join() {
  const { userJoin, verifyEmail } = useAuth();
  const [emailChecked, setEmailChecked] = useState<boolean | null>(null);
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinProps>({
    mode: 'onChange',
  });
  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'email') {
        const email = value.email;
        setEmailChecked(null);
        setIsEmailValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email ?? ''));
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const onSubmit: SubmitHandler<JoinProps> = (data) => {
    if (emailChecked) {
      userJoin(data);
    } else {
      alert('이메일 중복 확인을 먼저 해주세요.');
    }
  };

  const handleEmailCheck = async () => {
    const email = watch('email');
    if (!email) {
      return;
    }
    if (!isEmailValid) {
      return;
    }
    const isAvailable = await verifyEmail(email);
    setEmailChecked(isAvailable);
  };

  const handleClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <AuthBackground>
      <JoinStyle>
        <img src='/assets/images/logo-withLettudy.png' alt='logo' height={55} />

        <div className='container'>
          <h1>회원가입</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <fieldset>
              <div className='form-group'>
                <label htmlFor='name'>이름</label>
                <input
                  id='name'
                  type='text'
                  {...register('name', { required: '이름을 입력하세요.' })}
                />
                {errors.name && (
                  <p className='error-text'>{errors.name.message}</p>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='email'>이메일</label>
                <div className='email-form'>
                  <input
                    id='email'
                    type='text'
                    {...register('email', {
                      required: '이메일을 입력하세요.',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: '이메일 형식이 올바르지 않습니다.',
                      },
                    })}
                  />
                  <Button
                    type='button'
                    size='small'
                    onClick={handleEmailCheck}
                    disabled={!isEmailValid}>
                    중복확인
                  </Button>
                </div>
                {errors.email && (
                  <p className='error-text'>{errors.email.message}</p>
                )}
                {emailChecked === true && (
                  <p className='success-text'>사용 가능한 이메일입니다.</p>
                )}
                {emailChecked === false && !errors.email && (
                  <p className='error-text'>이미 사용 중인 이메일입니다.</p>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='password'>비밀번호</label>
                <input
                  id='password'
                  type='password'
                  {...register('password', {
                    required: '비밀번호를 입력하세요.',
                    validate: {
                      complexity: (value) =>
                        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
                          value,
                        ) ||
                        '비밀번호는 최소 8자 영문자, 숫자, 특수 문자를 포함해야 합니다.',
                    },
                  })}
                />
                {errors.password && (
                  <p className='error-text'>{errors.password.message}</p>
                )}
              </div>

              <div className='form-group'>
                <label htmlFor='passwordCheck'>비밀번호 확인</label>
                <input
                  id='passwordCheck'
                  type='password'
                  {...register('passwordCheck', {
                    required: '비밀번호 확인은 필수입니다.',
                    validate: (value) =>
                      value === passwordRef.current ||
                      '비밀번호가 일치하지 않습니다.',
                  })}
                />
                {errors.passwordCheck && (
                  <p className='error-text'>{errors.passwordCheck.message}</p>
                )}
              </div>
              <div className='join-button'>
                <Button size='medium' onClick={handleClick}>
                  회원가입
                </Button>
              </div>
            </fieldset>
          </form>
        </div>
      </JoinStyle>
    </AuthBackground>
  );
}

export default Join;

export const JoinStyle = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .container {
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    background: ${({ theme }) => theme.color_bgWhite};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 550px;
    box-sizing: border-box;
    padding: 50px;
    margin-top: 70px;

    fieldset {
      border: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-top: 40px;
      gap: 5px;

      .error-text {
        color: ${({ theme }) => theme.color_textRed};
        font-size: ${({ theme }) => theme.fontSize_xxs};
        margin-top: 5px;
      }

      .success-text {
        color: ${({ theme }) => theme.color_keyBlue};
        font-size: ${({ theme }) => theme.fontSize_xxs};
        margin-top: 5px;
      }
    }

    .form-group {
      width: 400px;
      display: flex;
      flex-direction: column;
      margin-bottom: 16px;

      label {
        margin-bottom: 10px;
        color: ${({ theme }) => theme.color_textKey};
        font-size: ${({ theme }) => theme.fontSize_sm};
        font-weight: 500;
      }

      input {
        width: 100%;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 8px;
        outline: none;
        font-size: ${({ theme }) => theme.fontSize_sm};
      }

      .email-form {
        display: flex;
        align-items: center;
        gap: 10px;
        width: 100%;

        input {
          flex: 1;
        }

        button {
          flex-shrink: 1;
        }
      }
    }

    .join-button {
      margin-top: 15px;
    }
  }
`;
