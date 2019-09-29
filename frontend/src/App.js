import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Form, message, Input, Modal, List, Avatar, Button, Skeleton } from 'antd';
import {Link} from "react-router-dom";
const axios = require('axios').default;

let MyForm = Form.create({name: "form_in_modal"})(
  function (props) {
    const { form: {getFieldDecorator}  } = props;
    return (
    <Form layout="vertical" >
      <Form.Item label="Name">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input the name of the flow!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Description">
        {getFieldDecorator('description')(<Input type="textarea" />)}
      </Form.Item>
    </Form>)
  })

let FormInModal = (props) => {
    let {visibleModal, handleOk, confirmLoading, handleCancel, otherRef, onSubmit } = props;
    return (
      <Modal
        title="Create New Flow"
        visible={visibleModal}
        onOk={onSubmit}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onClick={handleOk}
      >
       <MyForm ref={otherRef}/>
      </Modal>
    )
  }

function App() {
  let [initLoading, setInitLoading] = useState(false);
  let [list, setList] = useState([]);
  let [visibleModal, setVisibleModal] = useState(false);
  let [confirmLoading, setConfirmLoading] = useState(false);
  let [formRef, setFormRef] = useState({});

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
    axios.get("http://localhost:8080/api/flow")
      .then(res => {
        console.log(res);
        setList(res.data.message);
        // setList([{id: 1, name: "Flow 1", description: "Description for flow 1"}]);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  let onSubmit = () => {
    formRef.validateFields((err, values) => {
      if (err) return;
      setConfirmLoading(true);
      axios.post("http://localhost:8080/api/flow", values)
      .then(function (res) {
        console.log(res);
        message.success(res.data.message);
        setVisibleModal(false);
        formRef.resetFields();
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function() {
        setConfirmLoading(false); 
        console.log('Received values of form: ', values);
      });
    });
  }

  return (
    <div className="App">
      <header className="App-header">
        <div style={{marginBottom: "1rem"}}>
          <Button onClick={showModal} type="primary" icon="plus">
            Add Flow
          </Button>
          <FormInModal
            otherRef={form => {
              if (form)
              setFormRef(form);
            }}
            title="Create New Flow"
            visibleModal={visibleModal}
            handleOk={setFormRef}
            confirmLoading={confirmLoading}
            handleCancel={handleCancel}
            onSubmit={onSubmit}
          />
      </div>
      <List
        className="demo-loadmore-list"
        bordered={true}
        loading={initLoading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={item => (
          <List.Item
            actions={[<a href="#!" key="list-loadmore-edit">edit</a>]}
          >
            <Skeleton avatar title={false} loading={item.loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar src={logo}/>
                }
                title={<Link to={`/flow/${item.id}`}>{item.name}</Link>}
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
