import React, {useState, useEffect} from "react";
import {
  Tabs,
  Form,
  Steps,
  Input,
  Modal,
  Upload,
  message,
  Icon,
  Divider,
  Card,
  Col,
  Row,
  Popover,
  Button
} from "antd";
import {Link} from "react-router-dom";
import randomColor from "randomcolor";
import Arrow from "react-dom-arrow";
// import "./Flow.css";
const axios = require('axios').default;

const cs = {luminosity: 'dark', hue: "random", count: 27};

const { TabPane } = Tabs;
const { Step } = Steps;

let MyForm = Form.create({name: "new_function"})(
  function (props) {
    const { form: {getFieldDecorator}  } = props;
    const uploadProps = {
      name: 'file',
      // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      action: 'http://localhost:8080/api/upload',
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
          // info.file.name = info.file.response.filename;
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
      <Form.Item label="Description">
        {getFieldDecorator('description', {
          rules: [{ required: true, message: 'Please input the description of the flow!' }],
        })(<Input type="textarea"/>)}
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
    let {visibleModal, handleOk, confirmLoading, handleCancel, otherRef } = props;
    return (
      <Modal
        title="Create New Function"
        visible={visibleModal}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        onClick={handleOk}
      >
       <MyForm ref={otherRef}/>
      </Modal>
    )
  }


function Flow({match}) {
  let [initLoading, setInitLoading] = useState(false);
  let [functions, setFunctions] = useState([]);
  let [visibleModal, setVisibleModal] = useState(false);
  let [confirmLoading, setConfirmLoading] = useState(false);
  let [formRef, setFormRef] = useState({});
  let [colors, setColors] = useState([]);
  let [callingFunction, setCallingFunction] = useState(0);

  let showModal = (ID) => {
    if (ID)
      setCallingFunction(ID);
    setVisibleModal(true);
  };

  let handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisibleModal(false);
      // set the calling function ID to 0
    setCallingFunction(0);
      setConfirmLoading(false);
    }, 2000);
  };

  let handleCancel = () => {
    console.log('Clicked cancel button');
    setVisibleModal(false);
    // set the calling function ID to 0
    setCallingFunction(0);
  };

  function getFunctions() {
    axios.get(`http://localhost:8080/api/function?flow_id=${match.params.flowID}`)
    .then(res => {
      console.log(res);
      const fs = res.data.message;
      setFunctions(fs)
      cs.count = fs.length; 
      setColors(randomColor(cs));
    })
    .catch(err => {
      console.log(err);
    });
  }

  let DeleteFunction = (id) => {
    axios.delete(`http://localhost:8080/api/function?f=${id}`,{})
    .then(function (res) {
      console.log(res);
      message.success(res.data.message);
      // refresh functions
      getFunctions();
    })
    .catch(function (err) {
      console.log(err);
    })
    .finally(function() {
      console.log('Delete for id: ', id);
    });

  }

  let onSubmit = (e) => {
    // console.log("ons submit:", e);
    formRef.validateFields((err, values) => {
      if (err) return;
      setConfirmLoading(true);
      values.file = values.upload.file.response.filename;
      values.description = values.description || "some description";
      values.flow_id = parseInt(match.params.flowID, 10);
      values.prev_func_id = callingFunction;
      delete values.upload;
      axios.post("http://localhost:8080/api/function", values)
      .then(function (res) {
        console.log(res);
        message.success(res.data.message);
        // set the calling function ID to 0
        setCallingFunction(0);
        setVisibleModal(false);
        formRef.resetFields();
        // refresh functions
        getFunctions();
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

  useEffect((res) => {
    // console.log(randomColor(cs));
   getFunctions();
    // setFunctions([{name: "Function 1", file: "#!", id: 1}, {name: "Function 2", file: "#!", id: 2}])
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <Link to="/">Back to Flows</Link>
      {!functions.length ?
      <Button onClick={showModal}>Create new function</Button>
      :""}
      <h2>Functions</h2>
      <FormInModal
        otherRef={form => {
          if (form)
          setFormRef(form);
        }}
        title="Create New Flow"
        visibleModal={visibleModal}
        handleOk={onSubmit}
        confirmLoading={confirmLoading}
        handleCancel={handleCancel}
      />
      <Divider/>
      <Tabs defaultActiveKey="1" >
        <TabPane tab="Boxes" key="1" style={{backgroundColor: "#eee", padding: "3rem"}}>
          <Row gutter={16} >
            {functions.map((func, i) => ( 
            <Col span={12} key={i+1}>
              <Card title={<Button onClick={() => {DeleteFunction(func.ID)}} shape="circle" icon="delete" type="danger"/>} className={`func-${i+1}`} style={{ marginBottom:"3rem"/*, background: colors[i], color: "white"*/}}
                bordered={false} extra={<Button shape="circle" onClick={() => {
                  showModal(func.ID);
                }} icon="plus"/>}>
                <p style={{overflow: "scroll"}}>{func.name}</p>
                <div>
                  <a href={`http://localhost:8080/${func.file}`}>open file</a>
                  <Popover content={<div><p>{func.description}</p></div>} title="Description">
                    <Button icon="info" shape="circle" style={{marginLeft: ".5rem"}}/>
                  </Popover>
                </div>
              </Card>
              <Arrow
                fromSelector={`.func-${i+1}`}
                fromSide={i > 0 || (i+1)%2 ? 'top':'bottom'}
                toSelector={`.func-${i+2}`}
                toSide={'top'}
                color={`${colors[i]}`}
                stroke={1}
              />
            </Col>
            ))}
          </Row>
        </TabPane>
        <TabPane tab="Timeline" key="2">
          <Steps direction="vertical" size="small" current={functions.length-1}>
            {functions.map((func, i) => ( 
            <Step
              key={i+1}
              title={
                <div style={{paddingBottom: ".5rem"}} >
                  <Button  shape="circle" onClick={showModal} icon="plus"/>
                  <span style={{marginLeft: "2rem"}}>{func.name}</span>
                </div>}
              description={
                <Card style={{ width: "100%" }}>
                  <p>{func.description}</p>
                  <a href={`http://localhost:8080/${func.file}`}>Open File</a>
                  <Popover content={<div><p>{func.description}</p></div>} title="Description">
                    <Button icon="info" shape="circle" style={{marginLeft: "2rem"}}/>
                  </Popover>
                </Card>}
              />
            ))}
          </Steps>
        </TabPane>

      </Tabs>
    
  </div>
  )
}

export default Flow;
