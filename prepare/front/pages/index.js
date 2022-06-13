// next에서는 import React from 'react'를 쓸 필요 없음
// next에서 pages폴더의 이름은 무조건 pages여야함.
import React from 'react';
import AppLayout from '../components/AppLayout';

const Home = () => {
  return (
    <AppLayout>
      <div>hi.world</div>
    </AppLayout>
  );
};

export default Home;
