import React from 'react';
import Head from 'next/head';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowList from '../components/FollowList';

const Profile = () => {
  const followerList = [{nickname: '1111'}, {nickname: '2222'}, {nickname: '3333'}];
  const followingList = [{nickname: '6666'}, {nickname: '4444'}, {nickname: '5555'}];

  return (
    <>
      <Head>
        <title>내 프로필ㅣNodeBird</title>
      </Head>
      <AppLayout>
        <NicknameEditForm />
        <FollowList header='팔로잉 목록' data={followingList} />
        <FollowList header='팔로워 목록' data={followerList} />
      </AppLayout>
    </>
  );
};

export default Profile;
