import React from 'react';
import Link from 'next/link';

const PostCardContent = ({postData}) => {
  return (
    <div>
      {postData.split(/(#[^\s#]+)/g).map((e, i) => {
        if (e.match(/(#[^\s#]+)/g)) {
          return (
            <Link key={i} href={`/hashtag/${e.slice(1)}`}>
              <a>{e}</a>
            </Link>
          );
        }
        return e;
      })}
    </div>
  );
};

export default PostCardContent;
