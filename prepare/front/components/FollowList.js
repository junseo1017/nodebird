import React from 'react';
import {Button, Card, List} from 'antd';
import {StopOutlined} from '@ant-design/icons';
import PropTypes from 'prop-types';

const FollowList = ({header, data}) => {
  // 객체로 들어간 내용 다 최적화 시켜야 함. 매번 렌더링됨.
  return (
    <List
      style={{marginBottom: 20}}
      grid={{gutter: 4, xs: 2, md: 3}}
      size='small'
      loadMore={
        <div style={{textAlign: 'center', margin: '10px 0'}}>
          <Button>더 보기</Button>
        </div>
      }
      header={<div>{header}</div>}
      bordered
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{marginTop: '20px'}}>
          <Card actions={[<StopOutlined key='stop' />]}>
            <Card.Meta description={item.nickname} />
          </Card>
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;
