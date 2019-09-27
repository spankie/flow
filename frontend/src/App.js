import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, Input, Radio, Modal, List, Avatar, Button, Skeleton } from 'antd';

let FormInModal = Form.create({name: "form_in_modal"})(
  function (props) {
    const { getFieldDecorator } = props.form;
    return (
      <Form layout="vertical">
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input the title of collection!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description')(<Input type="textarea" />)}
        </Form.Item>
      </Form>    
    )
  }
)

function App() {
  let [initLoading, setInitLoading] = useState(false);
  let [list, setList] = useState([]);
  let [visibleModal, setVisibleModal] = useState(false);
  let [confirmLoading, setConfirmLoading] = useState(false);

  let showModal = () => {
    setVisibleModal(true);
  };

  let handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleModal(false);
      setConfirmLoading(false);
    }, 2000);
  };

  let handleCancel = () => {
    console.log('Clicked cancel button');
    setVisibleModal(false);
  };

  useEffect(() => {
    setList([{name: "Flow 1", description: "Description for flow 1"}]);
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <div style={{marginBottom: "1rem"}}>
          <Button onClick={showModal} type="primary" icon="plus">
            Add Flow
          </Button>
          <Modal
            title="Title"
            visible={visibleModal}
            onOk={handleOk}
            confirmLoading={confirmLoading}
            onCancel={handleCancel}
          >
            <FormInModal/> 
        </Modal>
      </div>
      <List
        className="demo-loadmore-list"
        bordered={true}
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<a key="list-loadmore-edit">edit</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={logo}/>
                }
                title={<a href="#!">{item.name}</a>}
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        )}
      />
      </header>
    </div>
  );
}

export default App;
