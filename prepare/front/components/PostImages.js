import React, {useState, useCallback} from 'react';
import {PlusOutlined} from '@ant-design/icons';
import ImagesZoom from './ImagesZoom';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  rigth: 0;
  bottom: 0;
`;

const Header = styled.header`
  header: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;
`;

const PostImages = ({images}) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);
  const onZoom = useCallback(() => {
    console.log('click');
    setShowImagesZoom(true);
  }, []);
  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <img role='presentation' src={images[0].src} alt={images[0].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <img role='presentation' style={{display: 'inline-block', width: '50%'}} src={images[0].src} alt={images[0].src} onClick={onZoom} />
        <img role='presentation' style={{display: 'inline-block', width: '50%'}} src={images[1].src} alt={images[1].src} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <div>
        <img role='presentation' width='50%' src={images[1].src} alt={images[1].src} onClick={onZoom} />
        <div role='presentation' style={{display: 'inline-block', width: '50%', textAlign: 'center', verticalAlign: 'middle'}} onClick={onZoom}>
          <PlusOutlined />
          <br />
          {images.length - 1}개의 사진 더보기
        </div>
      </div>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

// PostImages.propTypes = {
//   images: propTypes.arrayOf(propTypes.object),
// };
export default PostImages;
