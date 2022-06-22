// next에서는 import React from 'react'를 쓸 필요 없음
// next에서 pages폴더의 이름은 무조건 pages여야함.
import React from 'react';
import {useSelector} from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

const Home = () => {
  const {isLoggedIn} = useSelector((state) => state.user);
  const {mainPost} = useSelector((state) => state.post);
  return (
    <AppLayout>
      {isLoggedIn && <PostForm />}
      {mainPost.map((e) => (
        <PostCard key={e.id} post={e} />
      ))}
    </AppLayout>
  );
};

export default Home;
