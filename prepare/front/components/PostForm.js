import React, {useCallback, useRef, useEffect} from 'react';
import {useInput} from '../hooks/useInput';
import {Form, Input, Button} from 'antd';
import {useDispatch, useSelector} from 'react-redux';
import {addPost} from '../reducers/post';

const PostForm = () => {
  const {imagePaths, addPostDone} = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const imageInput = useRef();
  const [text, onChangeText, setText] = useInput('');

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmit = useCallback(() => {
    dispatch(addPost(text));
  }, [text]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);
  return (
    <Form style={{margin: '10px 0 20px'}} encType='multpart/form-data' onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder='어떤 신기한 일이 있었나요?' />
      <div>
        <input type='file' multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type='primary' style={{float: 'right'}} htmlType='submit'>
          짹짹
        </Button>
      </div>
      <div>
        {imagePaths.map((e) => (
          <div key={e} style={{display: 'inline-block'}}>
            <img src={e} style={{width: '200px'}} alt={e} />
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
