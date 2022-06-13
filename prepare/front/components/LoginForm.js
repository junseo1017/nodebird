import React, {useState, useCallback} from 'react';
import {Form, Input, Button} from 'antd';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  padding: 10px;
`;

const LoginForm = ({setIsLoggedIn}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onSubmitForm = useCallback(() => {
    setIsLoggedIn(true);
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
          <Button type='primary' htmlType='submit' loading={false}>
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

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
};

export default LoginForm;
