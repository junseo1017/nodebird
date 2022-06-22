import React, {useState, useCallback} from 'react';
import PostImages from './PostImages';
import {Avatar, Button, Card, Popover, List, Comment} from 'antd';
import propTypes from 'prop-types';
import {RetweetOutlined, HeartOutlined, MessageOutlined, EllipsisOutlined, HeartTwoTone} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import CommentForm from './CommentForm';
import PostCardContent from './PostCardContent';

const PostCard = ({post}) => {
  const [liked, setLiked] = useState(false);
  const [commentFormOpened, setCommentFormOpened] = useState(false);
  const onToggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, []);

  const onToggleComment = useCallback(() => {
    setCommentFormOpened((prev) => !prev);
  }, []);
  const {me} = useSelector((state) => state.user);
  const id = me?.id;
  return (
    <div style={{marginBottom: 20}}>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key='retweet' />,
          liked ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onToggleLike} /> : <HeartOutlined key='heart' onClick={onToggleLike} />,
          <MessageOutlined onClick={onToggleComment} key='comment' />,
          <Popover
            key='ellipsis'
            content={
              <Button.Group>
                {id && post.User.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button type='danger'>삭제</Button>
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>
            }>
            <EllipsisOutlined />
          </Popover>,
        ]}>
        <Card.Meta avatar={<Avatar>{post.User.nickname[0]}</Avatar>} title={post.User.nickname} description={<PostCardContent postData={post.content} />} />
      </Card>
      {commentFormOpened && (
        <div>
          <CommentForm post={post} />
          <List
            header={`${post.Comments.length}개의 댓글`}
            itemLayout='horizontal'
            dataSource={post.Comments}
            renderItem={(item) => (
              <li>
                <Comment author={item.User.nickname} avatar={<Avatar>{item.User.nickname[0]}</Avatar>} content={item.content}></Comment>
              </li>
            )}
          />
        </div>
      )}
    </div>
  );
};

PostCard.propTypes = {
  post: propTypes.shape({
    id: propTypes.number,
    User: propTypes.object,
    content: propTypes.string,
    createdAt: propTypes.object,
    Comments: propTypes.arrayOf(propTypes.object),
    Images: propTypes.arrayOf(propTypes.object),
  }).isRequired,
};
export default PostCard;
