import React, {useState, useEffect} from "react";
import { Form, Input, Modal, Upload, message, Icon, Divider, Card, Col, Row, Button } from "antd";

let MyForm = Form.create({name: "new_function"})(
  function (props) {
    const { form: {getFieldDecorator}  } = props;
    const uploadProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        console.log(info);
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
    <Form layout="vertical" >
      <Form.Item label="Name">
        {getFieldDecorator('name', {
          rules: [{ required: true, message: 'Please input the name of the flow!' }],
        })(<Input />)}
      </Form.Item>
      <Form.Item label="Upload"> 
        {getFieldDecorator('upload', {
          valuePropName: 'file',
          // getValueFromEvent: this.normFile,
        })(
          <Upload {...uploadProps}>
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>,
        )}
      </Form.Item> 
    </Form>)
  })

let FormInModal = (props) => {
    let {visibleModal, handleOk, confirmLoading, handleCancel, otherRef, onSubmit } = props;
    return (
      <Modal
        title="Create New Function"
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


function Flow(props) {
  let [initLoading, setInitLoading] = useState(false);
  let [functions, setFunctions] = useState([]);
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

  let onSubmit = () => {
    console.log("hi");
  }

  useEffect((res) => {
    console.log(res);
    setFunctions([{name: "Function 1", file: "#!", id: 1}, {name: "Function 2", file: "#!", id: 2}])
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <Button onClick={showModal}>Create new function</Button>
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
      <Divider/>
    <Row gutter={16}>
      {functions.map((func, i) => ( 
      <Col span={12} key={i+1}>
        <Card style={{backgroundColor: "#ffeedd"}} bordered={false} extra={<Button icon="plus"/>}>
          <p style={{overflow: "scroll"}}>{func.name}</p>
          <p>
          <a href={func.file}>open file</a>
        </p>
        </Card>
      </Col>
      ))}
      {/*<Col span={12}>
        <Card title="FUnction 2" bordered={false}>
          Card content
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Function 3" bordered={false}>
          Card content
        </Card>
      </Col>*/}
    </Row>
  </div>
  )
}

export default Flow;
