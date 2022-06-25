import React, {useState, useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import {useDispatch, useSelector} from 'react-redux';
import {loginRequestAction} from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const {isLoggingIn} = useSelector((state) => state.user);
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    dispatch(loginRequestAction({id, password}));
  }, [id, password]);

  // const style = useMemo(()=>({marginTop:10}),[]) 이렇게 직접 jsx style을 넣어줄 수 있음

  return (
    <>
      <FormWrapper onFinish={onSubmitForm}>
        <div>
          <label htmlFor='user-id'>아이디</label>
          <br />
          <Input name='user-id' value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor='user-id'>비밀번호</label>
          <br />
          <Input name='user-id' value={password} onChange={onChangePassword} required />
        </div>
        <ButtonWrapper>
          <Button type='primary' htmlType='submit' loading={isLoggingIn}>
            로그인
          </Button>
          <Link href='/signup'>
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </ButtonWrapper>
      </FormWrapper>
    </>
  );
};

export default LoginForm;
