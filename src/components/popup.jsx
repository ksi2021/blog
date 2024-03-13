import React from 'react';
import { Button, Popconfirm, message } from 'antd';

export default function PopUP() {
  const confirm = () => {
    message.success('Task deleted');
  };

  const cancel = () => {
    message.error('Cancelled');
  };

  return (
    <div
      style={{
        width: 800,
        height: 800,
        marginRight: 'auto',
        marginLeft: 'auto',
        border: '1px solid red',
        padding: 20,
      }}
    >
      <Popconfirm
        title="Delete the task"
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
        <Button danger>Delete</Button>
      </Popconfirm>
    </div>
  );
}
