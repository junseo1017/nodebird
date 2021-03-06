import React from 'react';
import PropTypes from 'prop-types'; // props를 넘기게 되는 경우, prop-types로 검사해줘야함 typescript라면 필요없음
import Link from 'next/link'; // router의 link
import {Menu, Input, Row, Col} from 'antd';
import UserProfile from './UserProfile';
import LoginForm from './LoginForm';
import styled from 'styled-components';
import {useSelector} from 'react-redux';
import {createGlobalStyle} from 'styled-components';

// GUTTER 없애기
const Global = createGlobalStyle`
.ant-row {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.ant-col:first-child {
  padding-left: 0 !important
}

.ant-col:last-child {
  padding-right: 0 !important
}
`;

const SearchInput = styled(Input.Search)`
  vertical-align: 'middle';
`;

const items = [
  {
    label: (
      <Link href='/'>
        <a>노드버드</a>
      </Link>
    ),
    key: 'title',
  },
  {
    label: (
      <Link href='/profile'>
        <a>프로필</a>
      </Link>
    ),
    key: 'profile',
  },
  {
    label: <SearchInput />,
    key: 'search',
  },
  {
    label: (
      <Link href='/signup'>
        <a>회원가입</a>
      </Link>
    ),
    key: 'signup',
  },
];

const AppLayout = ({children}) => {
  const {logInDone} = useSelector((state) => state.user);
  return (
    <div>
      <Global />
      <Menu mode='horizontal' items={items} />
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {logInDone ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a href='https://naver.com' target='blank' rel='noreferrer noopener'>
            Made by Junseo
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
