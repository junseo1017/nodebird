import {Form, Input, Button} from 'antd';
import React, {useCallback, useEffect} from 'react';
import useInput from '../hooks/useInput';
import {useDispatch, useSelector} from 'react-redux';
import {ADD_COMMENT_REQUEST} from '../reducers/post';

const CommentForm = ({post}) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const {addCommentDone} = useSelector((state) => state.post);

  const [commentText, onChangeCommnetText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText, id);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {content: commentText, postId: post.id, userId: id},
    });
  }, [id, commentText]);

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={{position: 'relative', margin: 0}}>
        <Input.TextArea value={commentText} onChange={onChangeCommnetText} rows={4} />
        <Button style={{position: 'absolute', right: 0, bottom: -40}} type='primary' htmlType='submit'>
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
