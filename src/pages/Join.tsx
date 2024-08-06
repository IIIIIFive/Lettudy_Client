import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import AuthBackground from '@/components/auth/AuthBackground';

export interface JoinProps {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

function Join() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<JoinProps>();
  const passwordRef = useRef<string | null>(null);
  passwordRef.current = watch('password');

  const onSubmit: SubmitHandler<JoinProps> = (data) => {
    console.log(data);
    alert('회원가입이 완료되었습니다.');
    navigate('/login');
  };

  const handleClick = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <AuthBackground>
      <JoinStyle>
        <img src='/assets/images/logo-withLettudy.png' alt='logo' height={55} />

        <div className='container'>
          <h2>회원가입</h2>
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
                        value: /^\S+@\S+$/i,
                        message: '이메일 주소를 다시 입력하세요.',
                      },
                    })}
                  />
                  <Button size='small' onClick={() => alert('중복확인')}>
                    중복확인
                  </Button>
                </div>
                {errors.email && (
                  <p className='error-text'>{errors.email.message}</p>
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .lettudy {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 20px;
    text-decoration: none;

    .title {
      overflow-wrap: break-word;
      font-weight: bold;
      font-size: ${({ theme }) => theme.fontSize_xl};
      line-height: 1.6;
      color: ${({ theme }) => theme.color_textBlack};
    }

    img {
      width: 35px;
      margin-bottom: 6px;
    }
  }

  .container {
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 15px;
    background: ${({ theme }) => theme.color_bgWhite};
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 550px;
    box-sizing: border-box;
    padding: 50px;
    margin-top: 30px;

    fieldset {
      border: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin-top: 40px;

      .error-text {
        color: ${({ theme }) => theme.color_textRed};
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
      }

      input {
        width: 100%;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 8px;
        outline: none;
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
